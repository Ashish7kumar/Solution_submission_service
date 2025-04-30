import submissionQueue from "../Queue/Submission.queue";
async  function notifyEvaluationService(
    code: string,
    problem_title: string,
    language: string,
    user_name:string,

)
    {
    const job = await submissionQueue.add("evaluation", { code, problem_title,language,user_name}, { attempts:  2,backoff: {
        type: 'exponential',
        delay: 3000
      }});
    return job;
    }
    export default notifyEvaluationService;