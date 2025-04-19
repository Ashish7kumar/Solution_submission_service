import express from "express";
import { createServer } from "http";    
import { Server } from "socket.io"; 
import notifyEvaluationService from "./job/evaluation.job";
import submissionQueue from "./Queue/Submission.queue";
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
io.on("connection",  (socket) => {
    console.log("a user connected", socket.id);
    socket.on("submitted", async ({code,problem_tittle,language}:{code:string,problem_tittle:string,language:string}) => {
        if (!code || !problem_tittle || !language) {
            return socket.emit("error", { message: "Invalid submission data" });
          }
        try{
        const jobID=await notifyEvaluationService(code,problem_tittle,language,socket.id);
        console.log("jobID",jobID +" submitted to queue" + socket.id);
        }catch(err){
            console.log(err);
            socket.emit("error", { message: "Error in job" });
            
        }
    });
});
server.listen(3000, () => {
    console.log("listening on 3000");
});