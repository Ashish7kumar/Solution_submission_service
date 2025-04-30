import { Router } from "express";
import { Request ,Response} from "express";
const submissionRouter=Router();
import notifyEvaluationService from "../job/evaluation.job";
import { QueueEvents } from "bullmq";
const queueEvents=new QueueEvents("submissionQueue");
submissionRouter.post('/submit/:user/:problem',async (req:Request,res:Response)=>
{   try{
    
    const language=req.body.language;
     const code=req.body.code;
    const problem_name=req.params.problem;
    const user_name=req.params.user;
   console.log(language);
   console.log(code);
   console.log(problem_name);
   console.log(user_name);
   if(!language || !code || ! problem_name || !user_name)
   {
    throw Error('Request is a bad Request');
   }
       const job=await notifyEvaluationService(code,problem_name,language,user_name);
        const result=await job.waitUntilFinished(queueEvents);
        res.json({ message: 'Job completed!', result: result });


        }catch(err)
        {
            if(err instanceof Error){
            console.log(err.stack);}
            throw err;
            
        }


});
export default submissionRouter;