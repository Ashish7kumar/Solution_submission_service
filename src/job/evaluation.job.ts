import submissionQueue from "../Queue/Submission.queue";
async  function notifyEvaluationService(
    code: string,
    problem_title: string,
    language: string,
socketId: string)
    {
    const job = await submissionQueue.add("evaluation", { code, problem_title,language,socketId }, { attempts:  2,backoff: {
        type: 'exponential',
        delay: 3000
      }});
    return job.id;
    }
    export default notifyEvaluationService;