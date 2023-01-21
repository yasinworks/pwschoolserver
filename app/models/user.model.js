import mongoose from "mongoose";

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        grade: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Grade",
        },
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ]
    }, {timestamps: true})
);


export default User;