import express from "express";
import notifyEvaluationService from "./job/evaluation.job";
import submissionQueue from "./Queue/Submission.queue";
const app = express();
app.use(express.json());
import { submissionRouter } from "./routes/submission.route";
import errorHandlerMiddleware from "./utils/errorHandler";


app.use('/',submissionRouter);
app.use(errorHandlerMiddleware)
app.listen(3000, () => {
    console.log("listening on 3000");
});