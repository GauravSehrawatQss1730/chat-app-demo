import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MessageArea from '../components/MessageArea';
import MessageInput from '../components/MessageInput';
import socket from '../socket'; // Import the centralized socket configuration

const Chat = () => {
  const { type, id } = useParams(); // Access URL parameters
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Join a specific room for the chat (optional for organizing messages)
    const roomId = `${type}-${id}`;
    socket.emit('joinRoom', { roomId });

    // Listen for incoming messages
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup: Leave the room and remove listeners on component unmount
    return () => {
      socket.emit('leaveRoom', { roomId });
      socket.off('receiveMessage');
    };
  }, [type, id]);

  const handleSendMessage = (text) => {
    const message = {
      text,
      isSender: true,
      timestamp: new Date(),
      roomId: `${type}-${id}`,
    };

    // Optimistically update messages
    setMessages((prev) => [...prev, message]);

    // Emit the message to the backend
    socket.emit('sendMessage', message);
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
