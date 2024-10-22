import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const NhapOTP = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  // Lấy email từ localStorage khi component được khởi tạo
  useEffect(() => {
    const savedEmail = localStorage.getItem('email'); // Kiểm tra localStorage
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      setMessage('Không tìm thấy email. Vui lòng thử lại.');
    }
  }, []);

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/verify-otp', null, {
        params: {
          otp: otp,
          email: email, // Sử dụng email đã lấy từ localStorage
        }
      });

      if (response.data === "Xác thực thành công!") {
        window.location.href = "/dmk";
      } else {
        setMessage('Mã OTP không chính xác. Vui lòng thử lại.');
      }      
    } catch (error) {
      console.error('Có lỗi xảy ra:', error.response.data); // Hiển thị lỗi chi tiết
      setMessage(error.response.data); // Hiển thị thông báo từ backend
    }
  };  

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Row>
        <Col>
          <Card style={{ width: '25rem', padding: '2rem', borderRadius: '1rem' }}>
            <Card.Body style={{ width: '100%' }}>
              <Card.Title className="text-center">Xác thực OTP</Card.Title>
              <Card.Text className="text-center">
                Nhập mã OTP được gửi đến email của bạn.
              </Card.Text>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formOtp">
                  <Form.Label>OTP</Form.Label>
                  <Form.Control 
                    type="number" 
                    placeholder="Nhập mã OTP" 
                    value={otp} 
                    onChange={handleOtpChange} 
                    required 
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className='mt-3' style={{ width: '100%' }}>
                  Xác nhận
                </Button>
                {message && <p className="mt-3 text-center text-danger">{message}</p>}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NhapOTP;
