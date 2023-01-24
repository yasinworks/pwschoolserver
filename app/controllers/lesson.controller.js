import Lesson from "../models/lesson.model.js";
import Class from "../models/class.model.js";

//CREATE
export const createLesson = async (req, res) => {
    try {
        const {title, text, date, className} = req.body;
        const classId = await Class.findOne({name: className});
        const isUsed = await Lesson.findOne({title, classId});

        if (isUsed) {
            return res.status(402).json({message: "Lesson with same title already exist"});
        }



        const newLesson = new Lesson({
            title,
            text,
            date,
            classId: classId._id
        });

        await newLesson.save();

        res.json({newLesson, message: "Lesson created successfully"});

    } catch (err) {
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
        const {ID} = req.query;
        const lessons = await Lesson.find({classId: ID});

        if (!lessons) {
            return res.status(402).json("No lessons in this class")
        }

        res.json({lessons, message: "Lessons retrieved successfully"})
    } catch (err) {
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