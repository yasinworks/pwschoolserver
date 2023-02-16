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
        }
}, {timestamps: true}));

export default Lesson;