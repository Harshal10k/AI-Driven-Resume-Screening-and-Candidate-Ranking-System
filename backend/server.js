import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/authRoutes.js';
import cors from 'cors';
import jobRouter from './routes/JobRoutes.js';
import resumeRouter from './routes/resumeRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import candidateRoutes from "./routes/candidateRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));
app.use('/api/auth', authRouter);
app.use('/api/jobs', jobRouter);
app.use('/api/resumes', resumeRouter);
app.use( '/api/admin',adminRoutes);
app.use("/api/candidate",candidateRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});