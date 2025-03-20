import videofile from "../Models/videofile.js";
export const uploadvideo=async(req,res, next)=>{
    if(req.file=== undefined){
        res.status(404).json({message:"please upload video file only"})
    }else{
        try {
            const file=new videofile({
                videotitle     : req.body.title,
                description    : req.body.description, 
                filename       : req.file.originalname,
                filepath       : req.file.path,
                filetype       : req.file.mimetype,
                filesize       : req.file.size,
                videochanel    : req.body.chanel,
                uploader       : req.body.uploader,
                channelProfile : req.body.channelProfile,
            })
        
            // console.log(file)
            await file.save()
            
            res.status(200).send("File uploaded successfully")
        } catch (error) {
            res.status(400).json(error.message)
            console.log("Error in uploading")
        
        
        }
    }
}

export const getallvideos=async(req,res)=>{
    try {
        const files=await videofile.find();
        res.status(200).send(files)
        
    } catch (error) {
        res.status(400).json(error.message)  
        console.log("error in getting")
    }
}