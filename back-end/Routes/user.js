import express from "express";
import { login } from "../Controllers/Auth.js";
import { updatechaneldata, getallchannel } from "../Controllers/channel.js";
import uploadMiddleware from "../middleware/uploadMiddleware.js";
import auth from "../middleware/auth.js";
import { subscribecontroller, getallsubscribecontroller, deletesubscribe } from "../Controllers/subscribe.js";

const routes = express.Router();

// POST login route
routes.post("/login", login);

// GET all channels route
routes.get("/getallchannel", getallchannel);

// PATCH route for updating channel
routes.patch("/update/:id", uploadMiddleware, updatechaneldata); // Use PATCH instead of POST for updates

routes.post('/subscribe',auth,subscribecontroller)
routes.get('/getallsubscribe',getallsubscribecontroller)
routes.delete('/deletesubscribe/:channelid/:viewer',auth,deletesubscribe)

export default routes;
