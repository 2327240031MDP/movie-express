import movieModel from "../models/movieModels.js";

export const listMovie = async (req, res) => {
    try {
        const data = await movieModel.find({})

        res.status(200).json({
            message: "Berhasil, LIST MOVIE:",
            data: data
        })

        } catch (error) {
            res.status(500).json({
                message: error.message,
                data: null
        })
    }
}

export const createNewMovie = async (req, res) => {
    try {
        const request = req.body
        console.log(request)

        const response = await movieModel.create({
            judul: request.judul,
            tahunRilis: request.tahunRilis,
            sutradara: request.sutradara
        })

        res.status(201).json({
            message: "Data Movie berhasil dibuat",
            data: response
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
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

        const response = await movieModel.findByIdAndUpdate(id, {
            judul: request.judul,
            tahunRilis: request.tahunRilis,
            sutradara: request.sutradara
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

        const response = await movieModel.findByIdAndDelete(id)

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