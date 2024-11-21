import React, { useState, useRef, useEffect } from 'react';
import imageChill from '../../image/backgoundlogin.png';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(60);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const otpRefs = useRef([]);
  const formRef = useRef(null);

  useEffect(() => {
    let interval = null;
    if (isButtonDisabled) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setIsButtonDisabled(false);
            return 60;
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isButtonDisabled]);

  const handleSendOtp = async () => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      setLoading(false);
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/auth/sendOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const result = await response.text();
      if (response.ok) {
        if (result.includes('OTP sent successfully')) {
          setStep(2);
          setIsButtonDisabled(true);
          setTimer(60);
        } else {
          setErrorMessage(result);
        }
      } else {
        setErrorMessage('Error: ' + result);
      }
    } catch (error) {
      setErrorMessage('Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    const otpCode = otp.join('');
    try {
      const response = await fetch('http://localhost:8080/auth/verifyOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpCode }),
      });
      const result = await response.text();
      if (result === 'OTP verified successfully') {
        setStep(3);
      } else {
        setErrorMessage(result);
      }
    } catch (error) {
      setErrorMessage('Error verifying OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleRegistration = async () => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    if (!password || password.length !== 6) {
      setErrorMessage('Please set a valid 6-digit password.');
      setLoading(false);
      return;
    }
    if (!fullName) {
      setErrorMessage('Please enter your full name.');
      setLoading(false);
      return;
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      setErrorMessage('Please enter a valid phone number (10 digits).');
      setLoading(false);
      return;
    }
    if (!address) {
      setErrorMessage('Please enter your address.');
      setLoading(false);
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullName, phoneNumber, address }),
      });
      if (response.ok) {
        const newUser = await response.json();
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userId', newUser.accountID);
        setSuccessMessage('Registration successful!');
        window.location.href = `http://localhost:3000/thông-tin-cá-nhân?userId=${newUser.accountID}`;
      } else {
        const result = await response.json();
        setErrorMessage('Error: ' + result.message);
      }
    } catch (error) {
      setErrorMessage('Error during registration');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        otpRefs.current[index + 1].focus();
      }
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
        <div style={{
          flex: 1,
          backgroundImage: `url(${imageChill})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderTopLeftRadius: '15px',
          borderBottomLeftRadius: '15px',
        }}></div>
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
          }}>Create Account</h2>

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

          {step === 1 && (
            <>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '15px',
                  fontSize: '1.1em',
                  borderRadius: '8px',
                  border: '2px solid #ff6f61',
                  marginBottom: '15px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s ease',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Added shadow to input
                }}
              />
              <button
                onClick={handleSendOtp}
                style={{
                  width: '100%',
                  padding: '15px',
                  backgroundColor: '#ff6f61',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1em',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.3s ease',
                  marginTop: '15px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Added shadow to button
                }}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </>
          )}
{step === 2 && (
  <>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '20px' }}>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          value={digit}
          onChange={(e) => handleOtpChange(index, e.target.value)}
          ref={(el) => (otpRefs.current[index] = el)}
          maxLength="1"
          style={{
            width: 'calc(33.33% - 10px)', // 3 inputs per row
            padding: '10px', // Smaller padding
            fontSize: '1.2em', // Smaller font size
            fontWeight: 'bold',
            textAlign: 'center',
            borderRadius: '8px',
            border: '2px solid #ff6f61',
            marginBottom: '10px', // Vertical space between rows
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.3s ease, transform 0.2s ease',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
            transform: digit ? 'scale(1.1)' : 'scale(1)',
          }}
        />
      ))}
    </div>
    <button
      onClick={handleVerifyOtp}
      style={{
        width: '100%',
        padding: '15px',
        backgroundColor: '#ff6f61',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1.1em',
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'background-color 0.3s ease',
        marginTop: '15px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
      disabled={loading}
    >
      {loading ? 'Verifying...' : 'Verify OTP'}
    </button>
  </>
)}


{step === 3 && (
  <>
    <input
      type="password"
      placeholder="Password (6 digits)"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      style={{
        width: '100%',
        padding: '15px',
        fontSize: '1.1em',
        borderRadius: '8px',
        border: '2px solid #ff6f61',
        marginBottom: '15px',
        outline: 'none',
        boxSizing: 'border-box',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Added shadow to input
      }}
    />
    <input
      type="text"
      placeholder="Full Name"
      value={fullName}
      onChange={(e) => setFullName(e.target.value)}
      style={{
        width: '100%',
        padding: '15px',
        fontSize: '1.1em',
        borderRadius: '8px',
        border: '2px solid #ff6f61',
        marginBottom: '15px',
        outline: 'none',
        boxSizing: 'border-box',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Added shadow to input
      }}
    />
    <input
      type="text"
      placeholder="Phone Number"
      value={phoneNumber}
      onChange={(e) => setPhoneNumber(e.target.value)}
      style={{
        width: '100%',
        padding: '15px',
        fontSize: '1.1em',
        borderRadius: '8px',
        border: '2px solid #ff6f61',
        marginBottom: '15px',
        outline: 'none',
        boxSizing: 'border-box',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Added shadow to input
      }}
    />
    <input
      type="text"
      placeholder="Address"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      style={{
        width: '100%',
        padding: '15px',
        fontSize: '1.1em',
        borderRadius: '8px',
        border: '2px solid #ff6f61',
        marginBottom: '15px',
        outline: 'none',
        boxSizing: 'border-box',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Added shadow to input
      }}
    />
    <button
      onClick={handleRegistration}
      style={{
        width: '100%',
        padding: '15px',
        backgroundColor: '#ff6f61',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1.1em',
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'background-color 0.3s ease',
        marginTop: '15px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Added shadow to button
      }}
      disabled={loading}
    >
      {loading ? 'Registering...' : 'Register'}
    </button>
  </>
)}

        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
