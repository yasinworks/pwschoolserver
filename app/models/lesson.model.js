import mongoose from "mongoose";

const Lesson = mongoose.model(
    'Lesson',
    new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        date: {
            type: String
        },
        classId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class',
            required: true
        }
}, {timestamps: true}));

export default Lesson;