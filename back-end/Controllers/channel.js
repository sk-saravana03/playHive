import mongoose from "mongoose";
import users from "../Models/Auth.js";

export const updatechaneldata = async (req, res) => {
    const { id: _id } = req.params;
    const { name, desc } = req.body;
    const channelProfile = req.file;

    // console.log("File Name: ", channelProfile ? channelProfile.filename : "No file uploaded");
    // console.log("Name: ", name);
    // console.log("Description: ", desc);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send("Channel unavailable...");
    }

    try {
        const updatedata = await users.findByIdAndUpdate(
            _id,
            {
                $set: {
                    name: name,
                    desc: desc,
                    channelProfile: channelProfile ? `uploads/${channelProfile.filename}` : undefined,
                },
            },
            { new: true }
        );

        // console.log("Updated Data: ", updatedata);  // Log the updated data
        res.status(200).json(updatedata);
    } catch (error) {
        console.error("Database update Error:", error.message);
        res.status(500).json({ message: error.message });
    }
};


export const getallchannel = async (req, res) => {
    try {
        const allChannels = await users.find();
        const allchanneldata = [];

        allChannels.forEach((channel) =>
        {
            // console.log("channel data :", channel);
            const channelProfile = channel?.channelProfile || "No profile available"
            // console.log("Image path : ", channelProfile )
            allchanneldata.push({
                _id: channel._id,
                name: channel.name,
                email: channel.email,
                desc: channel.desc,
                channelProfile: channelProfile,
            });
        });
        res.status(200).json(allchanneldata);
    } catch (error) {
        console.error("Error in getallchannel : ", error)
        res.status(500).json({ message: error.message });
        
    }
};
