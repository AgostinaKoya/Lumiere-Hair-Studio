import { ServiceModel } from "../models/service.js";
import { DEFAULTS } from '../config.js';
import { NotFountError,InternalServerError } from "../handleErrors/errors.js";

export class ServiceController {
  static async getAll(req, res) {

    try{
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
      
      if(filteredService.length ===0){
        throw new NotFountError("No se encontraron resultados")
      }
      return res.json(filteredService);

    }catch(e){
        if(e instanceof NotFountError){
           return res.status(e.statusCode).json({ 
                    type: e.name, 
                    message: e.message 
        });
        }
    }
  }

  static async getById(req, res) {

    try{
      const { id } = req.params;
        
      const service = await ServiceModel.getById({id})

        if (!service) {
          throw new NotFountError("No se encontraron resultados")
    }
    return res.json(service);

    }catch(e){

      if(e instanceof NotFountError){
           return res.status(e.statusCode).json({ 
                    type: e.name, 
                    message: e.message 
        });
        }
    }
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
       throw new NotFountError("No se encontraron resultados")
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

    try{
      const { id } = req.params;
  
      const service = await ServiceModel.getById({ id });
  
      if (!service) {
         throw new NotFountError("No se encontraron resultados")
      }
  
      const deleted = await ServiceModel.delete({ id });
  
      if (deleted) {
        return res.json({ message: "Service deleted successfully" });
      }
      throw new InternalServerError("Failed to delete service" )
    }catch(e){

      if(e instanceof InternalServerError || e instanceof NotFountError){
         return res.status(e.statusCode).json({ 
                    type: e.name, 
                    message: e.message 
        });
      }
    }
  }
}
