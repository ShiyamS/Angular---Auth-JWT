import express from 'express';

import mongoose from 'mongoose';
import dotenv from 'dotenv'
import roleRoute from './routes/role.js'
import authRole from './routes/auth.js'
const app = express();
dotenv.config();

// Middle ware
app.use(express.json());
app.use("/api/role", roleRoute)
app.use("/api/auth", authRole)


// Error Handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || "Something went wrong"
    return res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: errorMessage,
        stack: err.stack

    })
})

// DB connection
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to AuthDB database')
    } catch (error) {
        throw error;
    }
}

app.listen(8000, () => {
    connectMongoDB();
    console.log('Connected to Backend')
})
