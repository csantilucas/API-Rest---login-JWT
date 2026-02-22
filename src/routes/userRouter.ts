import  express from "express"
import { UserController } from "../controlers/userController.js";
import { AuthController } from "../controlers/authController.js";


const router = express.Router()


const authController = new AuthController()
const userController = new UserController();

router.post("/register",userController.register.bind(userController))

router.post("/login", userController.login.bind(userController));

// ✅ FORMA CORRETA
router.get("/", 
    authController.auth.bind(authController), 
    authController.authAdmin.bind(authController),
    userController.listAll.bind(userController) // O último envia a resposta
);




export default router