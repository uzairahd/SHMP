import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Styles/Login.css';

function Login({ setUser, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');

      // Store token and user details
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);

      // Navigate user after login
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate('/');
      }

      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        {!showForgotPassword ? (
          <>
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            {message && <p className="success-message">{message}</p>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="submit-button">Login</button>
            </form>

            <div className="form-links">
              <button 
                type="button" 
                className="text-button"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot Password?
              </button>
            </div>
          </>
        ) : (
          <>
            <h2>Reset Password</h2>
            {error && <p className="error">{error}</p>}
            {message && <p className="success-message">{message}</p>}

            <form onSubmit={handleForgotPassword}>
              <p className="instruction">Enter your email address and we'll send you instructions to reset your password.</p>

              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button type="submit" className="submit-button">Send Reset Link</button>
            </form>

            <div className="form-links">
              <button 
                type="button" 
                className="text-button"
                onClick={() => setShowForgotPassword(false)}
              >
                Back to Login
              </button>
            </div>
          </>
        )}

        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Login;
