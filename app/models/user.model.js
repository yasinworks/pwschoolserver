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
        roles: [
            {
                type: String,
                ref: "Role"
            }
        ],
        class: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
        },

    }, {timestamps: true})
);


export default User;