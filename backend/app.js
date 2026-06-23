import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./src/routes/authRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.get("/", (req, res) => {

  res.json({
    success: true,
    message:
      "Backend Running Successfully",
  });

});

export default app;