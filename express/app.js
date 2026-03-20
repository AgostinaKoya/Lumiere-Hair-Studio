import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import {corsMiddleware} from './middlewares/cors.js'
import { DEFAULTS } from "./config.js";
import { jwtMiddleware } from "./middlewares/jwt.js";
import {serviceRouter} from './routes/service.js'
import { appoimentRouter } from "./routes/appoiment.js";
import { loginRouter } from "./routes/login.js";
import { registerRouter } from "./routes/register.js";
import { logoutRouter } from "./routes/logout.js";


const PORT = process.env.PORT ?? DEFAULTS.PORT;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(jwtMiddleware());
app.use(corsMiddleware())

app.use('/login', loginRouter)
app.use('/services' , serviceRouter)
app.use('/appointments' , appoimentRouter )
app.use('/register' , registerRouter )
app.use('/logout' , logoutRouter)


app.get("/health", (req, res) => {
  return res.json({
    status: "ok",
    
  });
});


app.listen(PORT, () => {
  console.log("Servidor levantado");
});
