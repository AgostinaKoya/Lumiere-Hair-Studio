
import { LoginModel } from "../models/login.js";
import { UnauthorizedError, ValidationError, ConnectionError } from "../handleErrors/errors.js";

export class LoginController {
  static async login(req, res) {
    if (!req.body || req.body === null || req.body === undefined) {
      //return res.status(400).json({ type: 'VALIDATION_ERROR', message: 'Request body is required' })
      
    }
    const { email, password } = req.body;

    try {
      const { user, token } = await LoginModel.login({ email, password });
      
      
      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "strict" : "none",
          maxAge: 1000 * 60 * 60,
        })
        .status(200)
        .send({ user, token });

        
    } catch (e) {

      if (e instanceof ValidationError) {
         return res.status(e.statusCode).json({ type: e.name, message: e.message })
      }

      if (e instanceof ConnectionError) {
        return res.status(504).send({ e: "Servicio temporalmente no disponible" });
      }
      if (e instanceof UnauthorizedError) {

        return res.status(e.statusCode).send({ type: e.name, message: e.message });
      }
      res.status(500).send({ e: "Ha ocurrido un error inesperado" });
    }

    }
  }
