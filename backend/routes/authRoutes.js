import express from 'express';
import { body } from 'express-validator';
import { registerUser, loginUser, updateProfile } from "../controllers/authController.js";
import validateRequest from '../middleware/validateRequest.js';
import { protect } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post(
    '/register',
    [
        body('name', 'Name is required').not().isEmpty(),
        body('email', 'Please include a valid email').isEmail(),
        body('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
        body('role', 'Role must be either employer or candidate').isIn(['employer', 'candidate']),
    ],
    validateRequest,
    registerUser
);

authRouter.post(
    '/login',
    [
        body('email', 'Please include a valid email').isEmail(),
        body('password', 'Password is required').exists(),
    ],
    validateRequest,
    loginUser
);

authRouter.put(
    "/profile",
    protect,
    [
        body("name")
            .notEmpty()
            .withMessage("Name is required"),

        body("email")
            .isEmail()
            .withMessage("Please include a valid email"),

        body("company")
            .optional()
            .notEmpty()
            .withMessage("Company cannot be empty"),

        body("department")
            .optional()
            .notEmpty()
            .withMessage("Department cannot be empty"),
    ],
    validateRequest,
    updateProfile
);


export default authRouter;