import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import ChatList from '../components/ChatList';
import './Home.css'
import { getAllUsers } from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { setDirectUsers } from '../redux/user';
import socket from '../socket';
const Home = () => {
  const dispatch = useDispatch();
  const directChat = useSelector((state) => state.user.directUsers);
  const loggedInUser = useSelector(state => state.user.loggedInUser);
  const [onlineUsers, setOnlineUsers] = useState([]);
  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const allUsers = await getAllUsers();
        if (allUsers?.status === 200) {
          dispatch(setDirectUsers(allUsers.data)); // Dispatch to set users in Redux
        }
      } catch (err) { }
    };
    fetchAllUser();
    socket.emit('userOnline', loggedInUser?._id);
    socket.on('onlineUsers', (users) => {
      setOnlineUsers(users); // Update online users in state
    });

    // Clean up the socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, [dispatch]);
  const [groupChat, setGroupChat] = useState([]);

  return (
    <div style={styles.homeContainer}>
      {/* Chat List Sidebar */}
      <div style={styles.chatList}>
        <div className='chats'>
          <ChatList users={directChat} type="direct" name={"Direct Chats"} onlineUsers={onlineUsers} />
        </div>
        <div className='chats'>
          <ChatList users={groupChat} type="group" name={"Group Chats"} onlineUsers={onlineUsers} />
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
