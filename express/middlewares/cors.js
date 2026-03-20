
import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:1234',
  'http://localhost:5174',
  
]


export const corsMiddleware = ({acceptedOrigins = ACCEPTED_ORIGINS} = {}) =>{
    return cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if(acceptedOrigins.includes(origin)){
        return callback(null, true)
      }
      return callback(new Error("Origin no permitido"))
    },
    credentials: true
  })

}


