import {Router} from 'express'
import {ServiceController} from '../controllers/service.js';

export const serviceRouter = Router()

serviceRouter.get("/", ServiceController.getAll);
serviceRouter.get("/:id", ServiceController.getById);
serviceRouter.post("/", ServiceController.create);
