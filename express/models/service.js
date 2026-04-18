import mysql from 'mysql2/promise'
import { config, DEFAULTS } from '../config.js'

const connectionPromise = mysql.createConnection(config)

export class ServiceModel {
  static async getAll({ name, price, category_id, limit = DEFAULTS.LIMIT_PAGINATION, offset = DEFAULTS.LIMIT_OFFSET }) {
    const connection = await connectionPromise
    const filters = []
    const params = []

    if (name) {
      filters.push('LOWER(name) LIKE ?')
      params.push(`${name.toLowerCase()}%`)
    }

    if (category_id) {
      filters.push('category_id = ?')
      params.push(Number(category_id))
    } 

    if (price) {
      filters.push('price = ?')
      params.push(Number(price))
    }

    let sql = 'SELECT * FROM services'
    if (filters.length) {
      sql += ` WHERE ${filters.join(' AND ')}`
    }

    sql += ' ORDER BY id'
    sql += ' LIMIT ? OFFSET ?'
    params.push(Number(limit), Number(offset))

    const [rows] = await connection.query(sql, params)
    return rows
  }

  static async getById({ id }) {
    const connection = await connectionPromise
    const [rows] = await connection.query('SELECT * FROM services WHERE id = ?', [id])
    return rows[0] ?? null
  }

  static async create({ name, description, category, price, currency, durationMinutes, active, genders }) {
    const connection = await connectionPromise

    const [result] = await connection.execute(
      'INSERT INTO services (name, description, category_id, price, currency, duration_minutes, active, genders) VALUES (?, ?, ?, ?, ?, ?, ?,?)',
      [name, description, category, Number(price), currency, Number(durationMinutes), active ? 1 : 0, genders],
    )

    const insertId = result.insertId
    const [rows] = await connection.query('SELECT * FROM services WHERE id = ?', [insertId])
    return rows[0]
  }

  static async update({ id, name, description, category, price, currency, durationMinutes, active, genders }) {
    const connection = await connectionPromise
    
    const updates = []
    const params = []

    if (name !== undefined) {
      updates.push('name = ?')
      params.push(name)
    }
    if (description !== undefined) {
      updates.push('description = ?')
      params.push(description)
    }
    if (category !== undefined) {
      updates.push('category_id = ?')
      params.push(Number(category))
    }
    if (price !== undefined) {
      updates.push('price = ?')
      params.push(Number(price))
    }
    if (currency !== undefined) {
      updates.push('currency = ?')
      params.push(currency)
    }
    if (durationMinutes !== undefined) {
      updates.push('duration_minutes = ?')
      params.push(Number(durationMinutes))
    }
    if (active !== undefined) {
      updates.push('active = ?')
      params.push(active ? 1 : 0)
    }
    if (genders !== undefined) {
      updates.push('genders = ?')
      params.push(genders)
    }

    if (updates.length === 0) {
      return null
    }

    params.push(id)
    const sql = `UPDATE services SET ${updates.join(', ')} WHERE id = ?`
    
    await connection.execute(sql, params)
    
    const [rows] = await connection.query('SELECT * FROM services WHERE id = ?', [id])
    return rows[0] ?? null
  }

  static async delete({ id }) {
    const connection = await connectionPromise
    
    const [result] = await connection.execute('DELETE FROM services WHERE id = ?', [id])
    
    return result.affectedRows > 0
  }
}
