import express from "express";
import { getAllUsers, getById } from "../controllers/user.controller.js"
import { verifyUser, verifyAdmin } from "../utils/verify.js"

const router = express.Router();

// Get all users
router.get("/", verifyAdmin, getAllUsers)

// Get A User
router.get("/:id", verifyUser, getById)

export default router;