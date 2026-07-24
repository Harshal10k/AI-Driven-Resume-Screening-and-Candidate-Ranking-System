import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
    {
        job_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true,
            index: true,
        },

        employer_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        //metadata
        filename: {
            type: String,
            required: true,
        },

        original_name: {
            type: String,
            required: true, 
        }, //for display purposes

        file_path: {
            type: String,
            required: true,
        },

        mime_type: {
            type: String,
            required: true,
        },


        //extracted data
        raw_text: {
            type: String,
            default: "",
        },

        //Candidate details
        candidate_name: {
            type: String,
            default: "",
        },
        email: {
            type: String,
            default: "",
        },

        //AI scoring fields
        match_score: {
            type: Number,
            min: 0,
            max: 100,
            default: null,
        },
        
        rank: {
            type: Number,
            min: 0,
            default: null,
        },

        matched_skills: {
            type: [String],
            default: [],
        },

        missing_skills: {
            type: [String],
            default: [],
        },

        experience_years: {
            type: Number,
            default: null,
        },

        education: {
            type: String,
            default: "",
        },
        
        organizations: {
            type: [String],
            default: [],
        },

        explanation: {
            type: String,
            default: "",
        },
        bias_flags: {
            type: [String],
            default: [],
        },

       processing_status: {
            type: String,
            enum: [
                "uploaded",
                "extracted",
                "scored",
                "failed"
            ],
            default: "uploaded",
        },

        candidate_status: {
            type: String,
            enum: [
                "pending",
                "shortlisted",
                "rejected"
            ],
            default: "pending",
        },

        gemini_response: {
            type: mongoose.Schema.Types.Mixed,
            default: null,
        },

        scored_at: {
            type: Date,
            default: null,
        },
        
        },  
        {
            timestamps: true,
        }

);

resumeSchema.index({ job_id: 1, match_score: -1 });

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;