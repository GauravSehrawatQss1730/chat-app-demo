import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isChatExist } from "../services/api";

const ChatList = ({ users, type }) => {
  const navigate = useNavigate();
  const [selectedChatId, setSelectedChatId] = useState(null); // State to track selected chat

  const handleSelectChat = async (user) => {
    const { data } = await isChatExist(user._id);
    setSelectedChatId(user._id);
    navigate(`${data.directChatExists.type}/${data.directChatExists._id}`);
  };

  return (
    <div style={styles.sidebar}>
      <h3 style={styles.title}>{type}</h3>
      <div style={styles.listWrapper}>
        <ul style={styles.chatList}>
          {users.map((user) => (
            <li
              key={user._id}
              onClick={() => handleSelectChat(user)}
              style={{
                ...styles.chatItem,
                ...(user._id === selectedChatId ? styles.selectedChatItem : {}),
              }}
            >
              <h4 style={styles.chatName}>{user.username}</h4>
              {/* <p style={styles.lastMessage}>{chat.lastMessage}</p> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "300px",
    backgroundColor: "#f5f5f5",
    maxHeight: "100%",
    borderRight: "1px solid #ddd",
    overflowY: "auto",
    padding: "15px",
  },
  title: {
    fontSize: "18px",
    marginBottom: "15px",
    color: "#333",
    fontWeight: "bold",
  },
  chatList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  chatItem: {
    cursor: "pointer",
    padding: "10px 15px",
    borderRadius: "8px",
    marginBottom: "10px",
    backgroundColor: "#ffffff",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s, transform 0.2s",
  },
  selectedChatItem: {
    backgroundColor: "#d1e7ff", // Highlight color for selected chat
    border: "2px solid #007bff", // Blue border for the selected chat
    transform: "scale(1.02)", // Slightly larger to emphasize selection
  },
  chatName: {
    fontSize: "16px",
    margin: "0 0 5px 0",
    color: "#333",
    fontWeight: "500",
  },
  lastMessage: {
    fontSize: "14px",
    color: "#666",
    margin: 0,
  },
  listWrapper: {
    maxHeight: "335px",
    overflowY: "auto",
    padding: "8px",
  },
};

export default ChatList;
