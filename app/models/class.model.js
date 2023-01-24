import mongoose from "mongoose";

const Class = mongoose.model(
    "Class",
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true
        }
    }, {timestamps: true})
);

export default Class;