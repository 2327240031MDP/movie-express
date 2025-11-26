import mongoose from "mongoose";
import movieModel from "../models/movieModels.js";

export const movies = async (req, res) => {
    try {
        const data = await movieModel.find({
            createdBy: req.user.user_id
        }).sort({createdAt: -1});

        res.status(200).json({
            message: "Daftar semua movie",
            data: data
        })

    } catch (error) {
        res.status(500).json({
            message: "Terjadi kesalahan pada server",
            error: error.message,
            data: null
        })
    }
}

export const addNewMovie = async (req, res) => {
    try {
        const { judul, tahunRilis, sutradara } = req.body;
        
        console.log("Full request body:", req.body);
        console.log("judul:", judul);
        console.log("tahunRilis:", tahunRilis);
        console.log("sutradara:", sutradara);

        if (!judul || !tahunRilis || !sutradara) {
            return res.status(400).json({
                message: "Semua field (judul, tahunRilis, sutradara) wajib diisi",
                data: null,
                received: {
                    judul,
                    tahunRilis,
                    sutradara
                }
            })
        }

        const response = await movieModel.create({
            judul,
            tahunRilis,
            sutradara,
            createdBy: req.user.user_id
        })

        res.status(201).json({
            message: "Berhasil menambahkan movie baru",
            data: response
        })

    } catch (error) {
        res.status(500).json({
            message: "Gagal menambahkan movie",
            error: error.message,
            data: null
        })
    }
}

export const detailMovie = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "ID tidak valid",
                data: null
            });
        }

        const movie = await movieModel.findOne({
            _id: id,
            createdBy: req.user.user_id
        });

        if (!movie) {
            return res.status(404).json({
                message: "Movie tidak ditemukan",
                data: null
            });
        }

        return res.status(200).json({
            message: "Detail movie",
            data: movie
        });
    } catch (error) {
        return res.status(500).json({
            message: "Terjadi kesalahan pada server",
            error: error.message,
            data: null
        });
    }
}

export const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const { judul, tahunRilis, sutradara } = req.body;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "ID tidak valid",
                data: null
            });
        }

        const updatedMovie = await movieModel.findOneAndUpdate(
            {
                _id: id,
                createdBy: req.user.user_id
            },
            { judul, tahunRilis, sutradara },
            { new: true }
        );

        if (!updatedMovie) {
            return res.status(404).json({
                message: "Movie tidak ditemukan atau akses ditolak",
                data: null
            });
        }

        return res.status(200).json({
            message: "Berhasil mengupdate movie",
            data: updatedMovie
        });
    } catch (error) {
        return res.status(500).json({
            message: "Terjadi kesalahan pada server",
            error: error.message,
            data: null
        });
    }
}

export const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "ID tidak valid",
                data: null
            });
        }

        const deletedMovie = await movieModel.findOneAndDelete({
            _id: id,
            createdBy: req.user.user_id
        });

        if (!deletedMovie) {
            return res.status(404).json({
                message: "Movie tidak ditemukan atau akses ditolak",
                data: null
            });
        }

        return res.status(200).json({
            message: "Berhasil menghapus movie",
            data: deletedMovie
        });
    } catch (error) {
        return res.status(500).json({
            message: "Terjadi kesalahan pada server",
            error: error.message,
            data: null
        });
    }
}