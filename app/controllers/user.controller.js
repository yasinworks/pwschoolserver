import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

//JWT GENERATOR
const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '24h'})
}

//GET ME
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.json({message: 'User does not exist'});
        }

        const token = generateAccessToken(user._id, user.roles)

        res.json({
            user,
            token
        })
    } catch (err) {
        res.json(err)
    }
};

//GET ALL USERS
export const getAll = async (req, res) => {
    try {
        const users = await User.find();

        res.json(users)
    } catch (err) {
        res.json({message: err})
    }
};