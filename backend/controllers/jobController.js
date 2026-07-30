import Job from "../models/Job.js";

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
        const jobs = await Job.find({
            employer_id: req.user._id,
        }).sort({ createdAt: -1 });

        return res.status(200).json({ success: true, data: jobs });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// ==========================================
// NEW API
// Get All Open Jobs
// GET /api/jobs/open
// Private (Candidate / Employer)
// ==========================================

export const getOpenJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      status: "open",
    })
      .select(
        "title company description required_skills experience_years hr_email status createdAt"
      )
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
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
