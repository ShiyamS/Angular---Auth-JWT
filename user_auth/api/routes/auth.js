import express from "express";
import { register, login } from "../controllers/auth.controller.js"

const router = express.Router();


// Register
router.post('/register', register);

// Loging

router.post('/login', login);



export default router;