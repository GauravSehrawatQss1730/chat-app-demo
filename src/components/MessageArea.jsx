import React from 'react';


const MessageArea = ({messages}) => {
  return (
    <div style={styles.container}>
      {messages.map((message) => (
        <div key={message.id} style={styles.message}>
          <div style={styles.messageHeader}>
            <strong>{message.sender}</strong>
            <span style={styles.timestamp}>{message.timestamp}</span>
          </div>
          <p style={styles.content}>{message.content}</p>
        </div>
      ))}
    </div>
  );
};

// Styles
const styles = {
  container: {
    flex: 1,
    padding: '10px',
    overflowY: 'auto',
    backgroundColor: '#f9f9f9',
  },
  message: {
    marginBottom: '10px',
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  messageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '5px',
  },
  content: {
    fontSize: '14px',
    color: '#333',
  },
  timestamp: {
    fontSize: '12px',
    color: '#999',
  },
};

export default MessageArea;
