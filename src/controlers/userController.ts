import type { Request, Response } from "express";


export class UserController {
    
    async register(req: Request, res: Response) {
        res.send("Rota para registro")

    }
    async login(req: Request, res: Response) {
        res.send("Rota para login")

    }

    async users(req: Request, res: Response) {
        res.send("Rota para retornar usuario")

    }


}
