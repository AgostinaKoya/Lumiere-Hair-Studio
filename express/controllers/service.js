import { ServiceModel } from "../models/service.js";
import { DEFAULTS } from '../config.js';

export class ServiceController {
  static async getAll(req, res) {
    const {
      name,
      price,
      category,
      limit,
      offset = DEFAULTS.LIMIT_OFFSET,
    } = req.query;

  const filteredService = await ServiceModel.getAll({name,
      price,
      category,
      limit,
      offset})

    return res.json(filteredService);
  }

  static async getById(req, res) {
      const { id } = req.params;
        
      const service = await ServiceModel.getById({id})

        if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    return res.json(service);
  }

  static async create(req,res){
    const {
    name,
    description,
    category,
    price,
    currency,
    durationMinutes,
    active,
  } = req.body;

  const newService = await ServiceModel.create({name,
    description,
    category,
    price,
    currency,
    durationMinutes,
    active,})

  return res.status(201).json(newService);
  }
}
