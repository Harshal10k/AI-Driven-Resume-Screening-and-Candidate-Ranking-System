import express from "express";
import { body } from "express-validator";
import { createJob, getAllJobs, getJobById, updateJobStatus, deleteJob } from "../controllers/JobController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

const jobRouter = express.Router();

jobRouter.use(protect);

jobRouter.post(
    "/",
    [
        body("title").notEmpty().withMessage("Job title is required"),
        body("company").notEmpty().withMessage("Company name is required"),
        body("description").notEmpty().withMessage("Job description is required"),
        body("required_skills").isArray({ min: 1 }).withMessage("At least one required skill is required"),
        body("experience_years").optional().isInt({ min: 0 }).withMessage("Experience years must be a non-negative integer"),
    ], 
    validateRequest,
    authorizeRoles("employer"), 
    createJob
)

//get all jobs
jobRouter.get("/", authorizeRoles("employer"), getAllJobs);


//get job by id
jobRouter.get("/:id", authorizeRoles("employer"), getJobById);

//Update job status
jobRouter.patch(
    "/:id",
    [
        body("status").isIn(["open", "closed"]).withMessage("Status must be either 'open' or 'closed'"),
    ],
    validateRequest,
    authorizeRoles("employer"),
    updateJobStatus
);

//Delete job
jobRouter.delete("/:id", authorizeRoles("employer"), deleteJob);

export default jobRouter;