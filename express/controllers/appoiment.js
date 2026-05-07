import { AppoimentModel } from "../models/appoiment.js";
import { ConflictError, NotFountError, UnauthorizedError, ValidationError } from "../handleErrors/errors.js";

export class AppoimentController {
  static async getAll(req, res) {
    try {
      const { date, startTime, serviceId, state, serviceName } = req.query;

      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (date && !dateRegex.test(date)) {
        throw new ValidationError("Formato de fecha inválido. Use YYYY-MM-DD");
      }

      const clienteId = req.session?.user?.user;

      if (!clienteId) {
        throw new UnauthorizedError("No esta autenticado");
      }

      const filteredAppointments = await AppoimentModel.getAll({
        date,
        startTime,
        serviceId,
        state,
        clienteId,
        serviceName,
      });

      if (filteredAppointments.length === 0) {
        throw new NotFountError("No se encontraron turnos");
      }

      return res.json(filteredAppointments);
    } catch (e) {
      if (e instanceof NotFountError || e instanceof UnauthorizedError || e instanceof ValidationError) {
        return res.status(e.statusCode).json({
          type: e.name,
          message: e.message,
        });
      }

      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async create(req, res) {
    try {
      const { date, startTime, userId, serviceId, employeeId } = req.body;
      const clienteId = req.session?.user?.user;

      if (!clienteId) {
        throw new UnauthorizedError("No esta autenticado");
      }
      const newAppointment = await AppoimentModel.create({
        date,
        startTime,
        serviceId,
        employeeId,
        userId: clienteId,
      });
      return res.status(201).json(newAppointment);
    } catch (e) {
      if( e instanceof ValidationError || e instanceof ConflictError || e instanceof UnauthorizedError){
        return res.status(e.statusCode).json({ 
          type: e.name, 
          message: e.message 
        });
      }
       return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async cancelById(req, res) {
    try {
      const clienteId = req.session?.user?.user;
  
      if (!clienteId) {
        throw new UnauthorizedError("No esta autenticado");
      }

      const { id } = req.params;
      const appointment = await AppoimentModel.cancelById({ id });

      return res.json({ message: "Turno cancelado", appointment });
    } catch (e) {


      if( e instanceof NotFountError || e instanceof ConflictError || e instanceof UnauthorizedError){
        return res.status(e.statusCode).json({ 
          type: e.name, 
          message: e.message 
        });
      }
       return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
  static async searchAvailables(req, res) {
    try {
      const {
        date,
        startTime = "09:00",
        endTime = "18:00",
        interval = "30",
      } = req.query;


      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (date && !dateRegex.test(date)) {
        throw new ValidationError("Formato de fecha inválido. Use YYYY-MM-DD");
      }


      const availableData = await AppoimentModel.searchAvailables({
        date,
        startTime,
        endTime,
        interval,
      });


      return res.json(availableData);
    } catch (e) {
      if(e instanceof ValidationError){
        return res.status(e.statusCode).json({ 
          type: e.name, 
          message: e.message 
        });
      }
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}
