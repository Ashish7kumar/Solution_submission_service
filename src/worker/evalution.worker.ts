import { Worker } from "bullmq";
import axios from "axios";
import { EVALUTION_SERVICE_URL } from "../config/server.config";
import connection from "../config/redis.config";
const submissionWorker = new Worker("submissionQueue", async (job) => {
    const { code, problem_title, language,socketId } = job.data;
    console.log("job data",job.data);
    try {
        const response = await axios.post(EVALUTION_SERVICE_URL, {
            code,
            problem_title,
            language,
        });
        console.log("response",response.data);
        return response.data;
    } catch (error) {
        console.error("Error in submission worker:", error);
        throw error;
    }
}
, { connection });
