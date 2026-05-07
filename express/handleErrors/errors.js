const createErrors = (name, statusCode) => {


  return class extends Error {
    constructor(message) {
      super(message);
      this.name = name;
      this.statusCode = statusCode;
    }
  };
};


export const ConnectionError = createErrors('CONNECTION_ERROR', 504)
export const ValidationError = createErrors('VALIDATION_ERROR' , 400)
export const UnauthorizedError = createErrors('UNAUTHORIZED_ERROR' , 401)
export const NotFountError = createErrors('NOTFUND_ERROR' , 404)
export const ConflictError = createErrors('CONFLICT_ERROR' , 409)
export const RateLimitError = createErrors('TOO_MANY_REQUESTS' , 429)
export const InternalServerError = createErrors('INTERNAL_SERVER_ERROR', 500)
