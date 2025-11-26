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

        if (!judul || !tahunRilis || !sutradara) {
            return res.status(400).json({
                message: "Semua field (judul, tahunRilis, sutradara) wajib diisi",
                data: null
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

export const updateMovie = async (req, res) => {
    try {
        const id = req.params.id
        const request = req.body

        if (!id) {
            return res.status(500).json({
                message: "ID salah, masukan id yang benar.",
                data: null
            })
        }

        if (!request.judul || !request.tahunRilis || !request.sutradara) {
            return res.status(400).json({
                message: "Judul, tahunRilis, dan sutradara wajib diisi",
                data: null
            })
        }

        const response = await movieModel.findByIdAndUpdate(id, {
            judul: request.judul,
            tahunRilis: request.tahunRilis,
            sutradara: request.sutradara,
            createdBy: req.user.user_id
        })

        if (!response) {
            return res.status(404).json ({
                message: "Informasi data movie gagal diupdate",
                data: null
            })
        }

        return res.status(200).json({
            message: "Informasi data movie berhasil diupdate",
            data: null
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null
        })
    }
}

export const deleteMovie = async (req, res) => {
    try {
        const id = req.params.id

        if (!id) {
            return res.status(500).json({
                message: "ID salah, masukan id yang benar."
            })
        }

        const response = await movieModel.findByIdAndDelete({
            _id: id, 
            createdBy: req.user.user_id
        })

        if (!response) {
            return res.status(404).json ({
                message: "Informasi data movie gagal dihapus",
                data: null
            })
        }

        return res.status(200).json({
            message: "Informasi data movie berhasil dihapus",
            data: null
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null
        })
    }
}