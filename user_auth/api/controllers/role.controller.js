import Role from "../models/Role.js";
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";
export const createRole = async (req, res, next) => {
    try {
        if (req.body.role && req.body.role !== '') {
            const newRole = new Role(req.body);
            await newRole.save();
            return next(CreateSuccess(200, "Role Created"))
        } else {
            return next(CreateError(400, "Bad Reques"))
        }
    }
    catch (error) {
        return next(CreateError(505, "Internal server error!"))
    }
}

export const updateRole = async (req, res, next) => {
    try {
        const role = await Role.findById({
            _id: req.params.id
        })
        if (role) {
            const newData = await Role.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            )
            return next(CreateSuccess(200, "Role updated !"))
        } else {
            return next(CreateError(404, "Role not foumd !"))
        }

    } catch (error) {
        return next(CreateError(505, "Internal server error!"))
    }
}

export const getAllRoles = async (req, res, next) => {
    try {
        const roles = await Role.find({});
        if (roles) {
            return next(CreateSuccess(200, "All Role ", roles))
        }
    } catch (error) {
        return next(CreateError(505, "Internal server error!"))
    }
}

export const deleteRole = async (req, res, next) => {
    try {
        const roleId = req.params.id;
        const role = await Role.findById({ _id: roleId });
        if (role) {
            const deleteRole = await Role.findByIdAndDelete(role)
            return next(CreateSuccess(200, "Role Deleted "))
        } else {
            return next(CreateError(404, "Role not foumd !"))
        }
    } catch (error) {
        return next(CreateError(505, "Internal server error!"))

    }
}