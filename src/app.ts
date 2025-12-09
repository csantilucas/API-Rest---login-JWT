import dotenv from "dotenv"
import express from "express"
const app = express()
dotenv.config()

const port = process.env.port

app.listen(port,() =>{console.log("Server Running")})