import * as api from "../Api";
export const addtolikedvideo=(likedvideodata)=>async(dispatch)=>{
    try {
        const response = await api.addtolikevideo(likedvideodata)
        
        if (response.message === "Already liked") {
            console.log("user already liked this video")
            return;
        }
        dispatch({ type: "POST_LIKEDVIDEO", data: response });
        dispatch(getalllikedvideo());
    } catch (error) {
        console.log(error)
    }
}

export const  getalllikedvideo=()=>async(dispatch)=>{
    try {
        const {data}=await api.getalllikedvideo()
        dispatch({type:"FETCH_ALL_LIKED_VIDEOS",payload:data})
    } catch (error) {
        console.log(error)
    }
}

export const deletelikedvideo=(likedvidedata)=>async(dispatch)=>{
    try {
        const {videoid,viewer}=likedvidedata
        await api.deletelikedvideo(videoid,viewer)
        dispatch(getalllikedvideo())
    } catch (error) {
        console.log(error)
    }
}