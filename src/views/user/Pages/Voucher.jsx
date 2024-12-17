import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';


const Voucher = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accountID, setAccountID] = useState(localStorage.getItem('account_id'));
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
  try {
    const response = await axios.post('http://localhost:8080/addVoucherDetail', null, {
      params: {
        voucherID: voucherID,
        accountID: accountID
      }
    });
    console.log(response.data); 
    setSavedVouchers(prev => new Set(prev).add(voucherID)); // Thêm voucherID vào Set
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
                    src={`/images/${voucher.hinh_anh}`} 
                    alt={voucher.tieu_de} // Sử dụng tiêu đề voucher cho alt
                    className="voucher-image"
                  />
                </div>

                <div className="voucher-content">
                  <div className="voucher-title">FREESHIP EXTRA</div>
                  <p className="voucher-discount">Giảm tối đa {voucher.so_tien_giam}</p>
                  <p className="voucher-minimum-order">Đơn Tối Thiểu 0₫</p>
                  <p className="voucher-exclusive">Dành riêng cho bạn</p>
                  <p className="voucher-expiry">
                    HSD: {voucher.han_su_dung} 
                  </p>
                  <p className='voucher-quantity'>Số lượt sử dụng: {voucher.so_luot_SD}</p>
                </div>

                <div className="voucher-button-wrapper">
                  <Button 
                    variant="outline-success" 
                    className="voucher-button" 
                    onClick={() => handleSave(voucher.voucherID)}
                    disabled={savedVouchers.has(voucher.voucherID)} // Vô hiệu hóa nếu voucher đã lưu
                  >
                    {savedVouchers.has(voucher.voucherID) ? 'Đã Lưu' : 'Lưu'}
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
