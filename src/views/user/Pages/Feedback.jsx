import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Image, Tabs } from 'antd'; // Import Ant Design Tabs and Image component
const { TabPane } = Tabs;

const FeedbackForm = () => {
    const [loaiYeuCau, setLoaiYeuCau] = useState('');
    const [noiDung, setNoiDung] = useState('');
    const [hinhAnh, setHinhAnh] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); // For previewing selected image
    const [trangThai, setTrangThai] = useState('đã gửi');
    const [error, setError] = useState('');
    const [feedbackHistory, setFeedbackHistory] = useState([]);
    const userId = localStorage.getItem('userId');

    const fetchFeedbackHistory = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/feedback/user/${userId}`);
            setFeedbackHistory(response.data);
        } catch (err) {
            setError(err.response ? err.response.data : 'An error occurred while fetching feedback history');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setHinhAnh(file);
        setImagePreview(URL.createObjectURL(file)); // Display preview of the selected image
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        let imagePath = '';

        if (hinhAnh) {
            const formData = new FormData();
            formData.append('file', hinhAnh);

            try {
                const uploadResponse = await axios.post('http://localhost:8080/api/feedback/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                imagePath = uploadResponse.data;
            } catch (err) {
                setError(err.response ? err.response.data : 'An error occurred while uploading the image');
                return;
            }
        }

        const feedbackData = {
            loai_yeu_cau: loaiYeuCau,
            noi_dung: noiDung,
            hinh_anh: imagePath,
            trang_thai: trangThai,
            userId: userId,
        };

        try {
            const response = await axios.post('http://localhost:8080/api/feedback', feedbackData);
            setLoaiYeuCau('');
            setNoiDung('');
            setHinhAnh(null);
            setImagePreview(null); // Clear preview
            setTrangThai('đã gửi');
            alert('Feedback submitted successfully!');
        } catch (err) {
            setError(err.response ? err.response.data : 'An error occurred while saving feedback');
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Không xác định';
        return dateString.substring(0, 10);
    };

    return (
        <div style={containerStyle}>
            <aside style={sidebarStyle}>
                <Link to="/" style={linkStyle}>
                    <h3>Quản Lý Cá Nhân</h3>
                </Link>
                <ul style={menuStyle}>
                    {['Thông tin cá nhân', 'Lịch sử đặt hàng', 'Thẻ thanh toán', 'Phương thức thanh toán', 'Đổi mật khẩu'].map((item, index) => (
                        <li key={index}>
                            <Link to={`/${item.replace(/ /g, '-').toLowerCase()}?userId=${userId}`} style={linkStyle}>
                                <button style={buttonStyle}>{item}</button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>

            <main style={mainContentStyle}>
                <Tabs defaultActiveKey="1" onChange={(key) => key === "2" && fetchFeedbackHistory()} style={tabsStyle}>
                    <TabPane tab="Nhập Phản Hồi" key="1">
                        <form onSubmit={handleSubmit} style={formStyle}>
                            <div style={inputGroupStyle}>
                                <label style={labelStyle}>Loại Yêu Cầu:</label>
                                <input
                                    type="text"
                                    value={loaiYeuCau}
                                    onChange={(e) => setLoaiYeuCau(e.target.value)}
                                    required
                                    style={inputStyle}
                                />
                            </div>
                            <div style={inputGroupStyle}>
                                <label style={labelStyle}>Nội Dung:</label>
                                <textarea
                                    value={noiDung}
                                    onChange={(e) => setNoiDung(e.target.value)}
                                    required
                                    style={textareaStyle}
                                />
                            </div>
                            <div style={inputGroupStyle}>
                                <label style={labelStyle}>Hình Ảnh:</label>
                                <div style={gridItemStyle}>
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
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

                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <button type="submit" style={submitButtonStyle}>Gửi Phản Hồi</button>
                        </form>
                    </TabPane>
                    <TabPane tab="Lịch Sử Phản Hồi" key="2">
                        <h2>Lịch Sử Phản Hồi</h2>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <ul style={historyListStyle}>
                            {feedbackHistory.map(feedback => (
                                <li key={feedback.feedbackID} style={historyItemStyle}>
                                    <strong>Ngày Tạo:</strong> {formatDate(feedback.ngayTao)}<br />
                                    <strong>Loại Yêu Cầu:</strong> {feedback.loai_yeu_cau}<br />
                                    <strong>Nội Dung:</strong> {feedback.noi_dung}<br />
                                    {feedback.hinh_anh && (
                                        <div style={{ marginTop: '10px' }}>
                                            <strong>Hình Ảnh:</strong><br />
                                            <Image.PreviewGroup>
                                                <Image
                                                    width={200}
                                                    src={`http://localhost:8080/images/uploads/${feedback.hinh_anh}`}
                                                    style={{ cursor: 'pointer', marginRight: '10px' }}
                                                />
                                            </Image.PreviewGroup>
                                        </div>
                                    )}
                                    <strong>Trạng thái:</strong> {feedback.trang_thai}
                                </li>
                            ))}
                        </ul>
                    </TabPane>
                </Tabs>
            </main>
        </div>
    );
};

// Styles (improved)
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
    borderRadius: '4px',
    marginBottom: '10px',
    transition: 'background-color 0.3s',
};

const buttonHoverStyle = {
    backgroundColor: '#2c3e50',
};

const mainContentStyle = {
    marginLeft: '260px',
    padding: '20px',
    width: 'calc(100% - 260px)',
};

const tabsStyle = {
    backgroundColor: '#fff',
};

const formStyle = {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
};

const inputGroupStyle = {
    marginBottom: '15px',
};

const labelStyle = {
    fontWeight: 'bold',
    display: 'block',
    marginBottom: '5px',
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box',
};
const gridItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    borderRadius: '8px',
    boxSizing: 'border-box',
};

const textareaStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box',
    height: '120px',
};

const submitButtonStyle = {
    backgroundColor: '#27ae60',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    fontSize: '16px',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
};

const historyListStyle = {
    listStyleType: 'none',
    padding: '0',
    fontSize: '16px',
};

const historyItemStyle = {
    background: '#f9f9f9',
    marginBottom: '15px',
    padding: '15px',
    borderRadius: '6px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s',
};

const historyItemHoverStyle = {
    backgroundColor: '#f1f1f1',
};

const imagePreviewStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '8px',
    cursor: 'pointer',
};

const placeholderStyle = {
    color: '#888',
    textAlign: 'center',
    fontSize: '14px',
};

const verticalImageUploadContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100px',
    width: '100px',
    border: '2px dashed #ccc',
    borderRadius: '8px',
    cursor: 'pointer',
};

export default FeedbackForm;
