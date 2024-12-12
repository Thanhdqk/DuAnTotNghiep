import React, { useState, useEffect } from 'react';
import Sidebar from '../partials/Sidebar';

const PersonalInfo = () => {
  const [form, setForm] = useState({
    accountID: '',
    hovaten: '',
    so_dien_thoai: '',
    hinh_anh: null,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Lấy userId từ localStorage
    const accountID = localStorage.getItem('userId');
    if (accountID) {
      setForm((prev) => ({ ...prev, accountID }));
      setUserId(accountID);
      fetchUserData(accountID);
    } else {
      console.error('No userId found in localStorage');
    }
  }, []);

  const fetchUserData = async (accountID) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/auth/users/${accountID}`);
      if (!response.ok) throw new Error('Failed to fetch user data');
      const data = await response.json();

      setForm((prev) => ({
        ...prev,
        hovaten: data.hovaten || '',
        so_dien_thoai: data.so_dien_thoai || '',
        hinh_anh: data.hinh_anh || '',
      }));

      if (data.hinh_anh) {
        setPreviewImage(`http://localhost:8080/images/uploads/${data.hinh_anh}`);
      }
    } catch (error) {
      alert('Error loading user data');
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, hinh_anh: file }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setForm((prev) => ({ ...prev, hinh_anh: null }));
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!form.hovaten.trim() || !form.so_dien_thoai.trim()) {
      setErrorMessage('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(form.so_dien_thoai)) {
      setErrorMessage('Số điện thoại không hợp lệ. Vui lòng nhập lại.');
      return;
    }

    try {
      let hinhAnhName = form.hinh_anh ? form.hinh_anh.name : form.hinh_anh;

      if (form.hinh_anh instanceof File) {
        const formData = new FormData();
        formData.append('hinh_anh', form.hinh_anh);

        const imageUploadResponse = await fetch(
          `http://localhost:8080/auth/users/${form.accountID}/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!imageUploadResponse.ok) {
          const result = await imageUploadResponse.json();
          alert('Lỗi: ' + result.message);
          return;
        }

        hinhAnhName = form.hinh_anh.name;
      }

      const userData = {
        accountID: form.accountID,
        hovaten: form.hovaten,
        so_dien_thoai: form.so_dien_thoai,
        hinh_anh: hinhAnhName,
      };

      const userUpdateResponse = await fetch(
        `http://localhost:8080/auth/users/${form.accountID}/update`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        }
      );

      if (!userUpdateResponse.ok) {
        const result = await userUpdateResponse.json();
        alert('Lỗi: ' + result.message);
        return;
      }

      alert('Thông tin đã được lưu thành công!');
      fetchUserData(form.accountID);

      if (hinhAnhName) {
        setPreviewImage(`http://localhost:8080/images/uploads/${hinhAnhName}`);
      }
    } catch (error) {
      alert('Có lỗi xảy ra trong quá trình lưu thông tin');
      console.error('Error:', error);
    }
  };

  return (
    <div className="row vh-100 m-0">
      <div className="col-2 bg-dark text-white p-0">
        <Sidebar userId={userId} />
      </div>

      <main className="col-10 bg-light d-flex justify-content-center align-items-center">
        {isLoading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div className="bg-white rounded shadow p-4" style={{ width: '100%', maxWidth: '800px' }}>
            <h2 className="text-center text-primary mb-4">Thông tin cá nhân</h2>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Phần hình ảnh */}
              <div className="text-center mb-4">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="img-thumbnail"
                    style={{
                      cursor: 'pointer',
                      width: '200px',
                      height: '200px',
                      objectFit: 'cover',
                    }}
                    onClick={() => document.getElementById('hinh_anh').click()}
                  />
                ) : (
                  <div
                    className="border border-dashed rounded p-3 text-muted"
                    style={{
                      cursor: 'pointer',
                      width: '200px',
                      height: '200px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onClick={() => document.getElementById('hinh_anh').click()}
                  >
                    Nhấn để chọn hình ảnh
                  </div>
                )}
                <input
                  type="file"
                  className="d-none"
                  id="hinh_anh"
                  name="hinh_anh"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              {/* Phần thông tin */}
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Họ tên</label>
                  <input
                    type="text"
                    className="form-control"
                    name="hovaten"
                    value={form.hovaten}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Điện thoại</label>
                  <input
                    type="text"
                    className="form-control"
                    name="so_dien_thoai"
                    value={form.so_dien_thoai}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="accountID"
                    value={form.accountID}
                    readOnly
                  />
                </div>
              </div>

              {/* Nút lưu thông tin */}
              <button type="submit" className="btn btn-success w-100 mt-4">
                Lưu thông tin
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default PersonalInfo;
