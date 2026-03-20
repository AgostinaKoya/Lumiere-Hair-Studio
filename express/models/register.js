import { UserRepository } from "../user.repository.js";


export class RegisterModel{
    static async register({email, password}){

         const id = await UserRepository.create({ email, password });
        
         return id
    }
}