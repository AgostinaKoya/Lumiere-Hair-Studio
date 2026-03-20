import services from '../services.json' with { type: "json" };

export class ServiceModel {
  static async getAll({
    name,
    price,
    category,
    limit,
    offset = DEFAULTS.LIMIT_OFFSET,
  }) {
    let filteredService = services;

    if (category) {
      const searchTerms = category.toLowerCase();
      filteredService = filteredService.filter((service) =>
        service.category.toLowerCase().includes(searchTerms),
      );
    }

    if (limit) {
      const limitNumber = Number(limit);
      const offserNumber = Number(offset);

      filteredService = filteredService.slice(
        offserNumber,
        offserNumber + limitNumber,
      );
    }

    return filteredService;
  }

   static async getById( { id }){
  
    const service = services.find((service) => String(service.id) === id);


    return service

   }

    static async create({
    name,
    description,
    category,
    price,
    currency,
    durationMinutes,
    active,
  }){
    const newService = {
    id: crypto.randomUUID(),
    name,
    description,
    category,
    price,
    currency,
    durationMinutes,
    active,
  };

  services.push(newService);

  return newService
  }
}
