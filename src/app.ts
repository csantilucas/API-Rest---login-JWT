import dotenv from "dotenv"
import express from "express"

const app = express()
dotenv.config()
const port = process.env.PORT

//ROTAS PARA IMPORTAR -----------
import userRoutes from "./routes/userRouter.js"


app.use(express.json());
app.use("/user", userRoutes)



 
app.listen(port,() =>{console.log(`Server Running on localhost:${port}`)})