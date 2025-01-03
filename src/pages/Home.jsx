import React from 'react';
import { Outlet } from 'react-router-dom';
import ChatList from '../components/ChatList';
import './Home.css'
const Home = () => {
  const directChats = [
    { id: '6773b7f143377b960101a53b', name: 'Ayush', lastMessage: 'Hi there!', type: 'direct' },
    { id: '6773b87543377b960101a540', name: 'Gaurav', lastMessage: 'How are you?', type: 'direct' },
    { id: '6773b7f143377b960101a52b', name: 'Rahul', lastMessage: 'Hi there!', type: 'direct' },
    { id: '6773b87543377b960101a140', name: 'Joghn', lastMessage: 'How are you?', type: 'direct' },
    { id: '6773b7f143377b960101233b', name: 'Ramesh', lastMessage: 'Hi there!', type: 'direct' },
    { id: '6773b87543377b9601211240', name: 'Suresh', lastMessage: 'How are you?', type: 'direct' },
  ];
  const groupChats = [
    { id: '6773b7f143377b9601011221', name: 'Dev', lastMessage: 'Hi there!', type: 'group' },
    { id: '6773b87543377b9601015425', name: 'Testing', lastMessage: 'How are you?', type: 'group' },
  ];

  return (
    <div style={styles.homeContainer}>
      {/* Chat List Sidebar */}
      <div style={styles.chatList}>
        <div className='chats'>
        <ChatList chats={directChats} type="Direct Chats" />
        </div>
        <div className='chats'>
        <ChatList chats={groupChats} type="Group Chats" />
        </div>
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
    height: '94vh',
  },
  chatList: {
    borderRight: '1px solid #ddd',
    overflowY: 'auto',
    backgroundColor: 'rgb(245, 245, 245)',
  },
  mainContent: {
    flex: 1,
    padding: '10px',
  },
};

export default Home;
