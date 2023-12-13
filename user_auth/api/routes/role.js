import express from "express";
import { createRole, getAllRoles, updateRole, deleteRole } from "../controllers/role.controller.js";

const router = express.Router();

// Role create
router.post("/create", createRole)

// Role update
router.put("/update/:id", updateRole)

// Get all Role
router.get("/getAll", getAllRoles)

// Delete Role
router.delete("/deleteRole/:id", deleteRole)



export default router;