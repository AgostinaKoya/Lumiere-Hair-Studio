import { RegisterModel } from "../models/register.js";

export class RegisterController{
static async register(req, res){
     const { email, password } = req.body;

  try {
    const id = await RegisterModel.register({ email, password });
    res.send({ id });
  } catch (error) {
    res.status(400).send(error.message); //No se debe enviar el error asi
  }
}


}