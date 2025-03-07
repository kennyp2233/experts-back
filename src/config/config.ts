import dotenv from "dotenv";

dotenv.config();
export const {
    DB_DIALECT,
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_PORT,
    DB_USER
} = process.env;

export const {
    PORT,
    HOST,
    PROTOCOL,
    SECRET_KEY,
    BY_SALT,
    SECRET_REFRESH_KEY
} = process.env;

