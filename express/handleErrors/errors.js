const createErrors = function (name , statusCode ) {
   return class ConnectionError extends Error{

    constructor(message){
        super(message)
        this.name = name
        this.statusCode = statusCode;
    }
}
}



export const ConnectionError = createErrors('ConnectionError', 504)
export const ValidationError = createErrors('Validation' , 400)
export const UnauthorizedError = createErrors('UnauthorizedError' , 401)