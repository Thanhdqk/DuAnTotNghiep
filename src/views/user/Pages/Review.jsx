import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const styles = {
    mainContainer: {
        display: 'flex',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
    },
    sidebar: {
        width: '250px',
        backgroundColor: '#34495e',
        color: '#fff',
        padding: '20px',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
    },
    linkStyle: {
        textDecoration: 'none',
        color: 'white',
    },
    menuStyle: {
        listStyleType: 'none',
        padding: '0',
    },
    buttonStyle: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#2c3e50',
        color: 'white',
        border: 'none',
        textAlign: 'left',
        cursor: 'pointer',
        fontSize: '16px',
        marginBottom: '10px',
        borderRadius: '5px',
        transition: 'background-color 0.3s',
    },
    content: {
        marginLeft: '270px',
        flex: '1',
        padding: '40px',
    },
    reviewContainer: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '30px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    textarea: {
        width: '100%',
        minHeight: '120px',
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        fontSize: '16px',
        marginBottom: '20px',
        boxSizing: 'border-box',
        resize: 'none',
    },
    previewImage: {
        maxWidth: '100%',
        maxHeight: '300px',
        borderRadius: '8px',
        marginBottom: '15px',
        cursor: 'pointer',
        border: '1px solid #ddd',
    },
    starContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    star: {
        cursor: 'pointer',
        fontSize: '36px',
        color: '#f39c12',
        margin: '0 5px',
    },
    button: {
        padding: '12px 20px',
        backgroundColor: '#3498db',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '18px',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#2980b9',
    },
};

const Review = () => {
    const { productId } = useParams();
    const [noiDung, setNoiDung] = useState('');
    const [soSao, setSoSao] = useState(5);
    const [hinhAnh, setHinhAnh] = useState(null);
    const [hinhAnhPreview, setHinhAnhPreview] = useState('');
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setHinhAnh(file);
                setHinhAnhPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleReviewSubmit = async () => {
        try {
            const formData = new FormData();
            if (!userId) {
                alert('Vui lòng đăng nhập trước khi gửi đánh giá.');
                return;
            }

            formData.append('users', userId);
            formData.append('san_phamId', productId);
            formData.append('noi_dung', noiDung);
            formData.append('so_sao', soSao);

            if (hinhAnh) {
                formData.append('hinh_anh', hinhAnh);
            }

            formData.append('ngay_tao', new Date().toISOString().split('T')[0]);

            await axios.post('http://localhost:8080/api/reviews', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Đánh giá của bạn đã được gửi thành công!');
            navigate(-1);
        } catch (error) {
            console.error('Error submitting review:', error.response ? error.response.data : error.message);
            alert('Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại: ' + (error.response ? error.response.data : error.message));
        }
    };

    const handleStarClick = (rating) => {
        setSoSao(rating);
    };

    return (
        <div style={styles.mainContainer}>
            {/* Sidebar Navigation */}
            <aside style={styles.sidebar}>
                <Link to="/" style={styles.linkStyle}>
                    <h3>Quản Lý Cá Nhân</h3>
                </Link>
                <ul style={styles.menuStyle}>
                    {['Thông tin cá nhân', 'Lịch sử đặt hàng', 'Đổi mật khẩu', 'Feedback', 'Yêu Thích', 'Mã giảm giá',
                        "Địa chỉ của bạn",
                        "Ví đã liên kết",].map((item, index) => (
                        <li key={index}>
                            <Link to={`/${item.replace(/ /g, '-').toLowerCase()}?userId=${userId}`} style={styles.linkStyle}>
                                <button style={styles.buttonStyle}>{item}</button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>

            <div style={styles.content}>
                <div style={styles.reviewContainer}>
                    <h2>Viết Đánh Giá</h2>

                    {/* Image Upload and Preview */}
                    <label htmlFor="imageUpload">
                        {hinhAnhPreview ? (
                            <img
                                src={hinhAnhPreview}
                                alt="Preview"
                                style={styles.previewImage}
                            />
                        ) : (
                            <div style={styles.previewImage}>
                                Click to upload image
                            </div>
                        )}
                    </label>
                    <input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />

                    {/* Review Content */}
                    <textarea
                        style={styles.textarea}
                        value={noiDung}
                        onChange={(e) => setNoiDung(e.target.value)}
                        placeholder="Nhập nội dung đánh giá của bạn..."
                    />

                    {/* Star Rating */}
                    <div style={styles.starContainer}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                style={styles.star}
                                onClick={() => handleStarClick(star)}
                            >
                                <span style={{ color: soSao >= star ? '#f39c12' : '#ccc' }}>
                                    ★
                                </span>
                            </span>
                        ))}
                    </div>

                    <button
                        style={styles.button}
                        onClick={handleReviewSubmit}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                    >
                        Gửi Đánh Giá
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Review;
