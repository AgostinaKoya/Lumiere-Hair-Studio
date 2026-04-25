
import { EmployeeModel } from "../models/employees.js";


export class EmployeesController{
    static async getAll(req, res){
        const {name, email, phone, active, created_at} = req.query

        const filteredEmployees = await EmployeeModel.getAll({name, email, phone, active, created_at})

         return res.json(filteredEmployees);
    }
    static async create(req, res){
   
        const {name, email, phone } = req.body;

        const newEmployee = await EmployeeModel.create({name, email, phone})
    
        return res.status(201).json(newEmployee)
    }
}