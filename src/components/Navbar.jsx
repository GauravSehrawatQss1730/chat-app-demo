import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth(); // Assuming `user` contains user details like `name`.

  return (
    <nav style={styles.navbar}>
      <div style={styles.navLinks}>
        {isAuthenticated && <Link to="/" style={styles.navLink}>Home</Link>}
        {!isAuthenticated && (
          <>
            <Link to="/login" style={styles.navLink}>Login</Link>
            <Link to="/register" style={styles.navLink}>Register</Link>
          </>
        )}
      </div>
      {isAuthenticated && (
        <div style={styles.userSection}>
          <span style={styles.userName}>
            {user?.name || 'User'}
          </span>
          <button onClick={logout} style={styles.logoutButton}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
  },
  navLinks: {
    display: 'flex',
    gap: '15px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  logoutButtonHover: {
    backgroundColor: '#c0392b',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  userName: {
    fontSize: '16px',
    color: '#fff',
    fontWeight: 'bold',
  },
};

