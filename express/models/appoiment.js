import mysql from 'mysql2/promise';
import crypto from 'node:crypto';
import { config } from "../config.js";
import appointments from "../appoiments.json" with { type: "json" };
import services from '../services.json' with { type: "json" };

const pool = mysql.createPool(config);

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
  static async getAll({ date, startTime, serviceId, state, clienteId, serviceName}) {
    const connection = await pool.getConnection();
    
    try {
      let query = `
        SELECT 
          a.id,
          a.date,
          a.start_time as startTime,
          BIN_TO_UUID(a.user_id) as userId,
          a.service_id as serviceId,
          a.status as state,
          s.name
        FROM appointments a
        JOIN services s ON a.service_id = s.id
        WHERE 1=1
      `;
      
      const params = [];

      
      if (clienteId) {
        query += ` AND a.user_id = UUID_TO_BIN(?)`;
        params.push(clienteId);
      }

    
      if (state) {
        query += ` AND a.status = ?`;
        params.push(state);
      }

      if (date) {
        query += ` AND a.date = ?`;
        params.push(date);
      }

      if (startTime) {
        query += ` AND a.start_time = ?`;
        params.push(startTime);
      }

      if (serviceId) {
        query += ` AND a.service_id = ?`;
        params.push(serviceId);
      }

      if (serviceName) {
        query += ` AND s.name LIKE ?`;
        params.push(`%${serviceName}%`);
        console.log("🔍 Filtro por serviceName aplicado:", serviceName, "-> LIKE:", `%${serviceName}%`);
      }

      query += ` ORDER BY a.date, a.start_time`;

      const [appointments] = await connection.query(query, params);


      const formatted = appointments.map(row =>({
        id: row.id,
        date: row.date,
        startTime: row.startTime,
        userId: row.userId,
        state: row.state,
        service: {
          serviceId: row.serviceId,
          name: row.name
        }
        
      }
    
    )
  );

      return formatted;
    } finally {
      connection.release();
    }
  }

  static async create({ date, startTime,  userId, serviceId, employeeId }) {
    if (!date || !startTime || !serviceId || !userId || !employeeId) {
      throw new Error("Debe enviar date, startTime, serviceId, userId y employeeId");
    }

    const connection = await pool.getConnection();

    try {
      const [existing] = await connection.query(
        'SELECT id FROM appointments WHERE date = ? AND start_time = ? AND status != "cancelled"',
        [date, startTime]
      );

      if (existing.length > 0) {
        throw new Error("Turno no disponible");
      }

      const [result] = await connection.execute(
        'INSERT INTO appointments (date, start_time, user_id, service_id, employee_id) VALUES (?, ?, UUID_TO_BIN(?), ?, UUID_TO_BIN(?))',
        [date, startTime, userId, serviceId, employeeId]
      );

      const [serviceRows] = await connection.query('SELECT name FROM services WHERE id = ?', [serviceId]);
      const serviceName = serviceRows.length > 0 ? serviceRows[0].name : "Servicio desconocido";

      const newAppointment = {
        id: result.insertId,
        date,
        startTime,
        userId,
        employeeId,
        service: {
          serviceId,
          name: serviceName,
        },
        state: "active",
      };

      return newAppointment;
    } finally {
      connection.release();
    }
  }

  static async cancelById({ id }) {
   const connection = await pool.getConnection();

    try{

      const [rows] = await connection.query(
        'SELECT id, status FROM appointments WHERE id = ?',
        [id]
      );

      if (rows.length === 0) {
        throw new Error("Turno no encontrado");
      }

      const appointment = rows[0];

      if (appointment.status === "cancelled") {
      throw new Error("El turno ya está cancelado");
    }

      await connection.query(
        'UPDATE appointments SET status = ? WHERE id = ?',
        ['cancelled', id]
      )
  
    return { ...appointment, status: 'cancelled' };

    }finally{
         connection.release();
    }

  }

static async searchAvailables({ date, startTime = "09:00", endTime = "18:00", interval = "30" }) {
  const connection = await pool.getConnection();

  if (!date) {
    throw new Error("Debe enviar la fecha (date) en formato YYYY-MM-DD");
  }

  const intervalMinutes = Number(interval);
  if (Number.isNaN(intervalMinutes) || intervalMinutes <= 0) {
    throw new Error("interval debe ser un número mayor que 0");
  }

  try {
    const [rows] = await connection.query(
      `SELECT start_time FROM appointments 
       WHERE date = ? AND status != 'cancelled'`,
      [date]
    );

    const allSlots = getTimeSlots(startTime, endTime, intervalMinutes);


    const occupied = rows.map((r) => r.start_time.slice(0, 5));

    const available = allSlots.filter((slot) => !occupied.includes(slot));

    return {
      date,
      available,
      occupied,
      totalSlots: allSlots.length,
    };

  } finally {
    connection.release();
  }
}
}
