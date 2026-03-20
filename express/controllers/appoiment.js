import { AppoimentModel } from "../models/appoiment.js";

export class AppoimentController {
  static async getAll(req, res) {
    const { date, startTime, serviceId, state } = req.query;
    const clienteId = req.session?.user?.user;
    if (!clienteId) {
      return res.status(401).json({ error: "No autenticado" });
    }

    const filteredAppointments = await AppoimentModel.getAll({
      date,
      startTime,
      serviceId,
      state,
      clienteId
    });

    if (filteredAppointments.length === 0) {
      return res.status(404).json({ error: "No se encontraron turnos" });
    }

    return res.json(filteredAppointments);
  }

  static async create(req, res) {
    try {
      const { date, startTime, serviceId, nameService } = req.body;
      const clienteId = req.session?.user?.user;
      const newAppointment = await AppoimentModel.create({
        date,
        startTime,
        serviceId,
        nameService,
        userId: clienteId,
      });
      return res.status(201).json(newAppointment);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async cancelById(req, res) {
    try {
      const { id } = req.params;
      const appointment = await AppoimentModel.cancelById({ id });
      return res.json({ message: "Turno cancelado", appointment });
    } catch (error) {
      return res.status(400).json({ error: error.message });
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

      const availableData = await AppoimentModel.searchAvailables({
        date,
        startTime,
        endTime,
        interval,
      });
      return res.json(availableData);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
