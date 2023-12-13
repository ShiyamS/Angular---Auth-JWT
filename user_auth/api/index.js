import express from 'express';

import mongoose from 'mongoose';
import dotenv from 'dotenv'
import roleRoute from './routes/role.js'
const app = express();
dotenv.config();

// Middle ware
app.use(express.json());
app.use("/api/role", roleRoute)


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
