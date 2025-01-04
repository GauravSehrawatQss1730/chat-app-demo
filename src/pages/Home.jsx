import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import ChatList from '../components/ChatList';
import './Home.css'
import { getAllUsers } from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { setDirectUsers } from '../redux/user';
const Home = () => {
  const dispatch = useDispatch();
  const directChat = useSelector((state) => state.user.directUsers); 
  useEffect(() => {
    const fetchAllUser = async () => {
      const allUsers = await getAllUsers();
      if (allUsers?.status === 200) {
        dispatch(setDirectUsers(allUsers.data)); // Dispatch to set users in Redux
      }
    };
    fetchAllUser();
  }, [dispatch]);
  const [groupChat, setGroupChat] = useState([]);

  return (
    <div style={styles.homeContainer}>
      {/* Chat List Sidebar */}
      <div style={styles.chatList}>
        <div className='chats'>
          <ChatList users={directChat} type="direct" />
        </div>
        <div className='chats'>
          <ChatList users={groupChat} type="group" />
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
    // padding: '10px',
  },
};

export default Home;
