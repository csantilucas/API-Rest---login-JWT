import { type Request, type Response, type NextFunction } from "express";
import { User } from "../models/User.js";
import { hashCompare, hashPassword } from "../utils/hash.js";
import { createToken } from "../utils/jwt.js";
import dotenv from "dotenv"
dotenv.config()

import { loginValidate, registerValidate } from "./validate.js";
import { getEventsByUser } from "../models/pipelines.js";

export class UserController {


    async register(req: Request, res: Response) {

        try {


            const { error } = registerValidate(req.body);
            if (error) return res.status(400).send(error.message);

            let findUser = await User.findOne({ "email": req.body.email })

            if (findUser) return res.status(400).send("email already exists")
            else {

                const hashPass = await hashPassword(req.body.password)
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    cpf: req.body.cpf,
                    contaSicoob: req.body.contaSicoob,
                    password: hashPass,
                    admin: true
                })

                const userSaved = await user.save();
                // Removendo a senha do retorno por segurança
                const { password, ...userResponse } = userSaved.toObject();
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


            const { error } = loginValidate(req.body);
            if (error) return res.status(400).send(error.message);

            let findUser = await User.findOne({ "email": req.body.email })
            if (!findUser) return res.status(400).send("login falid: user not find")

            const passUser: boolean = await hashCompare(req.body.password, findUser.password)
            if (!passUser) return res.status(400).send("incorret email or password")

            if (!process.env.TOKEN_SECRET) return
            const token = createToken(
                { name: findUser.name, id: findUser.id, email: findUser.email, admin: findUser.admin },
                process.env.TOKEN_SECRET
            );
            res.header("Authorization", token).send({ message: "User logged", token });

        } catch (error) {
            res.status(400).json({
                "error": "400",
                "mensage": "bad request"
            }
            )
        }


    }

    async myEvents(req:Request, res:Response){
        try{
            
            
            res.status(200).json(await getEventsByUser(req.user.id))
        }catch(erro){
            res.status(400).send("User not Find")
        }
    }

    listAll = async (req: Request, res: Response) => {
        try {

            const users = await User.find({
                admin: { $ne: true },       
            }, "-password"); 
            res.status(200).json(users);
        } catch (error) {
            res.status(500).send("Error fetching users");
        }
    }

}


