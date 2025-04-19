import { Queue } from "bullmq";
import connection from "../config/redis.config";
const submissionQueue = new Queue("submissionQueue", {connection});
export default submissionQueue; 