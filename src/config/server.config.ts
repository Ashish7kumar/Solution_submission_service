import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
export const REDIS_PORT = process.env.REDIS_PORT?parseInt(process.env.REDIS_PORT):6379;
export const REDIS_HOST = process.env.REDIS_HOST ;

export const EVALUTION_SERVICE_URL= String(process.env.EVALUTION_SERVICE_URL) ;