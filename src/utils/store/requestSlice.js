import { createSlice } from "@reduxjs/toolkit";

const requestSlice=createSlice({
    name:"request",
    initialState:[],
    reducers:{
        addRequests:(_,action)=>{
            return action.payload;
        },
        removeRequest:(state, action)=>{
            return state.filter((req)=> req._id !== action.payload)
        }
    }
})
export const {addRequests , removeRequest}=requestSlice.actions;
export default requestSlice.reducer;