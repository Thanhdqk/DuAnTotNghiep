import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { label: 'Thông tin cá nhân', path: '/personal-info' },
    { label: 'Lịch sử đặt hàng', path: '/order-history' },
    { label: 'Đổi mật khẩu', path: '/change-password' },
    { label: 'Feedback', path: '/feedback' },
    { label: 'Yêu Thích', path: '/favorites' },
    { label: 'Mã giảm giá', path: '/discounts' },
    { label: 'Địa chỉ của bạn', path: '/addresses' },
    { label: 'Ví đã liên kết', path: '/linked-wallets' },
  ];

  return (
    <aside
      style={{
        backgroundColor: '#343a40', // Màu nền sidebar
        color: 'white', // Màu chữ
        padding: '16px', // Khoảng cách bên trong
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Bóng đổ
        minHeight: '100vh', // Đảm bảo chiều cao tối thiểu là toàn màn hình
        display: 'flex', // Đảm bảo sidebar không co lại
        flexDirection: 'column', // Căn nội dung theo cột
      }}
    >
      <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
        <h3>Quản Lý Cá Nhân</h3>
      </Link>
      <ul style={{ listStyleType: 'none', marginTop: '16px', padding: 0 }}>
        {menuItems.map((item, index) => (
          <li key={index} style={{ marginBottom: '8px' }}>
            <Link
              to={item.path}
              style={{
                textDecoration: 'none',
              }}
            >
              <button
                style={{
                  width: '100%',
                  textAlign: 'start',
                  backgroundColor: location.pathname === item.path ? '#007bff' : '#6c757d', // Thay đổi màu theo trạng thái
                  color: 'white',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                {item.label}
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
