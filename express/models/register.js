import { UserRepository } from "../user.repository.js";
import { validateRegister } from "../validations/validations.js";


export class RegisterModel{
    static async register({email, password}){

        validateRegister({ email, password })
         const id = await UserRepository.create({ email, password });
         
         return id
    }
}