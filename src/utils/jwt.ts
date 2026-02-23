import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

let user = {
    id: "",
    "email": "email@gmail.com",
    "pass": "123"
}

interface data {
    name:string, id:string, email:string, admin:boolean
}

export function createToken(data:data,secret:string) {
    return jwt.sign(data, secret,{ expiresIn:'5h'});
}


export function testToken(token:string,secret:string) {
    try {
        const validDat = jwt.verify(token, secret)
        console.log(validDat)
        return validDat
    } catch (error) {
        console.log(error)
        throw error
    }
}

