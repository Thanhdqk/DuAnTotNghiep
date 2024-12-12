import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../partials/Sidebar';

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
        <div className="row vh-100 m-0">
            {/* Sidebar */}
            <div className="col-2 bg-dark text-white p-0">
                <Sidebar userId={userId} />
            </div>

            {/* Main Content */}
            <div className="col-10 d-flex justify-content-center align-items-center p-4">
                <div className="card shadow p-4" style={{ maxWidth: '600px', width: '100%' }}>
                    <h2 className="text-center mb-4">Viết Đánh Giá</h2>

                    {/* Image Upload and Preview */}
                    <label htmlFor="imageUpload" className="d-block text-center mb-3">
                        {hinhAnhPreview ? (
                            <img
                                src={hinhAnhPreview}
                                alt="Preview"
                                className="img-thumbnail"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '300px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                }}
                            />
                        ) : (
                            <div
                                className="border rounded d-flex align-items-center justify-content-center"
                                style={{
                                    height: '150px',
                                    cursor: 'pointer',
                                    border: '1px solid #ddd',
                                }}
                            >
                                Nhấn để tải ảnh lên
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
                        className="form-control mb-3"
                        style={{ minHeight: '120px' }}
                        value={noiDung}
                        onChange={(e) => setNoiDung(e.target.value)}
                        placeholder="Nhập nội dung đánh giá của bạn..."
                    ></textarea>

                    {/* Star Rating */}
                    <div className="d-flex justify-content-center mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                style={{
                                    fontSize: '36px',
                                    color: soSao >= star ? '#f39c12' : '#ccc',
                                    cursor: 'pointer',
                                    margin: '0 5px',
                                }}
                                onClick={() => handleStarClick(star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>

                    <button
                        className="btn btn-primary w-100"
                        onClick={handleReviewSubmit}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2980b9')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3498db')}
                    >
                        Gửi Đánh Giá
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Review;
