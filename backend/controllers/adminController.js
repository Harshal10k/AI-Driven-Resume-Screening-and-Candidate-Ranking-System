import User from "../models/User.js";
import Job from "../models/Job.js";
import bcrypt from "bcryptjs";

// Create Default Admin

const createAdmin = async (req, res) => {

  try {

    const existingAdmin =
      await User.findOne({
        email: "admin@cvanalyzer.com",
      });

    if (existingAdmin) {

      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });

    }

    const hashedPassword =
      await bcrypt.hash(
        "admin123",
        10
      );

    const admin =
      await User.create({

        name: "System Admin",

        email: "admin@cvanalyzer.com",

        password: hashedPassword,

        role: "admin",

      });

    return res.status(201).json({

      success: true,

      message: "Admin Created Successfully",

      admin,

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// Create Employer

const createEmployer = async (req, res) => {

  try {

    const {

      name,

      email,

      password,

      company,

      department,

    } = req.body;

    const existingEmployer =
      await User.findOne({
        email,
      });

    if (existingEmployer) {

      return res.status(400).json({

        success: false,

        message: "Employer already exists",

      });

    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const employer =
      await User.create({

        name,

        email,

        password: hashedPassword,

        role: "employer",

        company,

        department,

      });

    return res.status(201).json({

      success: true,

      message: "Employer Created Successfully",

      employer,

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// Get All Employers

const getEmployers = async (req, res) => {

  try {

    const employers =
      await User.find({

        role: "employer",

      }).select("-password");

    return res.status(200).json({

      success: true,

      count: employers.length,

      data: employers,

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// Dashboard Stats

const getDashboardStats = async (req, res) => {
  try {
    const totalEmployers = await User.countDocuments({
      role: "employer",
    });

    const totalCandidates = await User.countDocuments({
      role: "candidate",
    });

    const totalAdmins = await User.countDocuments({
      role: "admin",
    });

    // Count only open jobs
    const totalJobs = await Job.countDocuments({
      status: "open",
    });

    // Temporary: every candidate is considered screened
    // Replace this later with actual AI screening count
    const totalScreenings = totalCandidates;

    return res.status(200).json({
      success: true,
      totalAdmins,
      totalEmployers,
      totalCandidates,
      totalJobs,
      totalScreenings,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Delete Employer

const deleteEmployer = async (
  req,
  res
) => {

  try {

    const employer =
      await User.findById(
        req.params.id
      );

    if (!employer) {

      return res.status(404).json({

        success: false,

        message: "Employer not found",

      });

    }

    if (
      employer.role !==
      "employer"
    ) {

      return res.status(400).json({

        success: false,

        message: "Selected user is not an employer",

      });

    }

    await employer.deleteOne();

    return res.status(200).json({

      success: true,

      message:
        "Employer deleted successfully",

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// Get All Candidates

const getCandidates = async (req, res) => {
  try {

    const candidates = await User.find({
      role: "candidate",
    }).select("-password");

    res.status(200).json({
      success: true,
      data: candidates,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export {

  createAdmin,

  createEmployer,

  getEmployers,

  getDashboardStats,

  deleteEmployer,

  getCandidates,

};