import { UnauthorizedError } from "../handleErrors/errors.js";

export class LogoutController{
    static async logout(req, res){

        try{
            const user = req.session?.user;
    
            if (!user) {
                throw new UnauthorizedError("No hay sesión activa" )
            }
    
            res.clearCookie("access_token").json({ 
                message: "Logout successful",
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
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