// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';

const store = configureStore({
  reducer: {
    user: userReducer, // Add user slice reducer to store
  },
});

export default store;
