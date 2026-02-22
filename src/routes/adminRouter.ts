import  express from "express"
import { AuthController } from "../controlers/authController.js";

const router = express.Router()
const authController = new AuthController()



router.post("/login",(req,res)=>{
   
    
})



// No seu arquivo de rotas
router.get("/", 
    authController.auth.bind(authController), 
    authController.authAdmin.bind(authController)
);

export default router