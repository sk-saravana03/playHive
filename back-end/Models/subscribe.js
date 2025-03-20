import mongoose from "mongoose"
const subscribeschema = mongoose.Schema({
    channelid: { type: String, require: true },
    viewer: { type: String, require: true },
})
export default mongoose.model("Subscribe", subscribeschema)