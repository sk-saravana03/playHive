import * as api from "../Api";
export const addtosubscribe=(subscribedata)=>async(dispatch)=>{
    try {
        const response = await api.addtosubscribe(subscribedata)

        if (response.messge === "Already subscribed") {
            console.log("User already subscribed to this channel.")
            return;
        }
        
        dispatch({type:"POST_SUBSCRIBE",data: response})
        dispatch(getallsubscribe())
    } catch (error) {
        console.log(error)
    }
}

export const  getallsubscribe=()=>async(dispatch)=>{
    try {
        const {data}=await api.getallsubscribe()
        dispatch({type:"FETCH_ALL_SUBSCRIBE",payload:data})
    } catch (error) {
        console.log(error)
    }
}

export const deletesubscribe=(subscribedata)=>async(dispatch)=>{
    try {
        const {channelid,viewer}= subscribedata
        await api.deletesubscribe(channelid,viewer)
        dispatch(getallsubscribe())
    } catch (error) {
        console.log(error)
    }
}