import mongoose from 'mongoose';

const Role = mongoose.model(
    "Role",
    new mongoose.Schema({
        name: {
            type: String,
            unique: true,
            required: true,
            default: "STUDENT"
        }
    })
);

export default Role;