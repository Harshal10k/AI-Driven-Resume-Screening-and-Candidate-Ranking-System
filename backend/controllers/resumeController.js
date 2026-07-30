import fs from "fs";
import path from "path";
import { fileTypeFromFile } from "file-type";
import Job from "../models/Job.js";
import Resume from "../models/Resume.js";
import { extractText } from "../services/pdfService.js";
import { rankResumesForJob } from "../services/rankingService.js";
import { scoreResume } from "../services/geminiService.js";
import { sendStatusEmail } from "../services/emailService.js";

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

// Basic email format check — used to avoid comparing junk/empty extracted
// email values against the authenticated candidate's real email.
const isValidEmail = (value) => {
    if (!value || typeof value !== "string") return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
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

// ── GET /api/resumes ────────────────────────────────────────────────────────
// Returns resumes across all jobs belonging to the logged-in employer
// Access: Private — Employer only

export const getAllResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({
            employer_id: req.user._id,
        })
        .populate(
            "job_id",
            "title company"
        )
        .select(
            "-raw_text -gemini_response"
        )
        .sort({
            rank: 1,
            createdAt: -1,
        });
        return res.status(200).json({
            success: true,
            count: resumes.length,
            data: resumes,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
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

        const statusChanged = resume.candidate_status !== status;
        resume.candidate_status = status;

        const updated = await resume.save();

        // Fire-and-forget: only notify on an actual transition to
        // shortlisted/rejected, never on redundant PATCHes or reverts to pending.
        if (statusChanged && (status === "shortlisted" || status === "rejected")) {
            const job = await Job.findById(resume.job_id).select("title company");
            sendStatusEmail({
                status,
                candidateEmail: resume.email,
                candidateName: resume.candidate_name,
                jobTitle: job.title || "the role",
                companyName: job.company || "",
            }); // not awaited — response doesn't wait on email delivery
        }
        return res.status(200).json({ success: true, data: updated });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


// ── GET /api/resumes/export/:jobId ────────────────────────────────────────
// Streams a CSV of all shortlisted candidates for a job (FR-29)
// Access: Private — Employer only
export const exportShortlistedCandidates = async (req, res) => {
    try {
        const { jobId } = req.params;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found." });
        }
        if (job.employer_id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized access." });
        }

        const resumes = await Resume.find({
            job_id: jobId,
            candidate_status: "shortlisted",
        })
            .select("-raw_text -gemini_response")
            .sort({ rank: 1 });

        // ── CSV column definitions ──────────────────────────────────────────
        const headers = [
            "Rank",
            "Candidate Name",
            "Email",
            "Match Score",
            "Experience (Years)",
            "Education",
            "Matched Skills",
            "Missing Skills",
            "Organizations",
            "Explanation",
            "Bias Flags",
            "Original Filename",
        ];

        // Escape a single CSV field: wrap in quotes if it contains a comma,
        // quote, or newline; double any internal quotes.
        const escapeCsv = (value) => {
            const str = value === null || value === undefined ? "" : String(value);
            if (/[",\n]/.test(str)) {
                return `"${str.replace(/"/g, '""')}"`;
            }
            return str;
        };

        const rows = resumes.map((r) => [
            r.rank ?? "",
            r.candidate_name || "",
            r.email || "",
            r.match_score ?? "",
            r.experience_years ?? "",
            r.education || "",
            (r.matched_skills || []).join("; "),
            (r.missing_skills || []).join("; "),
            (r.organizations || []).join("; "),
            r.explanation || "",
            (r.bias_flags || []).join("; "),
            r.original_name || "",
        ]);

        // AC-07 requires: empty CSV with headers only if no shortlisted candidates
        const csvLines = [headers, ...rows].map((row) => row.map(escapeCsv).join(","));
        const csvContent = csvLines.join("\r\n");

        const safeJobTitle = (job.title || "job").replace(/[^a-z0-9]/gi, "_").toLowerCase();
        const filename = `shortlist_${safeJobTitle}_${jobId}.csv`;

        res.setHeader("Content-Type", "text/csv; charset=utf-8");
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
        return res.status(200).send(csvContent);
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getCandidateApplications =
async (req, res) => {
  try {

    const resumes =
      await Resume.find({
        email: req.user.email,
      })
      .populate(
        "job_id",
        "title company description required_skills status"
      )
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: resumes.length,
      data: resumes,
    });
  }

  catch(error){
    return res.status(500).json({
      success:false,
      message:error.message,
    });
  }

};

// ── GET /api/resumes/candidate ────────────────────────────────────────────
// Returns all resumes matching the authenticated candidate's email address.
// Matching is best-effort: it relies on Gemini having correctly extracted an
// email from the resume text, so results may be incomplete (FR-30 / Candidate
// read-only dashboard, Option A scope).
// Access: Private — Candidate only
export const getResumesByCandidate = async (req, res) => {
    try {
        const candidateEmail = req.user.email?.trim().toLowerCase();

        if (!isValidEmail(candidateEmail)) {
            // Shouldn't happen — registration requires a valid email — but
            // guard against it rather than running a query that could
            // accidentally match other empty-email resumes.
            return res.status(400).json({
                success: false,
                message: "Your account email is invalid or missing.",
            });
        }

        // MongoDB-side case-insensitive exact match. $regex with anchors
        // avoids matching partial/substring emails.
        const resumes = await Resume.find({
            email: {
                $regex: `^${candidateEmail.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
                $options: "i",
            },
        })
            .select("-raw_text -gemini_response -employer_id -file_path")
            .populate("job_id", "title company")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: resumes.length,
            data: resumes,
            note: resumes.length === 0
                ? "No matching applications found. This may be because the email on your resume differs from your account email."
                : undefined,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ───────────────────────────────────────────────────────────────
// POST /api/resumes/rescreen/:jobId
// Re-run Gemini AI Screening
// ───────────────────────────────────────────────────────────────

export const rerunAIScreening = async (req, res) => {
    const { jobId } = req.params;
    try {
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found.",
            });
        }
        if (job.employer_id.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized.",
            });
        }
        const resumes = await Resume.find({
            job_id: jobId,
        });
        if (!resumes.length) {
            return res.status(404).json({
                success: false,
                message: "No resumes found.",
            });
        }
        let updated = 0;
        for (const resume of resumes) {
            try {
                const geminiResult = await scoreResume(
                    job,
                    resume.raw_text
                );
                resume.candidate_name =
                    geminiResult.candidate_name || "";
                resume.email =
                    geminiResult.email || "";
                resume.match_score =
                    geminiResult.match_score ?? null;
                resume.matched_skills =
                    geminiResult.matched_skills || [];
                resume.missing_skills =
                    geminiResult.missing_skills || [];
                resume.experience_years =
                    geminiResult.experience_years ?? null;
                resume.education =
                    geminiResult.education || "";
                resume.organizations =
                    geminiResult.organizations || [];
                resume.explanation =
                    geminiResult.explanation || "";
                resume.bias_flags =
                    geminiResult.bias_flags || [];
                resume.processing_status = "scored";
                resume.gemini_response =
                    geminiResult;
                resume.scored_at =
                    new Date();
                await resume.save();
                updated++;
            }
            catch (err) {
                console.error(
                    `Failed to rescore ${resume.original_name}`,
                    err.message
                );
                resume.processing_status = "failed";
                await resume.save();
            }
        }
        await rankResumesForJob(jobId);
        return res.json({
            success: true,
            message: `AI screening completed.`,
            rescored: updated,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: err.message,
        });

    }
};