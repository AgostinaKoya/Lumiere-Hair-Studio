import { UserRepository } from "../user.repository.js";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";
import { UnauthorizedError, ValidationError } from "../handleErrors/errors.js";


export class LoginModel {
    static async login({email, password}){

        try {
            const user = await UserRepository.login({ email, password });

            const token = jwt.sign({ user: user.id, email: user.email }, SECRET_KEY, {
            expiresIn: "1h",
        });

        
        return {user, token}
        } catch (error) {
            // Errores internos del repositorio se convierten a UnauthorizedError
            if (error.message.includes('password') || error.message.includes('email')) {
                throw new UnauthorizedError('Credenciales inválidas');
            }

            throw error;
        }
    }}