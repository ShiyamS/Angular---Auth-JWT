import express from "express";
import { register, login, registerAdmin, sendEmail, resetPassword } from "../controllers/auth.controller.js"

const router = express.Router();


// Register
router.post('/register', register);


// Register Admin
router.post('/register-admin', registerAdmin);

// Loging

router.post('/login', login);

// Send Email

router.post('/send-email', sendEmail);

// Reset Password

router.post('/reset-password', resetPassword)



export default router;