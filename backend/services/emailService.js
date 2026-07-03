import nodemailer from "nodemailer";

const isValidEmail = (value) => {
    if (!value || typeof value !== "string") return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
};

// Transporter is created once and reused across calls.
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: Number(process.env.EMAIL_PORT) === 465, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const SUBJECT_MAP = {
    shortlisted: (jobTitle) => `You've been shortlisted for ${jobTitle}`,
    rejected: (jobTitle) => `Update on your application for ${jobTitle}`,
};

const bodyFor = (status, candidateName, jobTitle, companyName) => {
    const greeting = candidateName ? `Hi ${candidateName},` : "Hi,";

    if (status === "shortlisted") {
        return `${greeting}\n\nGood news — you've been shortlisted for the ${jobTitle} role at ${companyName}. The hiring team will be in touch with next steps shortly.\n\nBest regards,\n${companyName} Hiring Team`;
    }

    return `${greeting}\n\nThank you for applying for the ${jobTitle} role at ${companyName}. After careful review, we've decided not to move forward with your application at this time. We appreciate the time you invested and encourage you to apply for future openings.\n\nBest regards,\n${companyName} Hiring Team`;
};

/**
 * Sends a shortlist/reject notification email to a candidate.
 * Never throws — logs and resolves on failure so callers can fire-and-forget
 * without risking the calling request/transaction.
 *
 * @param {Object} params
 * @param {string} params.status - "shortlisted" | "rejected"
 * @param {string} params.candidateEmail
 * @param {string} params.candidateName
 * @param {string} params.jobTitle
 * @param {string} params.companyName
 */
export const sendStatusEmail = async ({ status, candidateEmail, candidateName, jobTitle, companyName }) => {
    if (!SUBJECT_MAP[status]) return; // only shortlist/reject trigger emails

    if (!isValidEmail(candidateEmail)) {
        console.warn(`Skipping status email — invalid/missing candidate email for "${candidateName || "unknown"}"`);
        return;
    }

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
            to: candidateEmail,
            subject: SUBJECT_MAP[status](jobTitle),
            text: bodyFor(status, candidateName, jobTitle, companyName || "the hiring team"),
        });
    } catch (err) {
        // Deliberately swallowed — email is a best-effort side effect, not
        // part of the core status-update transaction.
        console.error(`Failed to send ${status} email to ${candidateEmail}:`, err.message);
    }
};