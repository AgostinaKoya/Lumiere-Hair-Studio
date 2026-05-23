import { UnauthorizedError } from "../handleErrors/errors.js";
import { cookieOptions } from "../config/cookie_options";

export class LogoutController{
    static async logout(req, res){

        try{
            const user = req.session?.user;
    
            if (!user) {
                throw new UnauthorizedError("No hay sesión activa" )
            }


             const cookieOptions = {
            ...cookieOptions,
            path: "/",
        };


        return res
        .clearCookie("access_token", cookieOptions)
        .status(200)
        .json({
          message: "Logout successful",
          user: {
            email: user.email,
          },
        });

        }catch(e){
            if(e instanceof UnauthorizedError){
                return res.status(e.statusCode).json({ 
                    type: e.name, 
                    message: e.message 
        });
            }

        }
    }
}