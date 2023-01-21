import User from '../models/user.model.js';
import Role from '../models/role.model.js';
import Class from "../models/class.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {validationResult} from "express-validator";

//JWT GENERATOR
const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '24h'})
}

//REGISTER
export const register = async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({message: "Error while registering", errors})
        }

        const {username, className, password} = req.body;
        const isUsed = await User.findOne({username});

        if (isUsed) {
            return res
                .status(402)
                .json({message: 'Username is already taken'})
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const userRole = await Role.findOne({name:"STUDENT"});
        const classId = await Class.findOne({name: className})

        const newUser = new User({
            username,
            password: hash,
            roles: [userRole.name],
            classId: classId._id
        });

        await newUser.save();

        res.json({
            newUser, message: 'Registration completed'
        });

    } catch (err) {
        res.status(400).json({message: "Error while registering"})
    }
};

//LOG IN
export const logIn = async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({username});

        if (!user) {
           return res.status(400).json({message: 'Username does not exist'})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.json({
                message: 'Wrong password'
            })
        }

        const token = generateAccessToken(user._id, user.roles);

        res.json({
            user,
            token,
            message: 'Logged in successfully'
        })

    } catch (err) {
        res.status(400).json({message: err})
    }
};

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
}