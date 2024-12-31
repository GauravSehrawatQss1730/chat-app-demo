import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { useAuth } from '../AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login ,setUser } = useAuth();

  const validateForm = () => {
    if (!email || !password) {
      setError('Email and password are required.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true); // Start loader
      const { data } = await loginUser({ email, password });
      localStorage.setItem('token', data.token);
      login();
      setUser(data.user)
      setLoading(false);
    } catch (error) {
      setError('Invalid email or password');
      setLoading(false); // Stop loader
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
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
        <button type="submit" className="form-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;

// Add CSS
const style = document.createElement('style');
style.innerHTML = `
  .login-container {
    width: 100%;
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  .login-container h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  .login-form {
    display: flex;
    flex-direction: column;
  }
  .form-group {
    margin-bottom: 15px;
  }
  .form-input {
    width:300px;
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
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .form-button:disabled {
    background-color: #cccccc;
  }
  .error-message {
    color: red;
    font-size: 14px;
    margin-bottom: 15px;
  }
`;

document.head.appendChild(style);
