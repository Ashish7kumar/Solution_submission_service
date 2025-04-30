import { Worker } from "bullmq";
import axios from "axios";
import { EVALUTION_SERVICE_URL } from "../config/server.config";
import connection from "../config/redis.config";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
const submissionWorker = new Worker("submissionQueue", async (job) => {
    
    const { code, problem_title, language,user_name } = job.data;

    try {
        
        const response = await axios.post(String(process.env.EVALUTION_SERVICE_URL), {
            code,
            problem_title,
            language,
        });
       await prisma.submission.create({
            data:{
                userName:user_name,
                problemName:problem_title,
                code:code,
                language:language
            }
        })
        console.log("response",response.data);
        
        return response.data;
    } catch (error) {
        console.log(process.env.EVALUTION_SERVICE_URL);
        console.error("Error in submission worker:"+error);
        throw error;
    }
}
, { connection });
