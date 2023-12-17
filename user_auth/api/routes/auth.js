import express from "express";
import { register, login, registerAdmin } from "../controllers/auth.controller.js"

const router = express.Router();


// Register
router.post('/register', register);


// Register Admin
router.post('/register-admin', registerAdmin);

// Loging

router.post('/login', login);



export default router;