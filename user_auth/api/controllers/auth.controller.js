import Role from "../models/Role.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs"
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {
        const role = await Role.find({ role: 'User' });
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
            roles: role,
        })
        await newUser.save();
        return next(CreateSuccess(200, "User Registered !"))

    } catch (error) {
        return next(CreateError(500, "Internal server error!"))
    }

}

export const registerAdmin = async (req, res, next) => {
    try {
        const role = await Role.find({});
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            isAdmin: true,
            password: hashPassword,
            roles: role,
        })
        await newUser.save();
        return next(CreateSuccess(200, "Admin Registered !"))

    } catch (error) {
        return next(CreateError(500, "Internal server error!"))
    }

}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
            .populate('roles', 'role');

        const { roles } = user;
        if (!user) {
            return next(CreateError(404, "User not found !"))
        }

        const passwordCheck = await bcrypt.compare(req.body.password, user.password);
        if (!passwordCheck) {
            return next(CreateError(404, "Password incorrect !"))
        }
        const token = jwt.sign(
            { id: user._id, admin: user.isAdmin, roles: roles },
            process.env.JWT_SECRET
        )

        res.cookie("access_token", token, { httpOnly: true })
        return next(CreateSuccess(200, "User Logged In !", user))

    } catch (error) {
        return next(CreateError(505, "Internal server error!"))

    }
}
