// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  directUsers: [],
  activeChat : null,
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
  },
});

export const { setDirectUsers,setActiveChat } = userSlice.actions;
export default userSlice.reducer;
