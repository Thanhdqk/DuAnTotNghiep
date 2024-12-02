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
    const fetchAllVouchers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/loadAllVouchers', {
          params: { accountID: accountID }
        });
        setVouchers(response.data);
      } catch (error) {
        console.error('Error loading vouchers:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAllVouchers();
  }, [accountID]);  

  const handleSave = async (voucherID) => {
    const selectedVoucher = vouchers.find(voucher => voucher.voucherID === voucherID);
  
    if (!selectedVoucher || selectedVoucher.saved) {
      alert('Voucher đã được lưu trước đó!');
      return;
    }

    // Check if the voucher is expired
  const expiryDate = new Date(selectedVoucher.han_su_dung);
  const today = new Date();

  if (expiryDate < today) {
    alert('Voucher này đã hết hạn!');
    return;
  }

    if(selectedVoucher.so_luong === 0){
      alert('Đã hết số lượng voucher');
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
  
      // Cập nhật trạng thái 'saved' của voucher
      setVouchers(vouchers.map(voucher =>
        voucher.voucherID === voucherID ? { ...voucher, saved: true, so_luong: voucher.so_luong - 1  } : voucher
      ));
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
                    <p className="voucher-quantity">Số lượng: {voucher.so_luong}</p>
                  </div>
  
                  <div className="voucher-button-wrapper">
                  <Button 
                    variant={voucher.saved ? "outline-secondary" : "outline-success"} 
                    className="voucher-button" 
                    onClick={() => handleSave(voucher.voucherID)}
                    disabled={voucher.saved}
                  >
                    {voucher.saved ? 'Đã Lưu' : 'Lưu'}
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
