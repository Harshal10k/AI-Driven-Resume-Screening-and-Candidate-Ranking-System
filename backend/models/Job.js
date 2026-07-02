import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    employer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: [true, "Please add a job title"],
    },
    company: {
        type: String,
        required: [true, "Please add a company name"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please add a job description"],
    },
    required_skills: {
        type: [String],
        required: [true, "Please add required skills"],
        validate: {
            validator: (arr) => arr.length > 0,
            message: "Please add at least one required skill",
        },
    },
    experience_years: {
        type: Number,
        default: 0,
        min: [0, "Experience years cannot be negative"],
    },
    status: {
        type: String,
        enum: ["open", "closed"],
        default: "open",
    },
},
{
    timestamps: true,
}
);

const Job = mongoose.model("Job", jobSchema);

export default Job;

