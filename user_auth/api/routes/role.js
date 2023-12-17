import express from "express";
import { createRole, getAllRoles, updateRole, deleteRole } from "../controllers/role.controller.js";
import { verifyAdmin } from "../utils/verify.js"

const router = express.Router();

// Role create
router.post("/create", verifyAdmin, createRole)

// Role update
router.put("/update/:id", verifyAdmin, updateRole)

// Get all Role
router.get("/getAll", verifyAdmin, getAllRoles)

// Delete Role
router.delete("/deleteRole/:id", verifyAdmin, deleteRole)



export default router;