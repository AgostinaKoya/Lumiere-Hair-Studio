import { ServiceModel } from "../models/service.js";
import { DEFAULTS } from '../config.js';

export class ServiceController {
  static async getAll(req, res) {
    const {
      name,
      price,
      category_id,
      limit,
      offset = DEFAULTS.LIMIT_OFFSET,
    } = req.query;

    const filteredService = await ServiceModel.getAll({
      name,
      price,
      category_id,
      limit,
      offset,
    })

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
    category_id,
    price,
    currency,
    duration_minutes,
    active,
    genders
  } = req.body;

  const newService = await ServiceModel.create({
    name,
    description,
    category: category_id,
    price,
    currency,
    durationMinutes: duration_minutes,
    active,
    genders
  })

  return res.status(201).json(newService);
  }

  static async update(req, res) {
    const { id } = req.params;
    const {
      name,
      description,
      category_id,
      price,
      currency,
      duration_minutes,
      active,
      genders
    } = req.body;

    const service = await ServiceModel.getById({ id });

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    const updatedService = await ServiceModel.update({
      id,
      name,
      description,
      category: category_id,
      price,
      currency,
      durationMinutes: duration_minutes,
      active,
      genders
    });

    return res.json(updatedService);
  }

  static async delete(req, res) {
    const { id } = req.params;

    const service = await ServiceModel.getById({ id });

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    const deleted = await ServiceModel.delete({ id });

    if (deleted) {
      return res.json({ message: "Service deleted successfully" });
    }

    return res.status(500).json({ error: "Failed to delete service" });
  }
}
