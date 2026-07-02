import express from "express";
import { body } from "express-validator";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { uploadResumes as multerUpload } from "../middleware/uploadMiddleware.js";
import {
    uploadResumes,
    getResumesByJob,
    updateCandidateStatus,
} from "../controllers/resumeController.js";
import validateRequest from "../middleware/validateRequest.js";

const resumeRouter = express.Router();

resumeRouter.use(protect);

// POST /api/resumes/upload/:jobId
// Multer runs first (stores files), then the controller validates + processes them
resumeRouter.post(
    "/upload/:jobId",
    authorizeRoles("employer"),
    (req, res, next) => {
        multerUpload(req, res, (err) => {
            if (!err) return next();

            // Multer-specific errors
            if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(400).json({
                    success: false,
                    message: "One or more files exceed the 5 MB size limit.",
                });
            }
            if (err.code === "BLOCKED_EXTENSION" || err.code === "INVALID_MIME") {
                return res.status(400).json({ success: false, message: err.message });
            }
            // Generic Multer error
            return res.status(400).json({ success: false, message: err.message });
        });
    },
    uploadResumes
);

// GET /api/resumes/:jobId — ranked candidates for a job
resumeRouter.get("/:jobId", authorizeRoles("employer"), getResumesByJob);

// PATCH /api/resumes/:id/status — shortlist or reject
resumeRouter.patch(
    "/:id/status",
    authorizeRoles("employer"),
    [
        body("status")
            .isIn(["shortlisted", "rejected", "pending"])
            .withMessage("Status must be shortlisted, rejected, or pending."),
    ],
    validateRequest,
    updateCandidateStatus
);


export default resumeRouter;