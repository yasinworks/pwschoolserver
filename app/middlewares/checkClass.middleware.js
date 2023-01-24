import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const checkClass = async (req, res, next) => {
    if (req.method === "OPTIONS") {
        next()
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
        const {id} = jwt.verify(token, process.env.JWT_SECRET)
        let hasRole = false;
        const user = await User.findById(id)


        if (req.query.ID.includes(user.classId)) {
            hasRole = true
        }

        if (!hasRole) {
            return res.status(403).json({message: 'No access'})
        }

        next();
    } catch (err) {
        return res.status(403).json({message: 'Not authorized'})
    }

}