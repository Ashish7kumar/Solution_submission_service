import IORedis from "ioredis"
import {REDIS_HOST, REDIS_PORT} from "./server.config"
const connection = new IORedis({
    host:REDIS_HOST,
    port: REDIS_PORT, 
});
export default connection;