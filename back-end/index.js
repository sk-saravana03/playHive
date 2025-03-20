import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import {Server} from "socket.io";
import videoroutes from "./Routes/video.js";
import userroutes from "./Routes/user.js";
import commentroutes from "./Routes/comment.js";
import path from "path";
import { createServer } from "http";

dotenv.config();
const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));


app.use("/uploads", express.static(path.join("uploads")));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("PlayHive is working");
});

app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    next();
});

app.use(bodyParser.json());
app.use("/user", userroutes);
app.use("/video", videoroutes);
app.use("/comment", commentroutes);

const PORT = process.env.S_PORT || 5500;

const JWT_SECRET = process.env.JWT_SECRET;

// Ensure environment variables are loaded correctly
if (!JWT_SECRET) {
    console.error("Error: JWT_SECRET is not defined in .env");
    // process.exit(1); // Uncomment if you want to exit if critical variables are missing
}

server.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});

// MongoDB connection
const DB_URL = process.env.CONNECTION_URL;
mongoose
    .connect(DB_URL)
    .then(() => {
        console.log("Mongodb Database connected");
    })
    .catch((error) => {
        console.log(error);
    });


// videocall
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: [ "GET", "POST" ]
	}
})

io.on("connection", (socket) =>
{

	socket.emit("me", socket.id)

	socket.on("disconnect", () =>
	{
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
})