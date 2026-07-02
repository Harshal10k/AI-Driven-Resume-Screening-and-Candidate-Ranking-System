import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

// ── Allowed types ──────────────────────────────────────────────────────────────
const ALLOWED_MIME_TYPES = new Set([
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

// Extensions that must always be rejected (FR-16c)
const BLOCKED_EXTENSIONS = new Set([
    ".js", ".mjs", ".cjs",
    ".php", ".sh", ".bash",
    ".exe", ".bat", ".cmd",
    ".py", ".rb", ".pl",
]);

// ── Ensure /uploads directory exists ──────────────────────────────────────────
const UPLOADS_DIR = path.resolve("uploads");
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// ── Multer disk storage ────────────────────────────────────────────────────────
// FR-16b: Files are always renamed to a UUID — the original client filename is
//         never used as the server-side path to prevent path traversal attacks.
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const safeName = `${uuidv4()}${ext}`;
        cb(null, safeName);
    },
});

// ── File filter ────────────────────────────────────────────────────────────────
// First-pass validation using MIME type + extension.
// Magic bytes (true content) are verified in the controller after the file lands
// on disk (FR-16a), because the full byte stream isn't available here.
const fileFilter = (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    // FR-16c: Hard-block executable extensions regardless of MIME type
    if (BLOCKED_EXTENSIONS.has(ext)) {
        return cb(
            Object.assign(new Error(`Executable file type '${ext}' is not allowed.`), {
                code: "BLOCKED_EXTENSION",
            }),
            false
        );
    }

    // FR-14: Only PDF and DOCX are accepted
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
        return cb(
            Object.assign(
                new Error(
                    `Invalid file type '${file.mimetype}'. Only PDF and DOCX files are accepted.`
                ),
                { code: "INVALID_MIME" }
            ),
            false
        );
    }

    cb(null, true);
};

// ── Multer instance ────────────────────────────────────────────────────────────
// FR-15: Per-file size cap of 5 MB
// FR-11: Multiple files accepted in a single request (field name: "resumes")
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },
});

export const uploadResumes = upload.array("resumes", 20); // max 20 files per request

export { UPLOADS_DIR };