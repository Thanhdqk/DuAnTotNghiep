import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './voucher.css';

const Voucher = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accountID, setAccountID] = useState(JSON.parse(localStorage.getItem('accountID')));
  const [savedVouchers, setSavedVouchers] = useState(new Set()); // State để theo dõi voucher đã lưu

  useEffect(() => {
    const fetchUnsavedVouchers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/loadUnsavedVouchers', {
          params: { accountID: accountID }
        });
        setVouchers(response.data);
      } catch (error) {
        console.error('Error loading unsaved vouchers:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUnsavedVouchers();
  }, [accountID]);  

  const handleSave = async (voucherID) => {
    const selectedVoucher = vouchers.find(voucher => voucher.voucherID === voucherID);
  
    // Kiểm tra nếu voucher đã hết hạn
    const now = new Date();
    const expiryDate = new Date(selectedVoucher.han_su_dung);
  
    if (expiryDate < now) {
      alert('Voucher đã hết hạn!');
      return;
    }
  
    // Kiểm tra nếu so_luot_SD hoặc so_luong bằng 0
    if (selectedVoucher.so_luot_SD === 0 || selectedVoucher.so_luong === 0) {
      alert('Hết mã giảm giá!!!');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8080/addVoucherDetail', null, {
        params: {
          voucherID: voucherID,
          accountID: accountID
        }
      });
      console.log(response.data);
      setSavedVouchers(prev => new Set(prev).add(voucherID)); // Thêm voucherID vào Set
      alert('Lưu voucher thành công!');
    } catch (error) {
      console.error('Lỗi khi lưu voucher:', error);
    }
  };
  
  return (
    <div className="container mt-4">
      <Row>
        {vouchers.map((voucher, index) => {
          const now = new Date();
          const expiryDate = new Date(voucher.han_su_dung);
          const isExpired = expiryDate < now;
  
          return (
            <Col md={6} className="mb-3" key={index}>
              <Card className="voucher-card">
                <Card.Body className="d-flex align-items-start">
                  <div className="voucher-image-wrapper">
                    <img 
                      src={`/images/${voucher.hinh_anh}`} 
                      alt={voucher.tieu_de} 
                      className="voucher-image"
                    />
                  </div>
  
                  <div className="voucher-content">
                    <div className="voucher-title">FREESHIP EXTRA</div>
                    <p className="voucher-discount">Giảm tối đa {voucher.so_tien_giam} VNĐ</p>
                    <p className="voucher-minimum-order">Đơn Tối Thiểu 0₫</p>
                    <p className="voucher-exclusive">Dành riêng cho bạn</p>
                    <p className="voucher-expiry">HSD: {voucher.han_su_dung}</p>
                    <p className="voucher-quantity">Số lượt sử dụng: {voucher.so_luot_SD}</p>
                  </div>
  
                  <div className="voucher-button-wrapper">
                    <Button 
                      variant="outline-success" 
                      className="voucher-button" 
                      onClick={() => handleSave(voucher.voucherID)}
                      disabled={
                        savedVouchers.has(voucher.voucherID)
                      }
                    >
                      {savedVouchers.has(voucher.voucherID) ? 'Đã Lưu' : 'Lưu'}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Voucher;
