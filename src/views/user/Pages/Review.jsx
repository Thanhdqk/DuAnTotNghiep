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
        backgroundColor: '#2c3e50',
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
        backgroundColor: '#34495e',
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
    },
    container: {
        padding: '40px',
        maxWidth: '500px',
        margin: '0 auto',
        textAlign: 'center',
        border: '1px solid #ccc',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    textarea: {
        width: '100%',
        minHeight: '100px',
        margin: '10px 0',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
        boxSizing: 'border-box',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#34495e',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#2c3e50',
    },
    previewImage: {
        maxWidth: '100%',
        maxHeight: '300px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ccc',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        cursor: 'pointer',  // Makes the image clickable
    },
    starContainer: {
        display: 'flex',
        justifyContent: 'center',
        margin: '10px 0',
    },
    star: {
        cursor: 'pointer',
        fontSize: '32px',
        color: '#ccc',
        margin: '0 5px',
    },
};

const Review = () => {
    const { productId } = useParams();
    const [noiDung, setNoiDung] = useState('');
    const [soSao, setSoSao] = useState(0);
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
                    {['Thông tin cá nhân', 'Lịch sử đặt hàng', 'Thẻ thanh toán', 'Phương thức thanh toán', 'Đổi mật khẩu'].map((item, index) => (
                        <li key={index}>
                            <Link to={`/${item.replace(/ /g, '-').toLowerCase()}?userId=${userId}`} style={styles.linkStyle}>
                                <button style={styles.buttonStyle}>{item}</button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>

            <div style={styles.content}>
                <div style={styles.container}>
                    <h2>Viết Đánh Giá</h2>

                    {/* Image Upload and Preview (moved above the textarea) */}
                    <label htmlFor="imageUpload">
                        {hinhAnhPreview ? (
                            <img
                                src={hinhAnhPreview}
                                alt="Preview"
                                style={styles.previewImage}
                            />
                        ) : (
                            <div style={{ ...styles.previewImage, padding: '10px', color: '#888' }}>
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
