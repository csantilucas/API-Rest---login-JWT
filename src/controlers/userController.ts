import { type Request, type Response } from "express";
import { userSchema } from "../models/User.js";
import mongoose from "mongoose";
import { hashCompare, hashPassword } from "../utils/hash.js";


const User = mongoose.model("User", userSchema)

export class UserController {

    async register(req: Request, res: Response) {

        try {
            let hasUser = await User.findOne({ "email": req.body.email })

            if (hasUser) return res.status(400).send("email already exists")
            else {

                const hashPass = await hashPassword(req.body.password)
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashPass
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
            let hasUser = await User.findOne({ "email": req.body.email })
            if (!hasUser) return res.status(201).send("login falid: email or password incorret")

            const passUser:boolean = await hashCompare(req.body.password, hasUser.password)
            if(passUser) return res.status(200).send("user logged")

        } catch (error) {
            res.status(400).json({
                "error": "400",
                "mensage": "bad request"
            }
            )
        }
        

    }
    async users(req: Request, res: Response) {
        res.send(`<h1>Usuarios</h1>`)

    }


}


