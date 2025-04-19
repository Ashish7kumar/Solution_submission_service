import express from "express";
import { createServer } from "http";    
import { Server } from "socket.io"; 
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    socket.on("submitted", ({code,problem_tittle,language}:{code:string,problem_tittle:string,language:string}) => {
        console.log("message: " + code);
    console.log("problem_tittle:" + problem_tittle);
    console.log(language);
    });
});
server.listen(3000, () => {
    console.log("listening on 3000");
});