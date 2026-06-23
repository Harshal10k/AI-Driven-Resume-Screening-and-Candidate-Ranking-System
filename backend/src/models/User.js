import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [8, "Password must be at least 8 characters long"],
    },

    role: {
      type: String,
      enum: [
        "admin",
        "hr",
        "candidate",
      ],
      default: "candidate",
      required: [true, "Please specify your role"],
    },

    department: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model(
  "User",
  userSchema
);

export default User;