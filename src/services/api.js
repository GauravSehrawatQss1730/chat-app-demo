import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend base URL
});

// Attach token to headers if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// User Routes
export const getAllUsers = ()=>API.get(`/users/all`)
export const registerUser = (userData) => API.post('users/register', userData);
export const loginUser = (credentials) => API.post('users/login', credentials);
export const getUserProfile = () => API.get('/users/profile');

// Message Routes
export const getAllMessages = (chatId) => API.get(`/messages/${chatId}`);

// Chat Routes
export const getChatById = (chatId, chatType) => API.get(`/chats/${chatId}?type=${chatType}`)
export const isChatExist = (userId) => API.get(`/chats/chat-exists/${userId}`)