import express from "express"
import * as movieController from "../controller/movieController.js"

const api = express.Router()

api.get("/movies", movieController.listMovie)

api.post("/movies", movieController.createNewMovie)

api.put("/movies/:id", movieController.updateMovie)

api.delete("/movies/:id", movieController.deleteMovie)

export default api