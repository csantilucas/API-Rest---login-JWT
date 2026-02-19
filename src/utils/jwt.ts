import jwt from "jsonwebtoken"

let user = {
    id: "",
    "email": "email@gmail.com",
    "pass": "123"
}


export function createToken(data:{name:string, id:string, email:string},secret:string) {
    return jwt.sign(data, secret);
}


export function testToken(token:string,secret:string) {
    try {
        const validDat = jwt.verify(token, secret)
        console.log(validDat)
    } catch (error) {
        console.log(error)
    }
}


//createToken()
