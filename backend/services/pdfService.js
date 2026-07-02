import { readFileSync } from "fs";
import mammoth from "mammoth";

const PDF_MIME  = "application/pdf";
const DOCX_MIME = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export const extractText = async (filePath, mimeType) => {
    if (mimeType === PDF_MIME) {
        const { extractText: extractPdfText } = await import("unpdf");
        const buffer = readFileSync(filePath);
        const { text } = await extractPdfText(new Uint8Array(buffer), { mergePages: true });
        return (text || "").trim();
    }

    if (mimeType === DOCX_MIME) {
        const result = await mammoth.extractRawText({ path: filePath });
        return (result.value || "").trim();
    }

    throw new Error(`Unsupported MIME type for text extraction: ${mimeType}`);
};