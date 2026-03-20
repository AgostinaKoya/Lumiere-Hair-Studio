import { UserRepository } from "../user.repository.js";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";


export class LoginModel {
    static async login({email, password}){

        const user = await UserRepository.login({ email, password });
        const token = jwt.sign({ user: user._id, email: user.email }, SECRET_KEY, {

            
        expiresIn: "1h",
    });

    
    return {user, token}
    }}