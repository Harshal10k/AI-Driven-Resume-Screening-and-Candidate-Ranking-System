import Resume from "../models/Resume.js";

/**
 * Re-ranks all scored resumes for a job in descending match_score order.
 * Assigns rank 1 to highest score. Unscored resumes (match_score null) are skipped.
 * Called after every upload batch completes.
 */
export const rankResumesForJob = async (jobId) => {
    const resumes = await Resume.find({
        job_id: jobId,
        match_score: { $ne: null },
    }).sort({ 
        match_score: -1,
        experience_years: -1,
        createdAt: 1
    });

    const bulkOps = resumes.map((resume, index) => ({
        updateOne: {
            filter: { _id: resume._id },
            update: { $set: { rank: index + 1 } },
        },
    }));

    if (bulkOps.length > 0) {
        await Resume.bulkWrite(bulkOps);
    }
};