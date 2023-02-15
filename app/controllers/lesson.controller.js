import Lesson from "../models/lesson.model.js";
import Class from "../models/class.model.js";
import bcrypt from "bcryptjs";

//CREATE
export const createLesson = async (req, res) => {
    try {
        const {title, text, date, className} = req.body;
        const classId = await Class.findOne({name: className});

        const newLesson = new Lesson({
            title,
            text,
            date
        });

        await newLesson.save();

        const update = {lessons: [...classId.lessons, newLesson._id]};
        await classId.updateOne(update);

        res.json({newLesson, message: "Lesson created successfully"});

    } catch (err) {
        console.log(err)
        res.json({message: 'Error while creating this lesson'})
    }
}

//DELETE LESSON
export const deleteLesson = async (req, res) => {
    try {
        const {title} = req.query;
        const doesExist = await Lesson.findOne({title})

        if (!doesExist) {
            return res.status(403).json({message: "Lesson does not exist"})
        }

        await Lesson.findByIdAndDelete(doesExist._id)

        res.json({message: "Deleted successfully"})

    } catch (err) {
        res.status(403).json(err)
    }
}

//GET BY CLASS
export const getLessonsByClass = async (req, res) => {
    try {
        const {ID, accessCode} = req.query;
        const classL = await Class.findById(ID);
        const classAccessCode = classL.accessCode
        const lessonsId = classL.lessons
        let lessons = []


        const isAccessCodeCorrect = await bcrypt.compare(accessCode, classAccessCode);

        if (!isAccessCodeCorrect && classAccessCode !== 'No access code') {
            return res.json({message: "Wrong access code"})
        }


        if (lessonsId.length === 0) {
            return res.status(402).json({message: "No lessons in this class"})
        }

        lessonsId.map(async (lesson) => {
            lessons = [...lessons, await Lesson.findById(lesson)]
            if (lessons.length === lessonsId.length) {
                res.status(200).json({lessons, message: "Lessons retrieved successfully"})
            }
        })

    } catch (err) {
        console.log(err)
        res.status(402).json({message: "Error while retrieving lessons", err})
    }
};

//GET ALL
export const getAll = async (req, res) => {
    try {
        const lessons = await Lesson.find();

        res.json(lessons)
    } catch (err) {
        res.status(400).json({message: "Error while retrieving all lessons"})
    }
}