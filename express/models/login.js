import { UserRepository } from "../user.repository.js";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";
import { UnauthorizedError, ValidationError } from "../handleErrors/errors.js";
import { validateLogin } from "../validations/validations.js";


export class LoginModel {
    static async login({email, password}){
        validateLogin ({ email, password }) 

            const user = await UserRepository.login({ email, password }) 

            const token = jwt.sign(
            { user: user.id, email: user.email },
            SECRET_KEY,
            { expiresIn: '1h' }
            )

            return { user, token }
    }}