
import { LoginModel } from "../models/login.js";
import { UnauthorizedError, ValidationError, ConnectionError } from "../handleErrors/errors.js";

export class LoginController {
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const { user, token } = await LoginModel.login({ email, password });
      
      
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 1000 * 60 * 60,
        })
        .send({ user, token });

        
    } catch (error) {

      if (error instanceof ValidationError) {
        return res.status(400).send({ error: error.message });
      }

      if (error instanceof ConnectionError) {
        return res.status(503).send({ error: "Servicio temporalmente no disponible" });
      }
      if (error instanceof UnauthorizedError) {

        return res.status(401).send({ error: error.message });
      }
      res.status(500).send({ error: "Ha ocurrido un error inesperado" });
    }

    }
  }
