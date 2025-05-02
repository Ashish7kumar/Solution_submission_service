import { Router } from "express";
export const submissionRouter=Router();
import * as submissionController from "../controller/submit.controller";

submissionRouter.post('/submit/:user/:problem',submissionController.submissionAdditionController);
submissionRouter.get('/submissions/:user',submissionController.getAllSubmissionOfUser);
submissionRouter.get('/submissions/:problem',submissionController.getAllSubmissionsOfProblem);
submissionRouter.get('/submit/:user/:problem',submissionController.getSubmissionOfUserforProblem);
submissionRouter.patch('/submit/:problem',submissionController.updateProblemName);
submissionRouter.patch('/submit/:user',submissionController.updateUserName);

