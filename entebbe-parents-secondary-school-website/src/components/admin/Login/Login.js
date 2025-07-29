import React, { useState } from 'react';
import './Login.css'; // We'll create this CSS file next

const Login = () => {
  // State to store what user types in the form
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  // State to show loading when submitting
  const [isLoading, setIsLoading] = useState(false);

  // Handle when user types in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle when user clicks "Login" button
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    setIsLoading(true);

    // For now, let's just log what user entered
    console.log('Login attempt:', loginData);
    
    // Simulate login process (we'll connect to real backend later)
    setTimeout(() => {
      if (loginData.username === 'admin' && loginData.password === 'password123') {
        alert('Login successful! (We will redirect to dashboard later)');
      } else {
        alert('Invalid credentials! Try username: admin, password: password123');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Admin Login</h1>
          <p>Enter your credentials to access the dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={loginData.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="login-footer">
          <p>Forgot your password? Contact the system administrator.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;