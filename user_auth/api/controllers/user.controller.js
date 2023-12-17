import User from "../models/user.js"
import { CreateError } from "../utils/error.js"
import { CreateSuccess } from "../utils/success.js"


// Get all users
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({})
        if (users) {
            return next(CreateSuccess(200, "All Users", users));
        }
        return next(CreateError(404, "Users not found"));
    } catch (error) {
        return next(CreateError(500, "Internal server Error"));
    }
}

// Get a User
export const getById = async (req, res, next) => {
    try {
        const userID = req.params.id;
        const user = await User.findById({ _id: userID })
        if (!user) {
            return next(CreateError(404, "User not found !"))
        }

        return next(CreateSuccess(200, "User found", user))
    } catch (error) {
        return next(CreateError(500, "Internal server Error"));
    }
}