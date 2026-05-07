import { NotFountError,ValidationError, ConnectionError } from "../handleErrors/errors.js";
import { EmployeeModel } from "../models/employees.js";
import { validateEmployee } from "../validations/validations.js";

export class EmployeesController {
  static async getAll(req, res) {
    try {
      const { name, email, phone, active, created_at } = req.query;
      const filteredEmployees = await EmployeeModel.getAll({
        name,
        email,
        phone,
        active,
        created_at,
      });

      if(!filteredEmployees || filteredEmployees.length ===0){
         throw new NotFountError("No se encontraron empleados con esos criterios");
      }

      return res.json(filteredEmployees);


    } catch (e) {
       if (e instanceof NotFountError) {
        return res.status(e.statusCode).json({ 
          type: e.name, 
          message: e.message 
        });
      }

       return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
  static async create(req, res) {

    try{
    const { name, email, phone } = req.body;
    
    validateEmployee({ name, email, phone })
    
    const newEmployee = await EmployeeModel.create({ name, email, phone });

    return res.status(201).json(newEmployee);


    }catch (e){
        if (e instanceof ValidationError) {
        return res.status(e.statusCode).json({ 
          type: e.name, 
          message: e.message 
        });
      }

       return res.status(500).json({ error: "No se pudo crear el empleado" });
    }
    
  }
}
