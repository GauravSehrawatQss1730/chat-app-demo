import React from 'react'
import Avatar from './Avatar'

const ChatHeader = ({ chatType, chatDetails, chatId }) => {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            gap: '10px',
            marginLeft: "10px"
        }}>
            <Avatar user={chatDetails} />
            <h2 style={{ fontSize: '2rem' }}>
                {chatType === 'direct' ? chatDetails?.username : `Group Chat with ID: ${chatId}`}
            </h2>
        </div>
    )
}

export default ChatHeader