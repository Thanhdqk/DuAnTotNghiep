import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../partials/Sidebar';

const PasswordChangeForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!currentPassword) {
      setMessage('Bạn phải nhập mật khẩu hiện tại.');
      return;
    }

    if (newPassword.length < 6) {
      setMessage('Mật khẩu mới phải có ít nhất 6 ký tự.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setMessage('Mật khẩu mới không khớp.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8080/auth/users/${userId}/changePassword`, {
        currentPassword,
        newPassword,
      });
      setMessage(response.data);
    } catch (error) {
      setMessage(error.response?.data || 'Không thể thay đổi mật khẩu.');
    }
  };

  return (
    <div className="d-flex vh-100">
      <div className="col-2">
        <Sidebar userId={userId} />
      </div>

      <main className="flex-grow-1 d-flex justify-content-center align-items-center bg-light">
        <form
          onSubmit={handlePasswordChange}
          className="bg-white rounded shadow p-4"
          style={{ width: '100%', maxWidth: '400px' }}
        >
          <h2 className="text-center text-primary mb-4">Đổi mật khẩu</h2>
          {message && <p className="text-danger text-center">{message}</p>}

          {/* Nhập mật khẩu hiện tại */}
          <div className="mb-3">
            <label className="form-label">Mật khẩu hiện tại:</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Ẩn' : 'Hiển thị'}
              </button>
            </div>
          </div>

          {/* Nhập mật khẩu mới */}
          <div className="mb-3">
            <label className="form-label">Mật khẩu mới:</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={!currentPassword} // Chỉ cho phép nhập khi có mật khẩu hiện tại
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                disabled={!currentPassword} // Chỉ cho phép hiển thị/ẩn mật khẩu khi có mật khẩu hiện tại
              >
                {showPassword ? 'Ẩn' : 'Hiển thị'}
              </button>
            </div>
          </div>

          {/* Xác nhận mật khẩu mới */}
          <div className="mb-3">
            <label className="form-label">Xác nhận mật khẩu mới:</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                disabled={!currentPassword} // Chỉ cho phép nhập khi có mật khẩu hiện tại
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                disabled={!currentPassword} // Chỉ cho phép hiển thị/ẩn mật khẩu khi có mật khẩu hiện tại
              >
                {showPassword ? 'Ẩn' : 'Hiển thị'}
              </button>
            </div>
          </div>

          {/* Nút lưu mật khẩu */}
          <button type="submit" className="btn btn-success w-100">
            Lưu mật khẩu
          </button>
        </form>
      </main>
    </div>
  );
};

export default PasswordChangeForm;
