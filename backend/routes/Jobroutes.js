import express from "express";
import { body } from "express-validator";
import { createJob, getAllJobs, getJobById, updateJob, updateJobStatus, deleteJob } from "../controllers/jobController.js";
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

//UPDATE JOB DETAILS
jobRouter.put(
  "/:id",

  authorizeRoles("employer"),

  [
    body("title")
      .trim()
      .notEmpty()
      .withMessage(
        "Job title is required."
      ),

    body("company")
      .trim()
      .notEmpty()
      .withMessage(
        "Company is required."
      ),

    body("description")
      .trim()
      .notEmpty()
      .withMessage(
        "Description is required."
      ),

    body("required_skills")
      .isArray({
        min: 1,
      })
      .withMessage(
        "Required skills are required."
      ),

    body("experience_years")
      .optional()
      .isInt({
        min: 0,
      })
      .withMessage(
        "Experience must be a non-negative number."
      ),

    body("status")
      .optional()
      .isIn([
        "open",
        "closed",
      ])
      .withMessage(
        "Status must be open or closed."
      ),
  ],
  validateRequest,
  updateJob
);

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