import subscribe from "../Models/subscribe.js";

export const subscribecontroller = async (req, res) => {
    const { channelid, viewer } = req.body;
    //const addtosubscribe = new subscribe(subscribedata)
    try {

        const alreadySubscribed = await subscribe.findOne({ channelid, viewer });

        if (alreadySubscribed) {
            return res.status(400).json({message:"you Already subscribed to this channel"})
        }

        const addtosubscribe = new subscribe({ channelid, viewer });
        await addtosubscribe.save()
        res.status(200).json("subscribed successfully")
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}
export const getallsubscribecontroller = async (req, res) => {
    try {
        const files = await subscribe.find()
        res.status(200).send(files)
        
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}
export const deletesubscribe = async (req, res) => {
    const { channelid: channelid, viewer: viewer } = req.params
    try {
        await subscribe.findOneAndDelete({
            channelid:channelid,viewer:viewer,
        })
        res.status(200).json({message:"removed from subscription list"})
    } catch (error) {
        res.status(400).json(error.message)
        
        return 
    }

}