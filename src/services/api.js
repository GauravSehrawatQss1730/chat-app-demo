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

export const registerUser = (userData) => API.post('users/register', userData);
export const loginUser = (credentials) => API.post('users/login', credentials);
export const getUserProfile = () => API.get('/users/profile');
export const getAllMessages = (chatId) => API.get(`/messages/${chatId}`);
export const getAllUsers = ()=>API.get(`/users/all`)
export const isChatExist = (userId) => API.get(`/chats/chat-exists/${userId}`)