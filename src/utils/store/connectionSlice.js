import { createSlice } from '@reduxjs/toolkit'

const connectionSlice = createSlice({
    name:"connections",
    initialState:null,
    reducers:{
        addConnections:(_,action)=>{
            return action.payload
        },
        removeConnections:()=> null,

    }
})
export const {addConnections, removeConnections}=connectionSlice.actions
export default connectionSlice.reducer
