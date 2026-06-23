import User from "../models/User.js";
import bcrypt from "bcryptjs";

const createAdmin = async (req, res) => {

  try {

    const existingAdmin =
      await User.findOne({
        email: "admin@cvanalyzer.com",
      });

    if (existingAdmin) {

      return res.status(400).json({
        message:
          "Admin already exists",
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
        email:
          "admin@cvanalyzer.com",
        password:
          hashedPassword,
        role: "admin",
      });

    res.status(201).json({
      message:
        "Admin Created",
      admin,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

const createHR = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      department,
    } = req.body;

    const existingHR =
      await User.findOne({
        email,
      });

    if (existingHR) {

      return res.status(400).json({
        message:
          "User already exists",
      });

    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const hr =
      await User.create({
        name,
        email,
        password:
          hashedPassword,
        role: "hr",
        department,
      });

    res.status(201).json({
      message:
        "HR Created Successfully",
      hr,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

const getHRs = async (req, res) => {

  try {

    const hrs =
      await User.find({
        role: "hr",
      }).select("-password");

    res.status(200).json(
      hrs
    );

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

const getDashboardStats =
  async (req, res) => {

    try {

      const totalHRs =
        await User.countDocuments({
          role: "hr",
        });

      const totalCandidates =
        await User.countDocuments({
          role: "candidate",
        });

      res.json({
        totalHRs,
        totalCandidates,
        totalJobs: 0,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

};

const deleteHr = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.status(200).json({
      message:
        "HR deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

export {
  createAdmin,
  createHR,
  getHRs,
  getDashboardStats,
  deleteHr,
};