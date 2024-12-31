import { io } from "socket.io-client";

// Replace with your backend server URL
const SOCKET_SERVER_URL = "http://localhost:5000";

const socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket", "polling"], // Fallback options
});

export default socket;
