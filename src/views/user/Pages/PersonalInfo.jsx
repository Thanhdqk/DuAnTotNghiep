import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PersonalInfo = () => {
  const [form, setForm] = useState({
    accountID: '',
    hovaten: '',
    so_dien_thoai: '',
    dia_chi: '',
    hinh_anh: null,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const accountID = new URLSearchParams(window.location.search).get('userId');
    if (accountID) {
      setForm(prev => ({ ...prev, accountID }));
      setUserId(accountID);
      fetchUserData(accountID);
    } else {
      console.error('No accountID found in query parameters');
    }
  }, []);

  const fetchUserData = async (accountID) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/auth/users/${accountID}`);
      if (!response.ok) throw new Error('Failed to fetch user data');
      const data = await response.json();

      setForm(prev => ({
        ...prev,
        hovaten: data.hovaten || '',
        so_dien_thoai: data.so_dien_thoai || '',
        dia_chi: data.dia_chi || '',
        hinh_anh: data.hinh_anh || '',
      }));

      // Cập nhật preview image từ dữ liệu người dùng đã fetch
      if (data.hinh_anh) {
        setPreviewImage(`http://localhost:8080/images/uploads/${data.hinh_anh}`);
      }

      const addressResponse = await fetch(`http://localhost:8080/auth/users/${accountID}/address`);
      if (addressResponse.ok) {
        const addressData = await addressResponse.json();
        setForm(prev => ({ ...prev, dia_chi: addressData?.dia_chi || '' }));
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
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm(prev => ({ ...prev, hinh_anh: file })); // Lưu cả file để gửi lên backend
      setPreviewImage(URL.createObjectURL(file)); // Hiển thị hình ảnh trước
    } else {
      setForm(prev => ({ ...prev, hinh_anh: null }));
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!form.hovaten.trim() || !form.so_dien_thoai.trim() || !form.dia_chi.trim()) {
      setErrorMessage('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    const phoneRegex = /^\d{10}$/; // Điều chỉnh theo định dạng số điện thoại mong muốn
    if (!phoneRegex.test(form.so_dien_thoai)) {
      setErrorMessage('Số điện thoại không hợp lệ. Vui lòng nhập lại.');
      return;
    }

    try {
      // Upload image if exists
      if (form.hinh_anh) {
        const formData = new FormData();
        formData.append('hinh_anh', form.hinh_anh); // Thêm file vào FormData

        const imageUploadResponse = await fetch(`http://localhost:8080/auth/users/${form.accountID}/upload`, {
          method: 'POST',
          body: formData,
        });

        if (!imageUploadResponse.ok) {
          const result = await imageUploadResponse.json();
          alert('Lỗi: ' + result.message);
          return;
        }
      }

      // Update user information
      const userData = {
        accountID: form.accountID,
        hovaten: form.hovaten,
        so_dien_thoai: form.so_dien_thoai,
        dia_chi: form.dia_chi,
        hinh_anh: form.hinh_anh ? form.hinh_anh.name : '', // Chỉ lưu tên file để cập nhật
      };

      const userUpdateResponse = await fetch(`http://localhost:8080/auth/users/${form.accountID}/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!userUpdateResponse.ok) {
        const result = await userUpdateResponse.json();
        alert('Lỗi: ' + result.message);
        return;
      }

      alert('Thông tin đã được lưu thành công!');

      // Làm mới dữ liệu người dùng để phản ánh thay đổi
      fetchUserData(form.accountID);

      // Nếu có hình ảnh, cập nhật lại preview image
      if (form.hinh_anh) {
        setPreviewImage(`http://localhost:8080/images/uploads/${form.hinh_anh.name}`);
      }

    } catch (error) {
      alert('Có lỗi xảy ra trong quá trình lưu thông tin');
      console.error('Error:', error);
    }
  };
  if (isLoading) return <div style={loadingStyle}>Loading...</div>;

  return (
    <div style={containerStyle}>
      <aside style={sidebarStyle}>
        <Link to="/" style={linkStyle}>
          <h3>Quản Lý Cá Nhân</h3>
        </Link>
        <ul style={menuStyle}>
          {['Thông tin cá nhân', 'Lịch sử đặt hàng', 'Đổi mật khẩu', 'Feedback', 'Yêu Thích', 'Mã giảm giá'].map((item, index) => (
            <li key={index}>
              <Link to={`/${item.replace(/ /g, '-').toLowerCase()}?userId=${userId}`} style={linkStyle}>
                <button style={buttonStyle}>{item}</button>
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      <main style={mainContentStyle}>
        <form onSubmit={handleSubmit} style={formStyle} encType="multipart/form-data">
          <h2 style={formHeaderStyle}>Thông tin cá nhân</h2>
          {errorMessage && <p style={errorMessageStyle}>{errorMessage}</p>}
          <div style={gridStyle}>
            {['hovaten', 'so_dien_thoai', 'dia_chi'].map((field, index) => (
              <div key={index} style={gridItemStyle}>
                <label htmlFor={field} style={labelStyle}>
                  {field === 'hovaten' ? 'Họ tên' : field === 'so_dien_thoai' ? 'Điện thoại' : 'Địa chỉ'}
                </label>
                <input
                  type="text"
                  name={field}
                  id={field}
                  value={form[field]}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>
            ))}
            <div style={gridItemStyle}>
              <label htmlFor="accountID" style={labelStyle}>Email</label>
              <input
                type="email"
                name="accountID"
                id="accountID"
                value={form.accountID}
                style={{ ...inputStyle, backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                readOnly
                aria-readonly="true"
              />
            </div>
            <div style={gridItemStyle}>
              <label style={labelStyle}>Hình ảnh</label>
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  style={imagePreviewStyle}
                  onClick={() => document.getElementById('hinh_anh').click()} // Mở input file khi nhấn vào hình
                />
              ) : (
                <div style={verticalImageUploadContainerStyle} onClick={() => document.getElementById('hinh_anh').click()}>
                  <div style={placeholderStyle}>Nhấn để chọn hình ảnh</div>
                </div>
              )}
              <input
                type="file"
                name="hinh_anh"
                id="hinh_anh"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }} // Ẩn input file mặc định
              />
            </div>
          </div>
          <button type="submit" style={submitButtonStyle}>Lưu thông tin</button>
        </form>
      </main>
    </div>
  );
};

// CSS styles as objects
const containerStyle = {
  display: 'flex',
  height: '100vh',
  fontFamily: 'Arial, sans-serif',
};

const sidebarStyle = {
  width: '250px',
  backgroundColor: '#2c3e50',
  color: '#fff',
  padding: '20px',
  boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
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
  width: '100%',
  padding: '12px',
  backgroundColor: '#34495e',
  color: 'white',
  border: 'none',
  textAlign: 'left',
  cursor: 'pointer',
  fontSize: '16px',
  marginBottom: '10px',
  borderRadius: '5px',
  transition: 'background-color 0.3s',
};

const mainContentStyle = {
  flex: 1,
  padding: '40px',
  backgroundColor: '#ecf0f1',
};

const formStyle = {
  backgroundColor: 'white',
  borderRadius: '5px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  padding: '20px',
};

const formHeaderStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '20px',
  color: '#34495e',
};

const errorMessageStyle = {
  color: 'red',
  marginBottom: '10px',
};

const gridStyle1 = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '15px',
};

const gridItemStyle1 = {
  display: 'flex',
  flexDirection: 'column',
};
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)', // Hai cột
  gap: '20px', // Khoảng cách giữa các ô
  marginBottom: '20px', // Khoảng cách dưới lưới
};

const gridItemStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start', // Căn chỉnh nội dung ở đầu
  padding: '10px', // Thêm padding cho ô
  // border: '1px solid #bdc3c7', // Thêm viền cho ô
  borderRadius: '5px', // Bo góc cho ô
  backgroundColor: '#fff', // Màu nền cho ô
};

const labelStyle = {
  marginBottom: '5px',
  fontWeight: 'bold',
};

const inputStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #bdc3c7',
  fontSize: '16px',
  outline: 'none',
  transition: 'border 0.3s',
};

const verticalImageUploadContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  height: '200px',
  border: '2px dashed #bdc3c7',
  borderRadius: '5px',
  justifyContent: 'center',
  backgroundColor: '#ecf0f1',
  height: '250px', // Increased height for a vertical rectangle
  width: '250px', // Full width to match form layout
};

const imagePreviewStyle = {
  maxWidth: '320px',
  maxHeight: '240px',
  borderRadius: '5px',
};

const placeholderStyle = {
  color: '#bdc3c7',
  textAlign: 'center',
};

const submitButtonStyle = {
  marginTop: '20px',
  padding: '12px',
  width: '100%',
  backgroundColor: '#27ae60',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontSize: '18px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const loadingStyle = {
  textAlign: 'center',
  marginTop: '20%',
  fontSize: '20px',
  color: '#34495e',
};

export default PersonalInfo;
