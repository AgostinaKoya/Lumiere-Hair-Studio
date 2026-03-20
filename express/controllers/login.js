
import { LoginModel } from "../models/login.js";

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
      res.status(401).send(error.message);
    }
  }
}
