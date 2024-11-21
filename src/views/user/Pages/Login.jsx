import React, { useState } from 'react';
import imageChill from '../../image/backgoundlogin.png';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
  const validatePassword = (password) => /^\d{6}$/.test(password);

  const handleLogin = async (event) => {
    event.preventDefault();
    setEmailError('');
    setPasswordError('');
    setSuccessMessage('');
    setErrorMessage('');
  
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid Gmail address.');
      return;
    }
  
    if (!validatePassword(password)) {
      setPasswordError('Password must be exactly 6 digits.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await response.json();
      if (response.status === 403) {
        setErrorMessage(result.message || 'Your account has been locked.');
        return;
      }
  
      if (result.success) {
        setSuccessMessage('Login successful');
        localStorage.setItem('userId', result.userId);
        window.location.href = `http://localhost:3000`;
      } else {
        setErrorMessage(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred during login.');
    }
  };
  

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #89CFF0, #4F7AC9)', // Blue gradient background
    }}>
      <div style={{
        display: 'flex',
        backgroundColor: '#fff',
        borderRadius: '15px',
        width: '100%',
        maxWidth: '900px',
        height: '80vh',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Added subtle shadow for realism
      }}>
        {/* Left Side - Image */}
        <div style={{
          flex: 1,
          backgroundImage: `url(${imageChill})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderTopLeftRadius: '15px',
          borderBottomLeftRadius: '15px',
        }}></div>

        {/* Right Side - Login Form */}
        <div style={{
          padding: '40px',
          width: '400px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <h2 style={{
            textAlign: 'center',
            color: '#ff6f61',
            marginBottom: '20px',
            fontSize: '2.2em',
            fontWeight: 'bold',
            letterSpacing: '1px',
          }}>Login</h2>

          {/* Success Message */}
          {successMessage && (
            <div style={{
              color: '#388E3C',
              padding: '12px',
              borderRadius: '8px',
              backgroundColor: '#E8F5E9',
              marginBottom: '20px',
              textAlign: 'center',
              border: '1px solid #388E3C',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Added shadow to success box
            }}>
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div style={{
              color: '#D32F2F',
              padding: '12px',
              borderRadius: '8px',
              backgroundColor: '#FFEBEE',
              marginBottom: '20px',
              textAlign: 'center',
              border: '1px solid #D32F2F',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Added shadow to error box
            }}>
              {errorMessage}
            </div>
          )}

          {/* Email Input */}
          <div style={{ marginBottom: '20px' }}>
            <input
              type="email"
              placeholder="Enter your Gmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '15px',
                fontSize: '1em',
                borderRadius: '50px',
                border: 'none',
                boxShadow: '0px 4px 8px rgba(0,0,0,0.15)',
                marginBottom: '8px',
                backgroundColor: '#f9f9f9',
              }}
            />
            {emailError && <span style={{ color: '#ff5851', fontSize: '0.9em' }}>{emailError}</span>}
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: '20px' }}>
            <input
              type="password"
              placeholder="Enter 6-digit password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '15px',
                fontSize: '1em',
                borderRadius: '50px',
                border: 'none',
                boxShadow: '0px 4px 8px rgba(0,0,0,0.15)',
                marginBottom: '8px',
                backgroundColor: '#f9f9f9',
              }}
            />
            {passwordError && <span style={{ color: '#ff5851', fontSize: '0.9em' }}>{passwordError}</span>}
          </div>

          {/* Submit Button */}
          <button
  type="button" // Hoặc "submit" nếu bạn muốn sử dụng nó trong form
  style={{
    width: '100%',
    padding: '15px',
    fontSize: '1.2em',
    color: 'white',
    backgroundColor: '#ff5851',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    boxShadow: '0px 8px 16px rgba(0,0,0,0.2)',
  }}
  onClick={handleLogin} // Gọi hàm handleLogin khi nhấn nút
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = '#ff4040';
    e.currentTarget.style.transform = 'scale(1.05)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = '#ff5851';
    e.currentTarget.style.transform = 'scale(1)';
  }}
>
  Login
</button>

        </div>
      </div>
    </div>
  );
}

export default LoginForm;
