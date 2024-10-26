import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './voucher.css';

const Voucher = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accountID, setaccountID] = useState(JSON.parse(localStorage.getItem('accountID')));

  useEffect(() => {
    console.log('cc', accountID);
    const fetchVouchers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/loadVoucher');
        setVouchers(response.data);
      } catch (error) {
        console.error('Error loading vouchers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []);

  const handleSave = async (voucherID) => {
    try {
      const voucherDetail = {
        voucher: { voucherID: voucherID },  // Gửi voucherID
        users: { accountID: accountID }      // Gửi accountID từ localStorage
      };
  
      const response = await axios.post('http://localhost:8080/addVoucherDetail', voucherDetail);
      console.log(response.data);
      alert('Voucher saved successfully!');
    } catch (error) {
      console.error('Error saving voucher:', error);
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <Row>
        {vouchers.map((voucher, index) => (
          <Col md={6} className="mb-3" key={index}>
            <Card className="voucher-card">
              <Card.Body className="d-flex align-items-start">
                <div className="voucher-image-wrapper">
                <img 
                    src = {`/images/${voucher.hinh_anh}`} 
                    alt="Voucher for FREESHIP XTRA" // Cập nhật alt
                    className="voucher-image"
                  />
                </div>

                <div className="voucher-content">
                  <div className="voucher-title">FREESHIP XTRA</div>
                  <p className="voucher-discount"> Giảm tối đa {voucher.so_tien_giam}</p>
                  <p className="voucher-minimum-order">Đơn Tối Thiểu 0₫</p>
                  <p className="voucher-exclusive">Dành riêng cho bạn</p>
                  <p className="voucher-expiry">
                    HSD: {voucher.han_su_dung} 
                    <button className="link-button" onClick={() => {/* Xử lý điều kiện ở đây */}}>
                      Điều Kiện
                    </button>
                  </p>
                </div>

                <div className="voucher-button-wrapper">
                <Button 
                  variant="outline-success" 
                  className="voucher-button" 
                  onClick={() => handleSave(voucher.voucherID)}>
                  Lưu
                </Button>
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
