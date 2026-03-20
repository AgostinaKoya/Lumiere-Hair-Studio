import { Router } from "express";
import { LogoutController } from "../controllers/logout.js";

export const logoutRouter = Router()

logoutRouter.post("/", LogoutController.logout);