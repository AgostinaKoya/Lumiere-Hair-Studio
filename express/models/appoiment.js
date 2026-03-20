import appointments from "../appoiments.json" with { type: "json" };
import services from '../services.json' with { type: "json" };

const getMinutes = (timeString) => {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
};

const getTimeSlots = (startTime, endTime, intervalMinutes) => {
  const slots = [];
  let minutes = getMinutes(startTime);
  const endMinutes = getMinutes(endTime);

  while (minutes <= endMinutes) {
    const hours = String(Math.floor(minutes / 60)).padStart(2, "0");
    const mins = String(minutes % 60).padStart(2, "0");
    slots.push(`${hours}:${mins}`);
    minutes += intervalMinutes;
  }

  return slots;
};

export class AppoimentModel {
  static async getAll({ date, startTime, serviceId, state, clienteId }) {
    let filteredAppointments = appointments.appointments;

    if (clienteId) {
      filteredAppointments = filteredAppointments.filter(
        (appointment) => appointment.userId === clienteId
      );
    }

    if (state) {
      filteredAppointments = filteredAppointments.filter(
        (appointment) => appointment.state === state
      );
    }
    if (date) {
      filteredAppointments = filteredAppointments.filter(
        (appointment) => appointment.date === date
      );
    }
    if (startTime) {
      filteredAppointments = filteredAppointments.filter(
        (appointment) => appointment.startTime === startTime
      );
    }
    if (serviceId) {
      filteredAppointments = filteredAppointments.filter(
        (appointment) => String(appointment.service?.serviceId) === String(serviceId)
      );
    }

    return filteredAppointments;
  }

  static async create({ date, startTime, serviceId, nameService, userId }) {

    if (!date || !startTime || !serviceId || !userId) {
      throw new Error("Debe enviar date, startTime, serviceId y userId");
    }

    const alreadyBooked = appointments.appointments.some(
      (appointment) =>
        appointment.date === date &&
        appointment.startTime === startTime &&
        appointment.state !== "cancelled"
    );

    if (alreadyBooked) {
      throw new Error("Turno no disponible");
    }

    const serviceRecord = services.find((s) => String(s.id) === String(serviceId));
  const resolvedName = nameService || (serviceRecord ? serviceRecord.name : "Servicio desconocido");

    const newAppointment = {
      id: crypto.randomUUID(),
      date,
      startTime,
      userId,
      service: {
        serviceId,
        name: resolvedName || "Servicio desconocido",
      },
      state: "active",
    };

    appointments.appointments.push(newAppointment);
    return newAppointment;
  }

  static async cancelById({ id }) {
    const appointment = appointments.appointments.find(
      (appt) => String(appt.id) === String(id)
    );

    if (!appointment) {
      throw new Error("Turno no encontrado");
    }

    if (appointment.state === "cancelled") {
      throw new Error("El turno ya está cancelado");
    }

    appointment.state = "cancelled";
    return appointment;
  }

  static async searchAvailables({ date, startTime = "09:00", endTime = "18:00", interval = "30" }) {
    if (!date) {
      throw new Error("Debe enviar la fecha (date) en formato YYYY-MM-DD");
    }

    const intervalMinutes = Number(interval);
    if (Number.isNaN(intervalMinutes) || intervalMinutes <= 0) {
      throw new Error("interval debe ser un número mayor que 0");
    }

    const allSlots = getTimeSlots(startTime, endTime, intervalMinutes);
    const occupied = appointments.appointments
      .filter(
        (appointment) => appointment.date === date && appointment.state !== "cancelled"
      )
      .map((appointment) => appointment.startTime);

    const available = allSlots.filter((slot) => !occupied.includes(slot));
    return {
      date,
      available,
      occupied,
      totalSlots: allSlots.length,
    };
  }
}
