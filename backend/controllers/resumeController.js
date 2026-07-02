import fs from "fs";
import path from "path";
import { fileTypeFromFile } from "file-type";
import Job from "../models/Job.js";
import Resume from "../models/Resume.js";
import { extractText } from "../services/pdfService.js";
import { rankResumesForJob } from "../services/rankingService.js";
import { scoreResume } from "../services/geminiService.js"

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

// MIME types we trust after magic bytes confirm them
const ALLOWED_MAGIC_TYPES = new Set([
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/zip", // DOCX files sometimes resolve as zip at the magic-bytes level
]);

/**
 * Delete a list of files from disk silently (used for cleanup on error).
 */
const cleanupFiles = (files = []) => {
    for (const file of files) {
        try {
            fs.unlinkSync(file.path);
        } catch {
            // Ignore — file may not exist yet
        }
    }
};

// ── POST /api/resumes/upload/:jobId ──────────────────────────────────────────
// Access: Private — Employer only
// Accepts: multipart/form-data, field name "resumes", up to 20 files
export const uploadResumes = async (req, res) => {
    const { jobId } = req.params;
    const files = req.files || [];

    // Guard: at least one file required
    if (files.length === 0) {
        return res.status(400).json({
            success: false,
            message: "No files uploaded. Please select at least one PDF or DOCX resume.",
        });
    }

    // ── Verify job exists and belongs to this employer ──────────────────────
    let job;
    try {
        job = await Job.findById(jobId);
    } catch {
        cleanupFiles(files);
        return res.status(400).json({ success: false, message: "Invalid job ID." });
    }

    if (!job) {
        cleanupFiles(files);
        return res.status(404).json({ success: false, message: "Job not found." });
    }

    if (job.employer_id.toString() !== req.user._id.toString()) {
        cleanupFiles(files);
        return res.status(403).json({
            success: false,
            message: "Unauthorized: you do not own this job posting.",
        });
    }

    if (job.status === "closed") {
        cleanupFiles(files);
        return res.status(400).json({
            success: false,
            message: "This job posting is closed. Reopen it before uploading resumes.",
        });
    }

    // ── Process each file ────────────────────────────────────────────────────
    const results = [];

    for (const file of files) {
        const fileResult = {
            original_name: file.originalname,
            success: false,
            message: "",
        };

        try {
            // FR-16a: Magic bytes validation — confirm true file type
            const detected = await fileTypeFromFile(file.path);

            // detected can be undefined for plain-text or unknown types
            if (!detected || !ALLOWED_MAGIC_TYPES.has(detected.mime)) {
                fs.unlinkSync(file.path);
                fileResult.message = `'${file.originalname}' failed content validation — file content does not match a valid PDF or DOCX.`;
                // 3s pause between files to avoid RPM limits (FR-17a)
            if (files.length > 1) {
                await sleep(3000);
                }
                results.push(fileResult);
                continue;
            }

            // Normalise zip → docx (DOCX is a ZIP under the hood)
            const confirmedMime =
                detected.mime === "application/zip"
                    ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    : detected.mime;

            // FR-12 / FR-13: Extract raw text
            const rawText = await extractText(file.path, confirmedMime);
            

            if (!rawText || rawText.length < 50) {
                // Likely a scanned/image-only PDF — warn but still save
                fileResult.message = `'${file.originalname}' appears to be scanned or image-based. Text extraction returned very little content; AI scoring may be inaccurate.`;
            }

            // ── Save Resume document to MongoDB ──────────────────────────────
            const resume = await Resume.create({
                job_id:       jobId,
                employer_id:  req.user._id,
                filename:     file.filename,       // UUID name on disk
                original_name: file.originalname, // For display only
                file_path:    file.path,
                mime_type:    confirmedMime,
                raw_text:     rawText,
                processing_status: "uploaded",
                candidate_status: "pending",
            });

            resume.processing_status = "extracted";
            await resume.save();

            //FR-17: Call Gemini for scoring
            let scored = false;
            let scoringNote = "";

            try {
                const geminiResult = await scoreResume(job, rawText);

                resume.candidate_name = geminiResult.candidate_name || "";
                resume.email = geminiResult.email || "";
                resume.match_score = geminiResult.match_score ?? null;
                resume.matched_skills = geminiResult.matched_skills || [];
                resume.missing_skills = geminiResult.missing_skills || [];
                resume.experience_years = geminiResult.experience_years ?? null;
                resume.education = geminiResult.education || "";
                resume.organizations = geminiResult.organizations || [];
                resume.explanation = geminiResult.explanation || "";
                resume.bias_flags = geminiResult.bias_flags || [];
                
                resume.processing_status = "scored";
                resume.gemini_response = geminiResult;
                resume.scored_at = new Date();

                await resume.save();
                scored = true;
                scoringNote = `Gemini scoring completed (match_score: ${resume.match_score}).`;
            } catch (geminiErr) {
                console.error(`Gemini scoring failed for ${file.originalname}:`, geminiErr.message);
                resume.processing_status = "failed";
                await resume.save();
                scoringNote = "(AI scoring failed)";    
                }
                fileResult.success = true;
                fileResult.message = scored ? `Uploaded and scored (match_score: ${resume.match_score})` : `Uploaded successfully ${scoringNote}`;
                fileResult.resume_id = resume._id;
                fileResult.match_score = resume.match_score;  
        } catch (err) {
            // Clean up orphaned file if save failed
            try { fs.unlinkSync(file.path); } catch { /* ignore */ }
            fileResult.message = `Failed to process '${file.originalname}': ${err.message}`;
        }

        results.push(fileResult);
    }

    try {
        await rankResumesForJob(jobId);
    } catch(rankErr) {
        console.error("Ranking Failed: ", rankErr.message)
    }

    // ── Summary response ────────────────────────────────────────────────────
    const succeeded = results.filter((r) => r.success).length;
    const failed    = results.length - succeeded;

    return res.status(207).json({
        success: true,
        summary: {
            total:     results.length,
            succeeded,
            failed,
        },
        results,
    });
};

// ── GET /api/resumes/:jobId ───────────────────────────────────────────────────
// Returns all resumes for a job, sorted by rank (then by upload date for unscored)
// Access: Private — Employer only
export const getResumesByJob = async (req, res) => {
    try {
        const { jobId } = req.params;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found." });
        }
        if (job.employer_id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized access." });
        }

        const resumes = await Resume.find({ job_id: jobId })
            .select("-raw_text -gemini_response") // raw_text is internal; don't send to client
            .sort({ rank: 1, createdAt: -1 });

        return res.status(200).json({ success: true, count: resumes.length, data: resumes });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ── PATCH /api/resumes/:id/status ────────────────────────────────────────────
// Shortlist or reject a candidate (FR-27, FR-28)
// Access: Private — Employer only
export const updateCandidateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const VALID_STATUSES = ["shortlisted", "rejected", "pending"];
        if (!VALID_STATUSES.includes(status)) {
            return res.status(400).json({
                success: false,
                message: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}.`,
            });
        }

        const resume = await Resume.findById(id);
        if (!resume) {
            return res.status(404).json({ success: false, message: "Resume not found." });
        }
        if (resume.employer_id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized access." });
        }

        resume.candidate_status = status;

        const updated = await resume.save();

        return res.status(200).json({ success: true, data: updated });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};