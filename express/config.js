
export const DEFAULTS = {
    LIMIT_PAGINATION: 7,
    LIMIT_OFFSET: 0,
    PORT: 1234,
    SALT_ROUNDS: 10
    
}

export const config = {
    host:'localhost',
    user:'root',
    port: 3306,
    password: '',
    database:'db_lummier'
}

export const SECRET_KEY = process.env.SECRET_KEY;

