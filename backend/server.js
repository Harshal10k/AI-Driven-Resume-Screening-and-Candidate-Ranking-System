import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/authRoutes.js';
import cors from 'cors';
import jobRouter from './routes/Jobroutes.js';
import resumeRouter from './routes/resumeRoutes.js';


dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // allow requests with no origin (e.g. curl, Postman, server-to-server)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));
app.use('/api/auth', authRouter);
app.use('/api/jobs', jobRouter);
app.use('/api/resumes', resumeRouter);


app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});