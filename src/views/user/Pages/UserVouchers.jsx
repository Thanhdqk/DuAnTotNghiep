import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../partials/Sidebar';

const VoucherList = () => {
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (userId) {
            axios
                .get(`http://localhost:8080/api/vouchers/user/${userId}/unused`)
                .then((response) => {
                    setVouchers(response.data); // Chỉ lấy các voucher chưa được sử dụng
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="d-flex vh-100">
            <div className="col-2">
                <Sidebar userId={userId} />
            </div>

            <div className="flex-fill p-4">
                <h2 className="text-center">Mã giảm giá của bạn</h2>
                {vouchers.length > 0 ? (
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mt-4">
                        {vouchers.map((voucher) => (
                            <div className="col" key={voucher.voucherID}>
                                <div className="card h-80 shadow-sm">
                                    <img
                                        src={`http://localhost:8080/images/uploads/${voucher.hinh_anh}`}
                                        alt="Voucher"
                                        className="card-img-top"
                                        style={{
                                            height: '180px',
                                            width: '100%', // Đảm bảo hình ảnh bao phủ toàn bộ chiều rộng của khung chứa
                                            objectFit: 'cover', // Tự động căn chỉnh, giữ tỉ lệ và cắt nếu cần
                                            backgroundColor: '#f8f9fa',
                                        }}
                                    />

                                    <div className="card-body  flex-column">
                                        <h5 className="card-title text-primary">{voucher.so_tien_giam}đ</h5>
                                        <p className="text-danger mb-1">Hạn sử dụng: {voucher.han_su_dung}</p>
                                        <p className="text-muted mb-1">Điều kiện: {voucher.dieu_kien}</p>
                                        <p className="text-success mb-1">Trạng thái: {voucher.hoat_dong}</p>
                                        <p className="text-info mb-0">Số lần sử dụng còn lại: {voucher.so_luong}</p>
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
