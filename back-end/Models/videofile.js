import mongoose from "mongoose"
const videoFileschema=new mongoose.Schema(
    {
        videotitle: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            allowNull: true
        },
        filename:{
            type:String,
            required:true,
        },
        filetype:{
            type:String,
            required:true,
        },
        
        filepath:{
            type:String,
            required:true,
        },
        filesize:{
            type:String,
            required:true,
        },
        videochanel:{
            type:String,
            required:true,
        },
        Like:{
            type:Number,
            default:0,
        },
        views:{
            type:Number,
            default:0,
        },
        uploader:{
            type:String
        },
        channelProfile: {
            type:String
        }
    },
    {
        timestamps:true,
    }
)
export default mongoose.model("Videofile",videoFileschema)