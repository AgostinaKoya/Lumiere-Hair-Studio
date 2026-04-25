import mysql from "mysql2/promise";
import { config, DEFAULTS } from "../config.js";
import crypto from 'node:crypto'
import bcrypt from 'bcrypt'


const connectionPromise = mysql.createConnection(config);

export class EmployeeModel {
  static async getAll({name, email, phone, active, created_at}) {

    const connection = await connectionPromise

    let query = `SELECT BIN_TO_UUID(id) as id, name, email, phone, image_url, active, created_at FROM employees`

    const conditions = []
    const params = []

    if(name){
      conditions.push(`LOWER(name) LIKE ?`)
      params.push(`${name.toLowerCase()}%`)
    }

    if(email){
      conditions.push(`LOWER(email) LIKE ?`)
      params.push(`${email.toLowerCase()}%`)
    }

    if(phone){
      conditions.push(`phone LIKE ?`)
      params.push(`%${phone}%`)
    }

    if(active !== undefined){
      conditions.push(`active = ?`)
      params.push(active)
    }

    if(conditions.length > 0){
      query += ` WHERE ${conditions.join(' AND ')}`
    }

    query += ' ORDER BY created_at DESC'

    const [rows] = await connection.query(query, params)
    return rows
  }

  
  static async create({ name, email, phone }) {
    const connection = await connectionPromise;

    const id = crypto.randomUUID()
  

    const [result] = await connection.execute(
      "INSERT INTO employees (id, name, email, phone) VALUES (UUID_TO_BIN(?),?, ?, ?)",
      [id, name, email, phone],
    );


    const [rows] = await connection.query('SELECT BIN_TO_UUID(id) as id, name, email, phone, image_url, active, created_at FROM employees WHERE id = UUID_TO_BIN(?)', [id])
    return rows[0]
  }
}
