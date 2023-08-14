import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        default: null
    },
    last_name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    createdAt: {
        type: String,
        default: null
    },
    permissions: {
        type: String,
        default: 'Admin'
    },
    token: {
        type: String,
    }
})

export const User = mongoose.model("users", userSchema)