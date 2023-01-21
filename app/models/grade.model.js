import mongoose from "mongoose";

const Grade = mongoose.model(
    "Grade",
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        Students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }, {timestamps: true})
);

export default Grade;