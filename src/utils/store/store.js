import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import feedReducer from "./feedSlice";
import connectionsReducer from "./connectionsSlice"
import requestReducer from "./requestSlice"
import connectionReducer from "./connectionSlice"


const store=configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,    
        connections:connectionsReducer, 
        requests:requestReducer, 
        connection:connectionReducer,
    },
})

export default store