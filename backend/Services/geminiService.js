import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
    generationConfig: {
        responseMimeType: "application/json",
    },
});

const MAX_RETRIES = 3;

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const buildPrompt = (jobTitle, jobDescription, requiredSkills, experienceYears, resumeText) => `
You are an expert technical recruiter. Analyse the resume below against the job description and return ONLY a valid JSON object — no markdown, no explanation outside the JSON.

JOB TITLE: ${jobTitle}
JOB DESCRIPTION: ${jobDescription}
REQUIRED SKILLS: ${requiredSkills.join(", ")}
REQUIRED EXPERIENCE: ${experienceYears} years

RESUME TEXT:
${resumeText.slice(0, 8000)}

Return this exact JSON schema:
{
  "candidate_name": "string — full name extracted from resume, or empty string if not found",
  "email": "string — email extracted from resume, or empty string if not found",
  "match_score": "integer 0-100 — how well this resume matches the job",
  "matched_skills": ["array of skills from required_skills that the candidate has"],
  "missing_skills": ["array of skills from required_skills that the candidate lacks"],
  "experience_years": "number — years of relevant experience extracted from resume",
  "education": "string — highest qualification extracted from resume",
  "organizations": ["array of company/organization names from resume work history"],
  "explanation": "2-3 sentence plain-English summary of why this score was given",
  "bias_flags": ["array of strings — flag any explicitly stated age, marital status, nationality, religion, or gender indicators found in the resume text. Empty array if none found."]
}
`;

export const scoreResume = async (job, resumeText) => {
    const prompt = buildPrompt(
        job.title,
        job.description,
        job.required_skills,
        job.experience_years,
        resumeText
    );

    let lastError;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const result = await model.generateContent(prompt);
            const raw = result.response.text();

            const clean = raw.replace(/```json|```/g, "").trim();
            const parsed = JSON.parse(clean);

            if (typeof parsed.match_score !== "number" || parsed.match_score < 0 || parsed.match_score > 100) {
                throw new Error("Gemini response missing valid match_score field.");
            }

            return parsed;

        } catch (err) {
            lastError = err;

            if (err?.status === 429 || err?.message?.includes("429")) {
                const retryDelayMatch = err?.message?.match(/retryDelay["\s:]+(\d+)s/);
                const waitSeconds = retryDelayMatch ? parseInt(retryDelayMatch[1]) + 5 : 60;
                console.warn(`Gemini 429 — waiting ${waitSeconds}s before retry ${attempt}/${MAX_RETRIES}`);
                await sleep(waitSeconds * 1000);
                continue;
            }

            if (attempt === MAX_RETRIES) break;

            await sleep(2000 * attempt);
        }
    }

    throw new Error(`Gemini scoring failed after ${MAX_RETRIES} attempts: ${lastError?.message}`);
};