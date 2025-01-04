import React from 'react'

const Avatar = ({ user }) => {
    const initial = user?.username?.charAt(0).toUpperCase() || "?";

    return (
        <div style={styles.avatar}>
            <span style={styles.avatarText}>{initial}</span>
        </div>
    );
};

const styles = {
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
};


export default Avatar