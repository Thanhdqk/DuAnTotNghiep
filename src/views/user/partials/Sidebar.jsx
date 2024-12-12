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
    <aside className="bg-dark text-white p-4 shadow vh-100">
      <Link to="/" className="text-decoration-none text-white">
        <h3>Quản Lý Cá Nhân</h3>
      </Link>
      <ul className="list-unstyled mt-3">
        {menuItems.map((item, index) => (
          <li key={index} className="mb-2">
            <Link
              to={item.path} // Không truyền userId qua URL
              className={`text-decoration-none ${
                location.pathname === item.path ? 'text-primary' : 'text-white'
              }`}
            >
              <button
                className={`btn w-100 text-start ${
                  location.pathname === item.path ? 'btn-primary' : 'btn-secondary'
                }`}
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
