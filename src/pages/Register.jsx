import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useAuth } from '../AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {login,setUser} = useAuth()

  const validateForm = () => {
    if (!username || !email || !password) {
      setError('All fields are required.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const { data } = await registerUser({ username, email, password });

      login(data.token);
      setUser(data.user)
    } catch (error) {
      setError('Error registering user');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="form-button">Register</button>
      </form>
    </div>
  );
};

export default Register;

// Add CSS
const style = document.createElement('style');
style.innerHTML = `
  .register-container {
    width: 100%;
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  .register-container h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  .register-form {
    display: flex;
    flex-direction: column;
  }
  .form-group {
    margin-bottom: 15px;
  }
  .form-input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-top: 5px;
  }
  .form-button {
    padding: 12px;
    font-size: 16px;
    color: white;
    background-color: #28a745;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  .form-button:hover {
    background-color: #218838;
  }
  .error-message {
    color: red;
    font-size: 14px;
    margin-bottom: 15px;
  }
`;

document.head.appendChild(style);
