import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MessageArea from '../components/MessageArea';
import MessageInput from '../components/MessageInput';
import socket from '../socket'; // Centralized socket configuration
import { getAllMessages } from '../services/api';
import { useAuth } from '../AuthContext';

const Chat = () => {
  const { type, id } = useParams(); // Access URL parameters
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const {user} = useAuth()

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data } = await getAllMessages(id);
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMessages();

    // Join a specific room for the chat (optional for organizing messages)
    const roomId = `${id}`;
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

  useEffect(() => {
    // Listen for new messages
    socket.on('receiveMessage', (newMessage) => {
      console.log("Receiveed new message: " + newMessage)
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  
    // Cleanup on component unmount
    return () => {
      socket.off('receiveMessage');
    };
  }, []);


  const handleSendMessage = (text) => {
    const message = {
      chat: id,
      sender: user._id, // Assume `userId` is from logged-in user context
      text,
    };
  
    // Emit the message to the backend
    setMessages((prevMessages) => [...prevMessages, message]);
    socket.emit('sendMessage', message);
  };
  

  if (loading) {
    return <div>Loading chat...</div>;
  }

  return (
    <div style={styles.chatContainer}>
      <h2>
        {type === 'direct' ? 'Direct Chat' : 'Group Chat'} with ID: {id}
      </h2>
      <MessageArea messages={messages} primaryUser= {user}/>
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
