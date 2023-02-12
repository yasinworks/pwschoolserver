import Class from "../models/class.model.js";
import {validationResult} from "express-validator";
import bcrypt from "bcryptjs";

// CREATE CLASS
export const createClass = async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({message: "Error while creating class", errors})
        }


        const {name, accessCode} = req.body;
        const isUsed = await Class.findOne({name})
        let hash = null;

        if (accessCode) {
            const salt = bcrypt.genSaltSync(10);
            hash = bcrypt.hashSync(accessCode, salt);
        }

        if (isUsed) {
            return res.status(402).json('Class already exist')
        }

        const newClass = new Class({
            name,
            accessCode: hash || 'No access code'
        })

        await newClass.save();
        res.json({newClass, message:"Class successfully created"});

    } catch (err) {
        console.log(err)
        res.status(402).json(err)
    }
}

// DELETE CLASS
export const deleteClass = async (req, res) => {
    try {
        const {name} = req.query;
        const doesExist = await Class.findOne({name})

        if (!doesExist) {
            return res.status(403).json({message: "Class does not exist"})
        }

        await Class.findByIdAndDelete( doesExist._id)

        res.json({message: "Deleted successfully"})

    } catch (err) {
        res.status(403).json(err)
    }
}

// GET ALL CLASSES
export const getAll = async (req, res) => {
    try {
        const classes = await Class.find();

        res.json(classes)
    } catch (err) {
        res.json({message: err})
    }
}


//GET ALL CLASSES WITHOUT LESSONS ID
export const getAllSecured = async (req, res) => {
    try {
        const classes = await Class.find();
        const classesWithoutLessons = classes.map(cl => {
            const { lessons,...classWithoutLesson } = cl.toObject()
            return classWithoutLesson
        });

        res.json(classesWithoutLessons)
    } catch (err) {
        console.log(err)
        res.json({message: "Error while retrieving classes"})
    }
}