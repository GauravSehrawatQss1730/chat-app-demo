import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MessageArea from '../components/MessageArea';
import MessageInput from '../components/MessageInput';

const Chat = () => {
  const { type, id } = useParams(); // Access URL parameters
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (text) => {
    setMessages((prev) => [...prev, { text, isSender: true }]);
  };

  return (
    <div style={styles.chatContainer}>
      <h2>
        {type === 'direct' ? 'Direct Chat' : 'Group Chat'} with ID: {id}
      </h2>
      <MessageArea messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

const styles = {
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
};

export default Chat;
