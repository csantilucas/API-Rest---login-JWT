import  express from "express"
import { UserController} from "../controlers/userController.js"
const router = express.Router()

const userController = new UserController();

router.post("/register",(req,res)=>{
    userController.register(req,res)
    
})

router.post("/login",(req,res)=>{
    userController.login(req,res)
    
})

router.post("/",(req,res)=>{
    userController.users(req,res)
})

export default router