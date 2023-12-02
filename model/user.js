import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        unique: [true, "username already used"]
    },
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        select: false
    },
    password: {
        type: String,
        required: [true, "password is required"],
        select: false
    },
    favRecipes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "recipe",
            select: false
        }
    ],
    myRecipes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "recipe",
            select: false
        }
    ],
    followrs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            select: false
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user", 
            select: false
        }
    ],
    resetOtp: {
        type: Number,
        select: false
    },
    resetDate: {
        type: Date,
        select: false
    }
}, { timestamps: true })


mongoose.models = {}

export const user = mongoose.model("user", userSchema) 