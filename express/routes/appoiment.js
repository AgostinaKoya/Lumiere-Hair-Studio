import { Router } from "express";
import { requireAuth } from "../middlewares/requiredAuth.js";
import { AppoimentController } from "../controllers/appoiment.js";

export const appoimentRouter = Router()

appoimentRouter.get("/",requireAuth, AppoimentController.getAll);
appoimentRouter.post("/", requireAuth, AppoimentController.create);
appoimentRouter.patch("/:id/cancel", requireAuth, AppoimentController.cancelById);
appoimentRouter.get("/available", AppoimentController.searchAvailables);