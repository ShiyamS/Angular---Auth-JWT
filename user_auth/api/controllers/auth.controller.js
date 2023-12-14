import Role from "../models/Role.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";


export const register = async (req, res, next) => {
    // await next(createError(500, "My custom error!"))
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
        return res.status(200).send("User Registered Successfully !")

    } catch (error) {
        return res.status(500).send("Internal Server Error")
    }

}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send("User not found !");
        }

        const passwordCheck = await bcrypt.compare(req.body.password, user.password);
        if (!passwordCheck) {
            return res.status(400).send("Password incorrect !")
        }

        return res.status(200).send("User Logged In");

    } catch (error) {
        return res.status(500).send("Internal server error!");
    }
}
