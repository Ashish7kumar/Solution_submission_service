import express from "express";
import notifyEvaluationService from "./job/evaluation.job";
import submissionQueue from "./Queue/Submission.queue";
const app = express();
app.use(express.json());
import { submissionRouter } from "./routes/submission.route";


app.use('/',submissionRouter);
app.listen(3000, () => {
    console.log("listening on 3000");
});