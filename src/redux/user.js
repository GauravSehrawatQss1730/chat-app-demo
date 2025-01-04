// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  directUsers: [],
  activeChat : null,
  loggedInUser:null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setDirectUsers: (state, action) => {
      state.directUsers = action.payload;
    },
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
    setLoggedInUser: (state, action) => {
        state.loggedInUser = action.payload;
      },
  },
});

export const { setDirectUsers,setActiveChat,setLoggedInUser } = userSlice.actions;
export default userSlice.reducer;
