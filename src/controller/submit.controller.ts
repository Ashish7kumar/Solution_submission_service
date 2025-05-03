
import { Request ,Response} from "express";

import notifyEvaluationService from "../job/evaluation.job";
import { QueueEvents } from "bullmq";
import { PrismaClient } from '@prisma/client'

import NotImplementedError from "../errors/notImplemented.error";
import BadRequestError from "../errors/BadRequest.error";
const queueEvents=new QueueEvents("submissionQueue");
const prisma = new PrismaClient();
export async function submissionAdditionController(req:Request,res:Response)
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

};
export async function getAllSubmissionOfUser(req:Request,res:Response) {
  
    const userSubmissions=await prisma.submission.findMany({
    where:{
      userName:req.params.user
    }
   })
   res.status(200).json({
    submissions:userSubmissions
   })
}
export async function getAllSubmissionsOfProblem(req:Request,res:Response) {
  
    const problemSubmissions=await prisma.submission.findMany({
        where:{
            problemName:req.params.problem
        }
    })
    res.status(200).json({
        submissions:problemSubmissions
    })
}
export async function getSubmissionOfUserforProblem(req:Request,res:Response) {
  
    const userSubmissionsforProblem=await prisma.submission.findMany({
    where:{
        problemName:req.params.problem,
        userName:req.params.user
    }
  })
  res.status(200).json({
    submissions:userSubmissionsforProblem
})
}
export async function updateProblemName(req:Request,res:Response) {
   throw new NotImplementedError('will implement');
}
export async function updateUserName(req:Request,res:Response) {
    throw  new NotImplementedError('will implement ');
}
