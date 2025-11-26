import mongoose from "mongoose";

const userSchema = new mongoose.Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true,
    }
)

const userModel = new mongoose.model("users", userSchema)

export default userModel