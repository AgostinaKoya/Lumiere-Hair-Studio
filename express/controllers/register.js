import { ValidationError, ConflictError } from "../handleErrors/errors.js";
import { RegisterModel } from "../models/register.js";

export class RegisterController{
static async register(req, res){
     const { email, password } = req.body;

  try {
    const id = await RegisterModel.register({ email, password });
    res.send({ id });
  } catch (e) {
    if (e instanceof ValidationError) 
        return res.status(400).json({ type: e.name, message: e.message })
      
      if (e instanceof ConflictError)
        return res.status(409).json({ type: e.name, message: e.message })

      return res.status(500).json({ error: 'Internal server error' })
    
  }
}


}