import DBLocal from 'db-local'
import crypto from 'node:crypto'
const {Schema} = new DBLocal({path: '.db'})
import bcrypt from 'bcrypt'
import { DEFAULTS } from "./config.js";

const User = Schema('User', {
    _id:{ type: String, required: true},
    email:{ type: String, required: true},
    password:{ type: String, required: true}
})



export class UserRepository {
    static async create({email, password}) {
        Validation.email(email)
        Validation.password(password)



        //Aserguramos que el user no existe
        const useremail = User.findOne({ email})
        if (useremail) throw new Error('email already exist')

        const id = crypto.randomUUID()
        const hashedPassword = await bcrypt.hash(password, DEFAULTS.SALT_ROUNDS)

        User.create({
            _id: id,
            email,
            password:hashedPassword
        }).save()

        return id


    }
    static async login({email, password}) {
        Validation.email(email)
        Validation.password(password)

        const user = User.findOne({email})
        if (!user) throw new Error('email does not exist')

        const isValid = await bcrypt.compare(password, user.password)
        if(!isValid) throw new Error('password is invalid')


            const {password: _, ...publicUser} = user

            return publicUser
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