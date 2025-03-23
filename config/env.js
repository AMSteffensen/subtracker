import { config } from 'dotenv';

const envFile = `.env.${process.env.NODE_ENV || 'development'}.local`;
config({ path: envFile });

export const {
    PORT,
    SERVER_URL,
    EMAIL_PASSWORD,
    NODE_ENV,
    DB_URI,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ARC_JET_ENV,
    ARC_JET_API_KEY,
    QSTASH_TOKEN,
    QSTASH_URL,
} = process.env;