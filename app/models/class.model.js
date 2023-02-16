import mongoose from "mongoose";

const Class = mongoose.model(
    "Class",
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        lessons: [
            {
                type: String,
                ref: "Lesson"
            }
        ],
        accessCode: {
            type: String
        }
    }, {timestamps: true})
);

export default Class;