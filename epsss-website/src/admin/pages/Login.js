import React, { useState } from 'react';
import '../../styles/admin/Login.css'; // Your existing CSS file
import { useNavigate } from 'react-router-dom';


const Login = ({ onLoginSuccess }) => {
  // State to store what user types in the form
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  // State to show loading when submitting
  const [isLoading, setIsLoading] = useState(false);
  
  // State for error messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  // Handle when user types in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  // Create admin account function
  const createAdminAccount = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const adminData = {
        username: 'admin',
        password: 'admin123',
        email: 'admin@school.com',
        contact: '+256700000000'
      };

      const response = await fetch('http://127.0.0.1:5000/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData)
      });

      if (response.ok) {
        setSuccess('Admin account created! Username: admin, Password: admin123');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create admin account');
      }
    } catch (error) {
      console.error('Error creating admin:', error);
      setError('Cannot connect to server. Make sure Flask is running on http://127.0.0.1:5000');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle when user clicks "Login" button
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Basic validation
    if (!loginData.username || !loginData.password) {
      setError('Please enter both username and password');
      setIsLoading(false);
      return;
    }

    try {
      // Get all users from Flask backend
      const response = await fetch('http://127.0.0.1:5000/api/v1/auth/users');
      
      if (!response.ok) {
        throw new Error('Cannot connect to server');
      }

      const users = await response.json();
      console.log('Users from backend:', users);
      
      // Find user with matching username
      const user = users.find(u => u.username === loginData.username);
      
      if (!user) {
        setError('Invalid username or password');
        setIsLoading(false);
        return;
      }

      // Note: In production, you should hash passwords and have a proper login endpoint
      // For now, we're doing a simple check (you'll need to improve this)
      
      setSuccess('Login successful! Redirecting to dashboard...');
      
      // Store user info in localStorage (for maintaining login state)
      localStorage.setItem('adminUser', JSON.stringify({
        id: user.id,
        username: user.username,
        email: user.email
      }));
      
      // Call parent component's success handler after short delay
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess(user);
        } else {
          // Fallback if no parent handler
          navigate('/admin/'); // or however you handle routing
        }
      }, 1500);

    } catch (error) {
      console.error('Login error:', error);
      setError('Cannot connect to server. Make sure Flask is running on http://127.0.0.1:5000');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Admin Login</h1>
          <p>Enter your credentials to access the dashboard</p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="error-message" style={{
            background: '#fee2e2', 
            color: '#dc2626', 
            padding: '10px', 
            borderRadius: '5px', 
            marginBottom: '15px',
            border: '1px solid #fecaca'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div className="success-message" style={{
            background: '#d1fae5', 
            color: '#065f46', 
            padding: '10px', 
            borderRadius: '5px', 
            marginBottom: '15px',
            border: '1px solid #a7f3d0'
          }}>
            {success}
          </div>
        )}

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
              disabled={isLoading}
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
              disabled={isLoading}
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

        {/* Create Admin Account Section */}
        <div className="admin-creation" style={{
          marginTop: '20px', 
          paddingTop: '20px', 
          borderTop: '1px solid #e5e7eb'
        }}>
          <p style={{ textAlign: 'center', marginBottom: '10px', fontSize: '14px', color: '#6b7280' }}>
            No admin account yet?
          </p>
          <button 
            type="button"
            onClick={createAdminAccount}
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '10px',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {isLoading ? 'Creating...' : 'Create Admin Account'}
          </button>
        </div>

        <div className="login-footer">
          <p>Forgot your password? Contact the system administrator.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;