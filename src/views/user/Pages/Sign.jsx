import React, { useState, useRef, useEffect } from 'react';
import imageChill from '../../image/hinh-anh-do-an-chill.jpg';

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
  const [successMessage, setSuccessMessage] = useState(''); // New state for success message

  const otpRefs = useRef([]);

  useEffect(() => {
    let interval = null;

    if (isButtonDisabled) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setIsButtonDisabled(false);
            return 60; // Reset timer to 60 seconds
          }
          return prevTimer - 1; // Decrease timer by 1 second
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
    setSuccessMessage(''); // Reset success message

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
        console.error('Server response:', result);
      }
    } catch (error) {
      setErrorMessage('Error sending OTP');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage(''); // Reset success message

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
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegistration = async () => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage(''); // Reset success message

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
        setSuccessMessage('Registration successful!'); // Set success message
        // Redirect to personal information page
        window.location.href = `http://localhost:3000/thông-tin-cá-nhân?userId=${newUser.accountID}`;
      } else {
        const result = await response.json();
        setErrorMessage('Error: ' + result.message);
      }
    } catch (error) {
      setErrorMessage('Error during registration');
      console.error('Error:', error);
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
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', background: '#f5f5f5' }}>
      <div style={{ display: 'flex', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0,0,0,0.2)', width: '800px' }}>
        <div style={{ padding: '40px' }}>
          <img src={imageChill} alt="Bakery illustration" style={{ width: '300px', height: 'auto' }} />
        </div>
        <div style={{ padding: '40px', width: '400px' }}>
          <h1 style={{ fontSize: '2.5em', marginBottom: '20px', textAlign: 'center' }}>Register</h1>
          {errorMessage && <span style={{ color: 'red', fontSize: '0.9em', textAlign: 'center', width: '100%', display: 'block' }}>{errorMessage}</span>}
          {successMessage && <span style={{ color: 'green', fontSize: '0.9em', textAlign: 'center', width: '100%', display: 'block' }}>{successMessage}</span>} {/* Success message */}
          {step === 1 && (
            <>
              <div style={{ marginBottom: '20px' }}>
                <input
                  type="email"
                  placeholder="Nhập email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmail('')}
                  style={{ width: '100%', padding: '10px', fontSize: '1em', marginBottom: '5px', borderRadius: '8px', border: '1px solid #ccc' }}
                />
              </div>
              <button
                type="button"
                onClick={handleSendOtp}
                style={{
                  padding: '10px',
                  fontSize: '1em',
                  backgroundColor: '#ff4d4d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  width: '100%',
                  transition: 'border 0.3s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.border = '2px solid black'}
                onMouseLeave={(e) => e.currentTarget.style.border = 'none'}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Enter OTP</h2>

              {/* First Row */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                {otp.slice(0, 3).map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    ref={(ref) => (otpRefs.current[index] = ref)}
                    style={{
                      width: '50px', // Adjusted width for better spacing
                      padding: '10px', // Consistent padding
                      fontSize: '1.5em',
                      textAlign: 'center',
                      margin: '0 5px', // Adjusted margin for a bit more space
                      borderRadius: '8px',
                      border: '1px solid #ccc',
                    }}
                  />
                ))}
              </div>

              {/* Second Row */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                {otp.slice(3, 6).map((digit, index) => (
                  <input
                    key={index + 3} // Unique key for the second row
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index + 3, e.target.value)} // Adjusted index for change handler
                    ref={(ref) => (otpRefs.current[index + 3] = ref)} // Adjust reference for the second row
                    style={{
                      width: '50px', // Adjusted width for better spacing
                      padding: '10px', // Consistent padding
                      fontSize: '1.5em',
                      textAlign: 'center',
                      margin: '0 5px', // Adjusted margin for a bit more space
                      borderRadius: '8px',
                      border: '1px solid #ccc',
                    }}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleVerifyOtp}
                style={{
                  padding: '10px',
                  fontSize: '1em',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  width: '100%',
                  transition: 'border 0.3s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.border = '2px solid black'}
                onMouseLeave={(e) => e.currentTarget.style.border = 'none'}
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>

              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                {isButtonDisabled && <span>Resend OTP in {timer} seconds</span>}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div style={{ marginBottom: '20px' }}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ width: '100%', padding: '10px', fontSize: '1em', marginBottom: '5px', borderRadius: '8px', border: '1px solid #ccc' }}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <input
                  type="password"
                  placeholder="Password (6 digits)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '10px', fontSize: '1em', marginBottom: '5px', borderRadius: '8px', border: '1px solid #ccc' }}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <input
                  type="text"
                  placeholder="Phone Number (10 digits)"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={{ width: '100%', padding: '10px', fontSize: '1em', marginBottom: '5px', borderRadius: '8px', border: '1px solid #ccc' }}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ width: '100%', padding: '10px', fontSize: '1em', marginBottom: '5px', borderRadius: '8px', border: '1px solid #ccc' }}
                />
              </div>
              <button
                type="button"
                onClick={handleRegistration}
                style={{
                  padding: '10px',
                  fontSize: '1em',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  width: '100%',
                  transition: 'border 0.3s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.border = '2px solid black'}
                onMouseLeave={(e) => e.currentTarget.style.border = 'none'}
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
