import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatList = ({ chats }) => {
  const navigate = useNavigate();

  const handleSelectChat = (chat) => {
    navigate(`${chat.type}/${chat.id}`);
  };

  return (
    <div>
      <h3>Chats</h3>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id} onClick={() => handleSelectChat(chat)} style={styles.chatItem}>
            <h4>{chat.name}</h4>
            <p>{chat.lastMessage}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  chatItem: {
    cursor: 'pointer',
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
};

export default ChatList;
