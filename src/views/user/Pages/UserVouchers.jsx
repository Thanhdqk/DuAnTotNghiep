import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div style={containerStyle}>
            {/* Sidebar */}
            <aside style={sidebarStyle}>
                <Link to="/" style={linkStyle}>
                    <h3>Quản Lý Cá Nhân</h3>
                </Link>
                <ul style={menuStyle}>
                    {['Thông tin cá nhân', 'Lịch sử đặt hàng', 'Đổi mật khẩu', 'Feedback', 'Yêu Thích', 'Mã giảm giá'].map((item, index) => (
                        <li key={index}>
                            <Link to={`/${item.replace(/ /g, '-').toLowerCase()}?userId=${userId}`} style={linkStyle}>
                                <button
                                    style={buttonStyle}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
                                >
                                    {item}
                                </button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Voucher List */}
            <div style={voucherListContainerStyle}>
                <h2>Mã giảm giá của bạn</h2>
                {vouchers.length > 0 ? (
                    <div className="voucher-cards">
                        {vouchers.map((voucher) => (
                            <div className="voucher-card" key={voucher.voucherID}>
                                <img
                                    src={`http://localhost:8080/images/uploads/${voucher.hinh_anh}`}
                                    alt="Voucher"
                                    className="voucher-image"
                                />
                                <div className="voucher-info">
                                    <h3>{voucher.so_tien_giam}</h3>
                                    <p className="expiry-date">Ngày hết hạn: {voucher.han_su_dung}</p>
                                    <p className="conditions">Điều kiện: {voucher.dieu_kien}</p>
                                    <p className="status">Trạng thái: {voucher.hoat_dong}</p>
                                    <p className="usage-left">Số lần sử dụng còn lại: {voucher.so_luong}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-vouchers">No vouchers available.</p>
                )}
            </div>
            <style>{`
    .voucher-list-container {
        padding: 20px;
        text-align: center;
        font-family: 'Arial', sans-serif;
    }

    .voucher-cards {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
        margin-top: 20px;
    }

    .voucher-card {
        background-color: transparent; /* Bỏ màu nền */
        border: none; /* Bỏ khung viền */
        border-radius: 0; /* Bỏ bo tròn góc */
        overflow: hidden; 
        transition: transform 0.3s ease-in-out;
    }

    .voucher-card:hover {
        transform: translateY(0); /* Không có hiệu ứng hover */
    }

    .voucher-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }

    .voucher-info {
        padding: 10px;
        text-align: left;
    }

    .voucher-info h3 {
        margin: 10px 0;
        font-size: 1.2em;
        font-weight: bold;
        color: #333;
    }

    .voucher-info p {
        margin: 5px 0;
        color: #555;
    }

    .expiry-date,
    .conditions,
    .status,
    .usage-left {
        font-size: 0.9em;
    }

    .expiry-date {
        color: #f44336;
    }

    .status {
        font-weight: bold;
        color: #4caf50;
    }

    .usage-left {
        font-weight: bold;
        color: #2196f3;
    }

    .no-vouchers {
        font-size: 1.2em;
        color: #888;
    }
`}</style>

        </div>
    );
};

// Styles
const containerStyle = {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
};

const sidebarStyle = {
    width: '250px',
    background: 'linear-gradient(135deg, #2c3e50, #34495e)',
    color: '#fff',
    padding: '20px',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    height: '100%',
    overflowY: 'auto',
};

const linkStyle = {
    textDecoration: 'none',
    color: 'white',
};

const menuStyle = {
    listStyleType: 'none',
    padding: '0',
};

const buttonStyle = {
    backgroundColor: '#34495e',
    border: 'none',
    color: 'white',
    width: '100%',
    padding: '12px',
    textAlign: 'left',
    fontSize: '16px',
    borderRadius: '4px',
    marginBottom: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
};

const buttonHoverStyle = {
    backgroundColor: '#2c3e50',
};

const voucherListContainerStyle = {
    marginLeft: '270px',
    padding: '20px',
    width: 'calc(100% - 270px)',
};

export default VoucherList;
