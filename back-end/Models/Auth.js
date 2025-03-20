import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String },
    desc: { type: String },
    channelProfile: { type: String, required: false }, // Store the file path of the profile picture
    joinedOn: { type: Date, default: Date.now },
    viewedVideos: { type: [mongoose.Schema.Types.ObjectId], ref: 'videofile', default: [] }
});

export default mongoose.model("User", userSchema);
