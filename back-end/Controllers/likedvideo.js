import likedvideo from "../Models/likevideo.js"

export const likedvideocontroller = async (req, res) => {
    const { videoid, viewer } = req.body;
    //const likedvideosave = new likedvideo(likedvidedata)
    try {
        const alreadyLiked = await likedvideo.findOne({videoid, viewer})

        if (alreadyLiked) {
            return res.status(400).json({ message: "You have already liked this video" });
        }

        const likedvideosave = new likedvideo({ videoid, viewer });
        await likedvideosave.save()
        res.status(200).json("added to likedvideo")
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}
export const getalllikedvideo= async (req, res) => {
    try {
        const files = await likedvideo.find()
        res.status(200).send(files)
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}
export const deletelikedvideo = async (req, res) => {
    const { videoid: videoid, viewer: viewer } = req.params;
    try {
        await likedvideo.findOneAndDelete({
            videoid:videoid,viewer:viewer,
        })
        res.status(200).json({message:"removed from liked video"})
    } catch (error) {
        res.status(400).json(error.message)
        return
    }

}