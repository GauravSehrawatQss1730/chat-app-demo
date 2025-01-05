import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getGroupChats, initiateGroupChat, isDirectChatExists, isGroupChatExists } from "../services/api";
import { setActiveChat, setGroupChats } from "../redux/user";
import { useDispatch, useSelector } from "react-redux";
import CreateGroupModal from "../comman/Modal";

const ChatList = ({ users, type, onlineUsers, name, reloadData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeChat = useSelector((state) => state.user.activeChat)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectChat = async (user) => {
    if (type === 'direct') {
      const { data } = await isDirectChatExists(user._id, type);
      dispatch(setActiveChat(user._id));
      navigate(`${type}/${user._id}`);
    }
    if (type === 'group') {
      try {
        const { data } = await isGroupChatExists(user._id, type);
        dispatch(setActiveChat(data.data._id));
        navigate(`${type}/${data.data._id}`);
      } catch (error) {
        console.log(error)
      }
    }
  };

  const handleCreate = async (groupData) => {
    try {
      if (type === 'direct') {
        const userId = groupData?.members[0];
        const { data } = await isDirectChatExists(userId, type);
        await reloadData();
        dispatch(setActiveChat(data?.chat._id));
        navigate(`${type}/${data?.chat._id}`);
      }
      if (type === 'group') {
        const data = await initiateGroupChat(groupData)

        if (data?.status !== 201) return;

        await reloadData();

        navigate(`${type}/${data?.data?._id}`)
        dispatch(setActiveChat(data?.data._id));
      }
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.title}>
        {name}
        <button onClick={() => setIsModalOpen(true)} style={styles.createButton}>{type === 'group' ? 'Create Group' : 'New Chat'}</button>
      </div>
      <div style={styles.listWrapper}>
        <ul style={styles.chatList}>
          {users.map((user) => (
            <li
              key={user._id}
              onClick={() => handleSelectChat(user)}
              style={{
                ...styles.chatItem,
                ...(user._id === activeChat ? styles.selectedChatItem : {}),
              }}
            >
              <h4 style={styles.chatName}>{user?.name}
                {type !== 'group' && onlineUsers.includes(user._id) && (
                  <span style={styles.onlineIndicator}></span> // Show indicator if user is online
                )}
              </h4>
            </li>
          ))}
        </ul>
      </div>
      <CreateGroupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreate}
        modalType={type}
      />
    </div>
  );
};

const styles = {
  sidebar: {
    width: "300px",
    backgroundColor: "#f5f5f5",
    maxHeight: "100%",
    overflowY: "auto",
  },
  title: {
    fontSize: "18px",
    marginBottom: "15px",
    fontWeight: "bold",
    paddingLeft: '10px',
    background: 'rgba(51, 51, 51)',
    color: 'white',
    borderTop: '1px solid rgb(136, 136, 136)',
    padding: '10px',
    textTransform: 'capitalize',
    display: 'flex',
    justifyContent: 'space-between'
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
  createButton: {
    padding: '5px 10px',
    backgroundColor: '#007bff',  // Blue color
    color: 'white',              // White text
    border: 'none',              // No border
    borderRadius: '5px',         // Rounded corners
    cursor: 'pointer',           // Pointer cursor on hover
    fontSize: '14px',            // Font size
    transition: 'background-color 0.3s', // Smooth hover effect
  },
  onlineIndicator: {
    display: 'inline-block',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'green',
    marginLeft: '5px',
  },
};

export default ChatList;
