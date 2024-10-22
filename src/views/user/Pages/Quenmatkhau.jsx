import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Quenmatkhau = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8080/sendemail', null, {
        params: { email: email }
      });
  
      if (response.status === 200) {
        setMessage('Email đã được gửi. Vui lòng kiểm tra hòm thư của bạn!');
        localStorage.setItem('email', email);
        window.location.href = "/otp";
      } else {
        setMessage('Không tìm thấy người dùng với email này.');
      }
    } catch (error) {
      console.error('Có lỗi xảy ra:', error);
      setMessage('Đã xảy ra lỗi khi gửi email.');
    }
  };  

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Row>
        <Col>
          <Card style={{ width: '25rem', padding: '2rem', borderRadius: '1rem' }}>
            <Card.Body style={{ width: '100%' }}>  {/* Thêm width 100% */}
              <Card.Title className="text-center">Quên mật khẩu?</Card.Title>
              <Card.Text className="text-center">
                Điền email gắn với tài khoản của bạn để nhận mã OTP thay đổi mật khẩu.
              </Card.Text>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Nhập email của bạn" 
                    value={email} 
                    onChange={handleEmailChange} 
                    required 
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className='mt-3' style={{ width: '100%' }}> {/* Sửa width */}
                  Tiếp tục
                </Button>
                {message && <p className="mt-3 text-center">{message}</p>}
                <div className="text-center mt-3">
                  <a href="/login">Quay lại đăng nhập</a>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Quenmatkhau;
