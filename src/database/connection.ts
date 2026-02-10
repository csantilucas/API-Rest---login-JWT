
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

export async function connection() {

    const user = process.env.userBD ||"apiUser";
    const pwd = process.env.pwdBD || "112658n";
    const url = process.env.urlBD ||"mongodb://127.0.0.1:27017/API";

    if (!user || !pwd || !url) {
        throw new Error("Variáveis de ambiente de conexão não configuradas!");
        
    }

    try {
        await mongoose.connect(url, {
            user: user,
            pass: pwd,
            dbName: "admin",
            serverSelectionTimeoutMS: 5000, // tempo limite para selecionar servidor
            socketTimeoutMS: 45000,         // tempo limite de socket
            maxPoolSize: 10,                // número máximo de conexões no pool
            minPoolSize: 1,                 // número mínimo de conexões
            connectTimeoutMS: 30000      // tempo limite para conexão inicial
        })
        console.log("conectado")
    } catch (erro) { console.log(erro) }

}





