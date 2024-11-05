import React, { useState } from 'react';
import imageChill from '../../image/hinh-anh-do-an-chill.jpg';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
  const validatePassword = (password) => /^\d{6}$/.test(password);

  const handleLogin = async (event) => {
    event.preventDefault();
    setEmailError('');
    setPasswordError('');

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
      if (result.success) {
        alert('Login successful');
        localStorage.setItem('userId', result.userId);
        window.location.href = `http://localhost:3000`;
      } else {
        alert(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login.');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', background: '#f5f5f5' }}>
      <div style={{ display: 'flex', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0,0,0,0.2)', width: '800px' }}>
        <div style={{ padding: '40px' }}>
          <img src={imageChill} alt="Bakery illustration" style={{ width: '300px', height: 'auto' }} />
        </div>
        <div style={{ padding: '40px', width: '400px' }}>
          <h1 style={{ fontSize: '2.5em', marginBottom: '20px', textAlign: 'center' }}>Login</h1>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="email"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmail('')}
              style={{ width: '100%', padding: '10px', fontSize: '1em', marginBottom: '5px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            {emailError && <span style={{ color: 'red', fontSize: '0.9em' }}>{emailError}</span>}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="password"
              placeholder="Nhập 6-digit password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPassword('')}
              style={{ width: '100%', padding: '10px', fontSize: '1em', marginBottom: '5px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            {passwordError && <span style={{ color: 'red', fontSize: '0.9em' }}>{passwordError}</span>}
          </div>
          <button
            type="button"
            onClick={handleLogin}
            style={{
              padding: '10px',
              fontSize: '1em',
              backgroundColor: '#ff4d4d',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              width: '100%',
              transition: 'border 0.3s', // Add transition for smoothness
            }}
            onMouseEnter={(e) => e.currentTarget.style.border = '2px solid black'}
            onMouseLeave={(e) => e.currentTarget.style.border = 'none'}
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
