import express from "express";

import {
  createAdmin,
  createEmployer,
  getEmployers,
  getDashboardStats,
  deleteEmployer,
  getCandidates,
} from "../controllers/adminController.js";

const router = express.Router();

// Admin

router.post(
  "/create-admin",
  createAdmin
);

// Employer Management

router.post(
  "/create-employer",
  createEmployer
);

router.get(
  "/employers",
  getEmployers
);

router.delete(
  "/employers/:id",
  deleteEmployer
);

// Dashboard

router.get(
  "/dashboard-stats",
  getDashboardStats
);

// Candidate Management 

router.get(
  "/candidates", getCandidates
);



export default router;