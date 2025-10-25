import mongoose from "mongoose"

export const database = async () => {
    try {
        console.log("Starting Connection to MongoDB")

        const response = await mongoose.connect("mongodb://127.0.0.1:27017/OwenMovie?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.8")

        console.log("Koneksi ke database Berhasil")

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}