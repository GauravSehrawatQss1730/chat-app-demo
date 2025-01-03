import React, { useEffect, useRef } from 'react';
import { formattedDate } from '../utils/utils';

const MessageArea = ({ messages, primaryUser }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);


  
  
  return (
    <div ref={containerRef} style={styles.container}>
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{
            ...styles.messageWrapper,
            flexDirection: msg.sender._id === primaryUser._id ? 'row-reverse' : 'row', // Align based on sender
          }}
        >
          <div>{formattedDate(msg.timestamp)}</div>
          {/* Avatar */}
          <div style={styles.avatarContainer}>
            <Avatar user={msg.sender} />
          </div>

          {/* Message */}
          <div
            style={{
              ...styles.message,
              ...(msg.sender._id === primaryUser._id ? styles.senderMessage : styles.receiverMessage),
            }}
          >
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
};

// Avatar Component
const Avatar = ({ user }) => {
  // Extract the first letter of the sender's username
  const initial = user?.username?.charAt(0).toUpperCase() || "?";

  return (
    <div style={styles.avatar}>
      <span style={styles.avatarText}>{initial}</span>
    </div>
  );
};

// Styles
const styles = {
  container: {
    flex: 1,
    overflowY: 'auto',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    height: '100%'
  },
  messageWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    gap: '10px',
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#007bff', // Default avatar background color
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '18px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  avatarText: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  message: {
    padding: '8px',
    borderRadius: '10px',
    maxWidth: '60%',
  },
  senderMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1e7dd',
  },
  receiverMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f8d7da',
  },
};

export default MessageArea;
