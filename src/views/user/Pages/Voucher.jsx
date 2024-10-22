import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import './voucher.css';

const Voucher = () => {
  return (
    <div className="container mt-4">
      <Row>
        {[...Array(4)].map((_, index) => (
          <Col md={6} className="mb-3" key={index}>
            <Card className="voucher-card">
              <Card.Body className="d-flex align-items-start">
                <div className="voucher-image-wrapper">
                  <img 
                    src="/images/freeship.png"  // URL ảnh của bạn
                    alt="Voucher Image"
                    className="voucher-image"
                  />
                </div>

                <div className="voucher-content">
                  <div className="voucher-title">FREESHIP XTRA</div>
                  <p className="voucher-discount">Giảm tới đa 30k</p>
                  <p className="voucher-minimum-order">Đơn Tối Thiểu 0₫</p>
                  <p className="voucher-exclusive">Dành riêng cho bạn</p>
                  <p className="voucher-expiry">HSD: 23.10.2024 <a href="#">Điều Kiện</a></p>
                </div>

                <div className="voucher-button-wrapper">
                  <Button variant="outline-success" className="voucher-button">Dùng Ngay</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Voucher;
