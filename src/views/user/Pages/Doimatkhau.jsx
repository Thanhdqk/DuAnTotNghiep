import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Doimatkhau = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('email'); // Lấy email từ localStorage
    console.log('Email đã lưu:', savedEmail); // Kiểm tra giá trị email
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      setMessage('Email không được tìm thấy trong localStorage.'); // Thông báo nếu không tìm thấy email
    }
  }, []);
  

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (password !== confirmPassword) {
      setMessage('Mật khẩu không khớp.');
      return;
    }
  
    try {
      // Gửi cả email và mật khẩu trong body
      const response = await axios.post(`http://localhost:8080/reset-password`, {
        email: email,
        password: password
      });
  
      if (response.data) {
        setMessage('Mật khẩu đã được thay đổi thành công.');
        localStorage.removeItem('email'); // Xóa email sau khi hoàn thành
      } else {
        setMessage('Không thể thay đổi mật khẩu. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Có lỗi xảy ra:', error.response ? error.response.data : error.message);
      setMessage('Đã xảy ra lỗi khi đặt lại mật khẩu.');
    }
  };  

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <Row>
      <Col>
        <Card style={{ width: '25rem', padding: '2rem', borderRadius: '1rem' }}>
          <Card.Body style={{ width: '100%' }}>
            <Card.Title className="text-center">Đổi mật khẩu</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formPassword">
                <Form.Label style={{ textAlign: 'left', display: 'block' }}>Mật khẩu mới</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Nhập mật khẩu mới" 
                  value={password} 
                  onChange={handlePasswordChange} 
                  required 
                />
              </Form.Group>
              <Form.Group controlId="formConfirmPassword" className='mt-3'>
                <Form.Label style={{ textAlign: 'left', display: 'block' }}>Xác nhận mật khẩu</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Xác nhận mật khẩu" 
                  value={confirmPassword} 
                  onChange={handleConfirmPasswordChange} 
                  required 
                />
              </Form.Group>
              <Button variant="primary" type="submit" className='mt-3' style={{ width: '100%' }}>
                Đổi mật khẩu
              </Button>
              {message && <p className="mt-3 text-center">{message}</p>}
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
  );
};

export default Doimatkhau;
