import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatID: null,
  },
  reducers: {
    setChat: (state, action)=>{
        state.chatID = action.payload.id;
    }
  },
});


export const { setChat }  = chatSlice.actions;
export const selectChat = (state) => state.chat.chatID;

export default chatSlice.reducer;