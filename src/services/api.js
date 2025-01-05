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
API.interceptors.response.use(
  (response) => response, // Return response if successful
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirect to login page
    }
    return Promise.reject(error); // Forward error for further handling if needed
  }
);

// User Routes
export const getAllUsers = () => API.get(`/users/all`);
export const registerUser = (userData) => API.post('users/register', userData);
export const loginUser = (credentials) => API.post('users/login', credentials);
export const getUserProfile = () => API.get('/users/profile');

// Message Routes
export const getAllMessages = (chatId) => API.get(`/messages/${chatId}`);

// Chat Routes
export const getChatById = (chatId, chatType) =>
  API.get(`/chats/${chatId}?type=${chatType}`);
export const isDirectChatExists = (userId, chatType) => API.get(`/chats/direct-chat-exists/${userId}?type=${chatType}`);
export const isGroupChatExists = (chatId, chatType) => API.get(`/chats/group-chat-exists/${chatId}?type=${chatType}`);
export const initiateGroupChat = (data) => API.post(`/chats/create`, data);
export const getDirectChat = () => API.get('/chats/allChat?type=direct');
export const getGroupChats = () => API.get('/chats/allChat?type=group');