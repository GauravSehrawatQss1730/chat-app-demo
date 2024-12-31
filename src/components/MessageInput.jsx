import React, { useState } from 'react';
import './style.css';

const MessageInput = ({ onSendMessage }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        className="message-input-field"
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="message-send-button" type="submit">
        Send
      </button>
    </form>
  );
};

export default MessageInput;
