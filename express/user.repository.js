import mysql from 'mysql2/promise'
import crypto from 'node:crypto'
import bcrypt from 'bcrypt'
import { DEFAULTS, config } from "./config.js";
import { UnauthorizedError } from "./handleErrors/errors.js";


const pool = mysql.createPool(config)

export class UserRepository {
    static async create({email, password}) {
        Validation.email(email)
        Validation.password(password)

        const connection = await pool.getConnection()
        try {
            const [existingUser] = await connection.query(
                'SELECT id FROM users WHERE email = ?',
                [email]
            )
            
            if (existingUser.length > 0) {
                throw new Error('email already exist')
            }

            const id = crypto.randomUUID()
            const hashedPassword = await bcrypt.hash(password, DEFAULTS.SALT_ROUNDS)

         
            await connection.query(
                'INSERT INTO users (id, email, password) VALUES (UUID_TO_BIN(?), ?, ?)',
                [id, email, hashedPassword]
            )

            return id
        } finally {
            connection.release()
        }
    }

    static async login({email, password}) {
        Validation.email(email)
        Validation.password(password)

        const connection = await pool.getConnection()
        try {
            const [users] = await connection.query(
                'SELECT BIN_TO_UUID(id) as id, email, password FROM users WHERE email = ?',
                [email]
            )

            if (users.length === 0) {
                throw new Error('email does not exist')
            }

            const user = users[0]
            const isValid = await bcrypt.compare(password, user.password)
            
            if (!isValid) {
                throw new UnauthorizedError('password is invalid')
            }

            const {password: _, ...publicUser} = user
            return publicUser
        } finally {
            connection.release()
        }
    }
}

class Validation {
    static email(email){
         if(typeof email !== 'string') throw new Error(' email must be string')
    }

    static password(password){
        if(typeof password !== 'string') throw new Error(' password must be string')
        if(password.length <6) throw new Error(' password must be at least 6 characters long')
   
    }
}