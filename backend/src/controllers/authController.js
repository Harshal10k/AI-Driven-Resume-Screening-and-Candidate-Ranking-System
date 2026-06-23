import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body;

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {

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

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "candidate",
    });

    res.status(201).json({
      message:
        "Registration Successful",
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

const login = async (req, res) => {

  try {

    const {
      email,  
      password,
      role,
    } = req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {

      return res.status(400).json({
        message:
          "Invalid Credentials",
      });

    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message:
          "Invalid Credentials",
      });

    }

    if (user.role !== role) {

      return res.status(400).json({
        message:
          "Selected role does not match account role",
      });

    }

    const token = jwt.sign(
      {
        userId:
          user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

const updateProfile = async (req, res) => {

  try {

    const {
      name,
      email,
    } = req.body;

    const user =
      await User.findByIdAndUpdate(
        req.userId,
        {
          name,
          email,
        },
        {
          new: true,
        }
      );

    res.status(200).json({
      user,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

export {
  register,
  login,
  updateProfile,
};  