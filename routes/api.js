import express from "express"
import * as movieController from "../controller/movieController.js"
import * as userController from "../controller/userController.js"
import { authenticateTokenMiddleware } from "../middlewares/authenticateTokenMiddleware.js"

const api = express.Router()

api.post("/signup", userController.signUp)
api.post("/signin", userController.signIn)

api.get("/movies", authenticateTokenMiddleware, movieController.listMovie)
api.post("/movies", authenticateTokenMiddleware, movieController.createNewMovie)
api.put("/movies/:id", authenticateTokenMiddleware, movieController.updateMovie)
api.delete("/movies/:id", authenticateTokenMiddleware, movieController.deleteMovie)

export default api