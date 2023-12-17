import jwt from "jsonwebtoken";
import { CreateError } from "./error.js";



export const verifyToken = async (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) {
        return next(CreateError(401, "Your not authenticated"));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(CreateError(403, "Toke not valid"))
        }
        req.user = user;
        next();
    })
}

export const verifyUser = async (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.admin) {
            next()
        } else {
            return next(CreateError(403, "Your not authrozied !"))
        }
    })
}

export const verifyAdmin = async (req, res, next) => {
    verifyToken(req, res, () => {
        console.log(req.user.admin)
        if (req.user.admin) {
            next();
        } else {
            return next(CreateError(403, "Your not authrozied !"))
        }
    })
}