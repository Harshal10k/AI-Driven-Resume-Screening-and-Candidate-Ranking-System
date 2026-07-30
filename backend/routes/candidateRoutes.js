import express from "express";

import {
    getAvailableJobs,
    applyJob,
    getMyApplications,
} from "../controllers/candidateController.js";

import {
    protect,
    authorizeRoles,
} from "../middleware/authMiddleware.js";


const router = express.Router();


router.use(protect);


// Candidate jobs list
router.get(
    "/jobs",
    authorizeRoles("candidate"),
    getAvailableJobs
);


// Apply job
router.post(
    "/apply/:jobId",
    authorizeRoles("candidate"),
    applyJob
);


// My applications
router.get(
    "/applications",
    authorizeRoles("candidate"),
    getMyApplications
);


export default router;