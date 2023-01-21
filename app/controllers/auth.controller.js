import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//REGISTER
export const register = async (req, res) => {
    try {
        const {username, password} = req.body;
        const isUsed = await User.findOne({username});

        if (isUsed) {
            return res
                .status(402)
                .json({message: 'Username is already taken'})
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            password: hash
        });

        await newUser.save();

        res.json({
            newUser, message: 'Registration completed'
        });

    } catch (err) {
        res.json({message: err})
    }
};

//LOG IN
export const logIn = async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({username});

        if (!user) {
           return res.json({message: 'Username does not exist'})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.json({
                message: 'Wrong password'
            })
        }

        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET,
            {expiresIn: '30d'}
        );

        res.json({
            user,
            token,
            message: 'Logged in successfully'
        })

    } catch (err) {
        res.json({message: err})
    }
};

//GET ME
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userID);

        if (!user) {
            return res.json({message: 'User does not exist'});
        }

        const token = jwt.sign({
                id: user._id,
            }, process.env.JWT_SECRET, {expiresIn: '30d'});

        res.json({
            user,
            token
        })
    } catch (err) {
        console.log(err)
    }
};

//LOG OUT
export const logOut = async () => {
    try {

    } catch (err) {
        console.log(err)
    }
}