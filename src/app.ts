import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
const app = express()
dotenv.config()
const port = process.env.PORT

//ROTAS PARA IMPORTAR -----------
import userRoutes from "./routes/userRouter.js"
import { connection } from "./database/connection.js"

connection()

app.use(express.json());
app.use("/user", userRoutes)
app.listen(port,() =>{console.log(`Server Running on localhost:${port}`)})

