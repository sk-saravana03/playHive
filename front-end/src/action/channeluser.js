import * as api from "../Api";

export const getallchannel=()=>async(dispatch)=>{
    try {
        const {data}=await api.getallchannel();
        dispatch({type:"FETCH_CHANELS",payload:data})
    } catch (error) {
        console.log(error.reponse?.data || error.message || error)
    }
}

export const updatechaneldata=(id,updatedata)=>async(dispatch)=>{
    try {
        const {data}=await api.updatechaneldata(id,updatedata);
        dispatch({type:"UPDATE_DATA",payload:data})
    } catch (error) {
        console.log(error)
    }
}