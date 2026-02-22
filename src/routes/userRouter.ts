import  express from "express"
import { UserController } from "../controlers/userController.js";
import { AuthController } from "../controlers/authController.js";


const router = express.Router()



const userController = new UserController();

router.post("/register",(req,res)=>{
    userController.register(req,res)
    
})

router.post("/login",(req,res)=>{
    userController.login(req,res)
})

router.get("/",(req,res,next)=>{
    userController.users(req,res,next)
})

export default router