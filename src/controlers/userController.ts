import {type Request, type Response } from "express";
import { userSchema } from "../models/User.js";
import mongoose from "mongoose";
import { hashPassword } from "../utils/hash.js";


const User = mongoose.model("User", userSchema)

export class UserController {

    async register(req: Request, res: Response) {
        
        

        try {
            
            const hashPass = await hashPassword(req.body.password)

            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashPass
            })

            const userSaved = await user.save()
            res.status(201).send(userSaved)
        } catch (error) {
            res.status(400).json({
                "error": "400",
                "mensage": "bad request"
            }
            )
        }

    }
    async login(req: Request, res: Response) {
        res.send("Rota para login")

    }
    async users(req: Request, res: Response) {
        res.send("Rota para retornar usuario")

    }


}
