import { type Request, type Response, type NextFunction } from "express";
import { userSchema } from "../models/User.js";
import { createToken, testToken } from "../utils/jwt.js";
import dotenv from "dotenv"
dotenv.config()

declare global {
    namespace Express {
        interface Request {
            user?: any; // Replace 'any' with your actual user type
        }
    }
}

export class AuthController {

    constructor() {
        // Isso "trava" o contexto do 'this' para sempre
        this.auth = this.auth.bind(this);
        this.authAdmin = this.authAdmin.bind(this);
    }

    async auth(req: Request, res: Response, next: NextFunction) {
        let token = req.header("Authorization")
        if (!token) return res.status(401).send("acess denieded")

        // Remove "Bearer " prefix if present
        if (token.startsWith("Bearer ")) {
            token = token.slice(7)
        }

        try {
            const userVerified = testToken(token, process.env.TOKEN_SECRET!)
            req.user = userVerified
            next()
        } catch (error) {
            return res.status(401).send("Not ADMIN - acess denieded")
        }
    }

    async authAdmin(req: Request, res: Response) {
        if (req.user && req.user.admin) {
            res.send("Bem vindo ao admin")
        } else {
            res.status(401).send("Acess denied - Not admin")
        }
    }




}