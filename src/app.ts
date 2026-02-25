import dotenv from "dotenv"
import express from "express"
const app = express()
dotenv.config()


//ROTAS PARA IMPORTAR -----------
import userRoutes from "./routes/userRouter.js"
import adminRoutes from "./routes/adminRouter.js"
import eventRoutes from "./routes/eventRouter.js"
import { connection } from "./database/connection.js"

app.use(express.json());

connection();

app.use("/user", userRoutes)
app.use("/event", eventRoutes)
app.use("/admin", adminRoutes)


export default app;