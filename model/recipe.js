import mongoose from "mongoose";

const recipeShcema = mongoose.Schema({
    recipeName: {
        type: String,
        required: [true, "Recipe name is required"]
    },
    description: {
        type: String,
        required: [true, "Recipe description is required"]
    },
    ingredient: {
        type: String,
        required: [true, "Recipe ingredient is required"]
    },
    instruction: {
        type: String,
        required: [true, "Recipe instruction is required"]
    },
    image: {
        type: String,
        default: "image"
    },
    category: {
        type: String,
        enum: ["egg", "veg", "non-veg"],
        required: [true, "Recipe category is required"]
    },
    cafeUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "Cafe user is required"]
    },
    avgRating: {
        type: Number,
        default: 0
    },
    reviwe: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                required: [true, "user is required in reviwe"]
            },
            message: {
                type: String
            },
            rating: {
                type: Number,
                required: [true, "rating is required in reviwe"],
                min: [1, "rating value is 1 to 5 only"],
                max: [5, "rating value is 1 to 5 only"]
            },
            postAt: {
                type: Date,
                default: Date.now()
            }
        }
    ]
}, { timestamp: true })


mongoose.models = {}

export const recipe = mongoose.model("recipe", recipeShcema)