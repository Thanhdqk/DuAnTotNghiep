import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
const VoucherList = () => {
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const userId = localStorage.getItem('userId'); // Retrieve userId here

    useEffect(() => {
        if (userId) {
            axios
                .get(`http://localhost:8080/api/vouchers/user/${userId}`)
                .then((response) => {
                    setVouchers(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError('Failed to fetch vouchers: ' + error.message);
                    setLoading(false);
                });
        } else {
            setError('No user ID found in localStorage');
            setLoading(false);
        }
    }, [userId]);

    if (error) return <div>{error}</div>;

    return (
        <div className="d-flex vh-100">
            {/* Sidebar */}
            <div className='col-2'>
                <Sidebar userId={userId} />
            </div>

            {/* Voucher List */}
            <div className="flex-fill p-4">
                <h2>Mã giảm giá của bạn</h2>
                {vouchers.length > 0 ? (
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mt-4">
                        {vouchers.map((voucher) => (
                            <div className="col" key={voucher.voucherID}>
                                <div
                                    className="card shadow-sm text-center"
                                    style={{
                                        maxWidth: '300px', // Độ rộng tối đa
                                        margin: '0 auto', // Căn giữa
                                        overflow: 'hidden',
                                    }}
                                >
                                    <img
                                        src={`http://localhost:8080/images/uploads/${voucher.hinh_anh}`}
                                        alt="Voucher"
                                        className="card-img-top"
                                        style={{
                                            height: '250px', // Chiều cao cố định của ảnh
                                            width: '100%', // Đảm bảo chiều rộng khớp với khung
                                            objectFit: 'contain', // Đảm bảo hình ảnh co dãn mà không bị cắt
                                            backgroundColor: '#f8f9fa', // Màu nền nếu ảnh không phủ hết khung
                                        }}
                                    />

                                    <div className="card-body text-start">
                                        <h5 className="card-title">{voucher.so_tien_giam}đ</h5>
                                        <p className="text-danger mb-1">Ngày hết hạn: {voucher.han_su_dung}</p>
                                        <p className="mb-1">Điều kiện: {voucher.dieu_kien}</p>
                                        <p className="text-success mb-1">Trạng thái: {voucher.hoat_dong}</p>
                                        <p className="text-primary mb-0">Số lần sử dụng còn lại: {voucher.so_luong}</p>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-muted mt-4">Không có mã giảm giá nào.</p>
                )}
            </div>
        </div>
    );
};

export default VoucherList;
