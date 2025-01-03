import React from 'react';

const MessageArea = ({ messages }) => {
  console.log(messages)
  return (
    <div style={styles.container}>
      {messages.map((msg, index) => (
        <div
          key={index}
          style={
            msg.isSender
              ? styles.senderMessage
              : styles.receiverMessage
          }
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    overflowY: 'auto',
    padding: '10px',
  },
  senderMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1e7dd',
    padding: '8px',
    borderRadius: '10px',
    marginBottom: '5px',
    maxWidth: '60%',
  },
  receiverMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f8d7da',
    padding: '8px',
    borderRadius: '10px',
    marginBottom: '5px',
    maxWidth: '60%',
  },
};

export default MessageArea;
