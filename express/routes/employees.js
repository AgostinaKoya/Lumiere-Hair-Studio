import { Router } from "express";
import { EmployeesController } from "../controllers/employees.js";

export const employeesRouter = Router();

employeesRouter.get("/", EmployeesController.getAll);
employeesRouter.post("/", EmployeesController.create);
