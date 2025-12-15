import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connection",
    initialState: null,
    reducers: {
        addConnection: (state, action) => {
            return action.payload;
        },
        removerConnection: () => {
            return null;
        }
    }
})
export const { addConnection, removerConnection, } = connectionSlice.actions
export default connectionSlice.reducer;
