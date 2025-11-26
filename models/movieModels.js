import mongoose from "mongoose";
import userModel from "./userModel.js";

const movieSchema = new mongoose.Schema (
    {
        judul: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        tahunRilis: {
            type: String,
            required: true,
            trim: true
        },
        sutradara: {
            type: String,
            required: true,
            trim: true
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: userModel,
        }
    },
    {
        timestamps: true,
    }
)

const movieModel = mongoose.models.movie || mongoose.model("movie", movieSchema)
//Menggunakan format ini dikarenakan ada kesalahan throw new _mongoose.Error.OverwriteModelError(name); OverwriteModelError: Cannot overwrite `movie` model once compiled.

export default movieModel