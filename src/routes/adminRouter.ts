import  express from "express"
import { AuthController } from "../controlers/authController.js";
import { UserController } from "../controlers/userController.js";

const router = express.Router()

const userController = new UserController()

// No seu arquivo de rotas
router.get("/getUsers", 

    userController.listAll.bind(userController) 
);

export default router