
import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:1234',
  'https://lummier-hair-studio-front.vercel.app',
  'https://lummier-hair-studio-ize3yjtlc-koyaagostina-gmailcoms-projects.vercel.app',
  'https://lummier-hair-studio.vercel.app'
  
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

