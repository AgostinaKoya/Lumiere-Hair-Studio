import { ValidationError } from "../handleErrors/errors.js"


export const validateEmployee=({name, phone, email} = {})=>{
    if(!name || name===null || name===undefined) throw new ValidationError('name is required')
    if(!email || email===null || email===undefined) throw new ValidationError('email is required')
    if(!phone || phone===null || phone===undefined) throw new ValidationError('phone is required')
}

export const validateRegister = ({ email, password } = {}) => {
    if (!email || email === null || email === undefined) {
        throw new ValidationError('email is required')
    }
    if (typeof email !== 'string') {
        throw new ValidationError('email must be a string')
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new ValidationError('email must be a valid email')
    }

    if (!password || password === null || password === undefined) {
        throw new ValidationError('password is required')
    }
    if (typeof password !== 'string') {
        throw new ValidationError('password must be a string')
    }
    if (password.length < 8) {
        throw new ValidationError('password must be at least 8 characters')
    }
    if (/^\d+$/.test(password)) {
        throw new ValidationError('password cannot be only numbers')
    }
    if (!/[A-Z]/.test(password)) {
        throw new ValidationError('password must contain at least one uppercase letter')
    }
    if (!/[0-9]/.test(password)) {
        throw new ValidationError('password must contain at least one number')
    }
}

export const validateLogin = ({ email, password } = {}) => {
  if (!email ) throw new ValidationError('email is required')
  if (typeof email !== 'string') throw new ValidationError('email must be a string')

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) throw new ValidationError('email must be a valid email')

  if (!password) throw new ValidationError('password is required')
  if (typeof password !== 'string') throw new ValidationError('password must be a string')

}

