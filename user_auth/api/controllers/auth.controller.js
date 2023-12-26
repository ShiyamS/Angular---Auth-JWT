import Role from "../models/Role.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs"
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";
import jwt from "jsonwebtoken";
import UserToken from "../models/UserToken.js";
import nodemailer from "nodemailer"

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

export const sendEmail = async (req, res, next) => {
    const email = req.body.email;
    const user = await User.findOne({ email: { $regex: "^" + email + "$", $options: "i" } });
    if (!user) {
        return next(CreateError(404, "User not found to reset email"));
    }

    const payload = {
        email: user.email
    }
    const expiryTime = 300;
    // Creating token using payload
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiryTime });
    console.log("token::", token)

    const newToken = new UserToken({
        userId: user._id,
        token: token
    })

    const mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "shiyams315@gmail.com",
            pass: "ifzzdwmwsinibokh"
        }
    });

    let mailDetails = {
        form: "shiyams315@gmail.com",
        to: "shiyams315@gmail.com",
        subject: "Reset Password !",
        html: `
        <html>
         <head>
             <title>Password Reset Request</title>
         </head>
         <body>
            <h1>Password Reset Request</h1>
            <p> Dear ${user.username}</p>
            <p> We have received request to reset your password for you account withBookMyBooks. To complete the password rest process please click on the below button:</p>
            <a href=${process.env.LIVE_URL}/reset/${token}><button style="background-color:#4CAF50; color:white; padding:14px 20px; border:none; cursor:pointer; border-radius:4px;">Reset Password</button></a>
            <p>Please note that this link is valid for 5mins. If you  did not request  a password reset , please disregard tis message</p>
            <p>Thank you !</p>
            <p>${process.env.LIVE_URL}/reset/${token}</p>
         </body >
        </html >
    `
    };

    mailTransporter.sendMail(mailDetails, async (err, data) => {
        if (err) {
            console.log(err);
            return next(CreateError(500, "Something went wrong while sending the email"));
        } else {
            await newToken.save();
            return next(CreateSuccess(200, "Mail sent successfully!"))

        }
    })

}


export const resetPassword = (req, res, next) => {
    const token = req.body.token;
    const newPassword = req.body.pasword;

    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
        if (err) {
            return next(CreateError(500, "Reset Link is Expired"));
        } else {
            const response = data;
            const user = await User.findOne({
                email: {
                    $regex: "^" + response.email + "$", $options: 'i'
                }
            })

            const salt = await bcrypt.getSalt(10);
            const encryptPassword = await bcrypt.hash(newPassword, salt);
            user.password = encryptPassword;
            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $set: user },
                    { new: true }
                )
                return next(CreateSuccess(200, "Pasword Reset  Success !"))
            } catch (error) {
                return next(CreateError(500, ' Something went wrong while resetting the password'))
            }


        }
    })
}
