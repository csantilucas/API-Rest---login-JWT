import { type Request, type Response, type NextFunction } from "express";
import { userSchema } from "../models/User.js";
import mongoose from "mongoose";
import { hashCompare, hashPassword } from "../utils/hash.js";
import { createToken } from "../utils/jwt.js";
import dotenv from "dotenv"
import { AuthController } from "./authController.js";
dotenv.config()



const authController = new AuthController()


const User = mongoose.model("User", userSchema)

export class UserController {

    async register(req: Request, res: Response) {

        try {
            let findUser = await User.findOne({ "email": req.body.email })

            if (findUser) return res.status(400).send("email already exists")
            else {

                const hashPass = await hashPassword(req.body.password)
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashPass,
                    admin:true
                })

                const userSaved = await user.save()
                res.status(201).send(userSaved)
            }
        } catch (error) {
            res.status(400).json({
                "error": "400",
                "mensage": "bad request"
            }
            )
        }
    }


    async login(req: Request, res: Response) {

        try {
            let findUser = await User.findOne({ "email": req.body.email })
            if (!findUser) return res.status(400).send("login falid: user not find")

            const passUser:boolean = await hashCompare(req.body.password, findUser.password)
            if(!passUser) return res.status(400).send("incorret email or password")

            if(!process.env.TOKEN_SECRET)return
            const token:string = createToken({name:findUser.name ,id:findUser.id, email:findUser.email, admin:findUser.admin }, process.env.TOKEN_SECRET )
            res.header("authorizted",token).send("user logged")

        } catch (error) {
            res.status(400).json({
                "error": "400",
                "mensage": "bad request"
            }
            )
        }
        

    }


    async users(req: Request, res: Response, next:NextFunction) {
        //funcao que verifica se o usuario esta logado
        authController.auth(req,res,next)
    
    }


}


