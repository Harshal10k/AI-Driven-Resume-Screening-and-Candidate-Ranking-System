import express from "express";

import {
  createAdmin,
  createHR,
  getHRs,
  getDashboardStats,
  deleteHr,
} from "../controllers/adminController.js";

const router = express.Router();

router.post(
  "/create-admin",
  createAdmin
);

router.post(
  "/create-hr",
  createHR
);

router.get(
  "/hrs",
  getHRs
);

router.get(
  "/dashboard-stats",
  getDashboardStats
);

router.delete(
  "/hrs/:id",
  deleteHr
);

export default router;