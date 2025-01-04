import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MessageArea from '../components/MessageArea';
import MessageInput from '../components/MessageInput';
import socket from '../socket'; // Centralized socket configuration
import { getAllMessages, getChatById } from '../services/api';
import { useAuth } from '../AuthContext';
import ChatHeader from '../components/ChatHeader';

const Chat = () => {
  const { type, id } = useParams(); // Access URL parameters
  const { user } = useAuth()
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [chatDetails, setChatDetails] = useState({})

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

  const fetchChatDetails = async () => {
    try {
      setChatDetails({
        username: "Loading..."
      })
      if (!user) return;
      const { data: chatResponse } = await getChatById(id, type)
      if (type === 'direct') {
        if (chatResponse?.user1?._id !== user?._id) {
          setChatDetails(chatResponse?.user1)
        } else {
          setChatDetails(chatResponse?.user2)
        }
      }
      // Need to add code for group by
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatDetails();
    fetchMessages();

    // Join a specific room for the chat (optional for organizing messages)
    const roomId = `${id}`;
    socket.emit('joinRoom', { roomId });

    // Listen for incoming messages
    socket.on('receiveMessage', (message) => {
      const { data, error } = message
      if (error) {
        alert(error)
        return;
      }
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Cleanup: Leave the room and remove listeners on component unmount
    return () => {
      socket.emit('leaveRoom', { roomId });
      socket.off('receiveMessage');
    };
  }, [type, id, user]);



  const handleSendMessage = (text) => {
    const message = {
      chat: id,
      sender: user._id, // Assume `userId` is from logged-in user context
      text,
    };

    // Emit the message to the backend
    socket.emit('sendMessage', message);
  };


  if (loading) {
    return <div>Loading chat...</div>;
  }

  return (
    <div style={styles.chatContainer}>
      <ChatHeader chatType={type} chatDetails={chatDetails} chatId={id} />
      <MessageArea messages={messages} primaryUser={user} />
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
