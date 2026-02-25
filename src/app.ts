import dotenv from "dotenv"
import express from "express"
const app = express()
dotenv.config()


//ROTAS PARA IMPORTAR -----------
import userRoutes from "./routes/userRouter.js"
import adminRoutes from "./routes/adminRouter.js"
import eventRoutes from "./routes/eventRouter.js"
import { connection } from "./database/connection.js"

connection()

app.use(express.json());
app.use("/user", userRoutes)
app.use("/event", eventRoutes)
app.use("/admin", adminRoutes)


export default app;