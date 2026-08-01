import Job from "../models/Job.js";
import Resume from "../models/Resume.js";

//@Route: POST /api/jobs
//@access: Private (Employer Only)
export const createJob = async (req, res) => {
    try {
        const {
            title,
            company,
            description,
            required_skills,
            experience_years,            
        } = req.body;

        const createdJob = await Job.create({
            employer_id: req.user._id,
            title,
            company,
            description,
            required_skills,
            experience_years,
        });

        return res.status(201).json({ success: true, data: createdJob });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

//@route GET /api/jobs
//@access Private (Employer Only)
export const getAllJobs = async (req, res) => {
  try {
    // ==========================================
    // Fetch Employer Jobs
    // ==========================================

    const jobs = await Job.find({
      employer_id: req.user._id,
    }).sort({
      createdAt: -1,
    });

    // ==========================================
    // Fetch Resume Statuses
    // ==========================================

    const resumes = await Resume.find({
      employer_id: req.user._id,
    }).select("job_id candidate_status");

    // ==========================================
    // Build Summary Map
    // ==========================================

    const summaryMap = {};

    resumes.forEach((resume) => {
      const jobId = resume.job_id.toString();

      if (!summaryMap[jobId]) {
        summaryMap[jobId] = {
          applicants: 0,
          shortlisted: 0,
          pending: 0,
          rejected: 0,
        };
      }

      summaryMap[jobId].applicants++;

      switch (resume.candidate_status) {
        case "shortlisted":
          summaryMap[jobId].shortlisted++;
          break;

        case "pending":
          summaryMap[jobId].pending++;
          break;

        case "rejected":
          summaryMap[jobId].rejected++;
          break;

        default:
          break;
      }
    });

    // ==========================================
    // Attach Summary To Every Job
    // ==========================================

    const jobsWithSummary = jobs.map((job) => {
      const summary =
        summaryMap[job._id.toString()] || {
          applicants: 0,
          shortlisted: 0,
          pending: 0,
          rejected: 0,
        };

      return {
        ...job.toObject(),
        summary,
      };
    });

    // ==========================================
    // Response
    // ==========================================

    return res.status(200).json({
      success: true,
      count: jobsWithSummary.length,
      data: jobsWithSummary,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//@route GET /api/jobs/:id
//@access Private (Employer Only)
export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        if(job.employer_id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized access" });
        }

        return res.status(200).json({ success: true, data: job });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// ==========================================
// Update Job
// PUT /api/jobs/:id
// Private (Employer)
// ==========================================

export const updateJob = async (req, res) => {
  try {

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    if (
      job.employer_id.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access.",
      });
    }

    const {
      title,
      company,
      description,
      required_skills,
      experience_years,
      status,
    } = req.body;

    job.title =
      title ?? job.title;

    job.company =
      company ?? job.company;

    job.description =
      description ?? job.description;

    job.required_skills =
      required_skills ??
      job.required_skills;

    job.experience_years =
      experience_years ??
      job.experience_years;

    if (status) {
      job.status = status;
    }

    const updatedJob =
      await job.save();

    return res.status(200).json({
      success: true,
      message:
        "Job updated successfully.",
      data: updatedJob,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

//@route PATCH /api/jobs/:id
//@access Private (Employer Only)
export const updateJobStatus = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        if(job.employer_id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized access" });
        }

        job.status = req.body.status || job.status;

        const updatedJob = await job.save();

        return res.status(200).json({ success: true, data: updatedJob });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

//@route DELETE /api/jobs/:id
//@route: Private (Employer Only)
export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        if(job.employer_id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized access" });
        }

        await job.deleteOne();

        return res.status(200).json({ success: true, message: "Job deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}
