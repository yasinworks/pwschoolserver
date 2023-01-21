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
        grade: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class'
        }
}));

export default Lesson;