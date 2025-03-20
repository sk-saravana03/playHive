import express from "express";


const router = express.Router();


export default (server) =>
    {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("User connected", socket.id);
        socket.emit("me", socket.id);


        socket.on("disconnect", () => {
            socket.broadcast.emit("callEnded");
        });

        socket.on("callUser", (data) => {
            io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
        });

        socket.on("answerCall", (data) => {
            io.to(data.to).emit("callAccepted", data.signal)
        });

        
    });
};

