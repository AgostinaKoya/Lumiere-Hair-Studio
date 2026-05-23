import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";

export const jwtMiddleware = () => {
  return (req, res, next) => {

        console.log("Origin:", req.headers.origin);
    console.log("Cookies recibidas:", req.cookies);
    console.log("Cookie header raw:", req.headers.cookie);
    const token = req.cookies?.access_token;
    req.session = { user: null };

    if (token) {
      try {
        const data = jwt.verify(token, SECRET_KEY);
        req.session.user = data;
      } catch (error) {
        // token invalido o expirado
      }
    } else {
      //TODOO
      console.log("⚠️ No se recibió token en las cookies");
    }

    next();
  };
};

