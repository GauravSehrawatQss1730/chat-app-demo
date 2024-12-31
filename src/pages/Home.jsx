import React from 'react';
import { Outlet } from 'react-router-dom';
import ChatList from '../components/ChatList';

const Home = () => {
  const chats = [
    { id: '6773b7f143377b960101a53b', name: 'Ayush', lastMessage: 'Hi there!', type: 'direct' },
    { id: '6773b87543377b960101a540', name: 'Gaurav', lastMessage: 'How are you?', type: 'direct' },
  ];

  return (
    <div style={styles.homeContainer}>
      {/* Chat List Sidebar */}
      <div style={styles.chatList}>
        <ChatList chats={chats} />
      </div>

      {/* Main Content Area */}
      <div style={styles.mainContent}>
        <Outlet /> {/* Nested routes will render here */}
      </div>
    </div>
  );
};

const styles = {
  homeContainer: {
    display: 'flex',
    height: '100vh',
  },
  chatList: {
    width: '300px',
    borderRight: '1px solid #ddd',
    overflowY: 'auto',
  },
  mainContent: {
    flex: 1,
    padding: '10px',
  },
};

export default Home;
