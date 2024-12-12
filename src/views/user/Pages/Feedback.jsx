import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Image, Tabs } from 'antd'; // Ant Design Tabs and Image component
import Sidebar from '../partials/Sidebar';
const { TabPane } = Tabs;
const FeedbackForm = () => {
    const [loaiYeuCau, setLoaiYeuCau] = useState('');
    const [noiDung, setNoiDung] = useState('');
    const [hinhAnh, setHinhAnh] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
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
        setImagePreview(URL.createObjectURL(file));
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
                    headers: { 'Content-Type': 'multipart/form-data' },
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
            await axios.post('http://localhost:8080/api/feedback', feedbackData);
            setLoaiYeuCau('');
            setNoiDung('');
            setHinhAnh(null);
            setImagePreview(null);
            setTrangThai('đã gửi');
            alert('Feedback submitted successfully!');
        } catch (err) {
            setError(err.response ? err.response.data : 'An error occurred while saving feedback');
        }
    };

    const formatDate = (dateString) => (dateString ? dateString.substring(0, 10) : 'Không xác định');

    return (
        <div className="d-flex vh-100">
            <div className='col-2'>
                <Sidebar userId={userId} />
            </div>

            <main className="flex-fill p-4">
                <Tabs defaultActiveKey="1" onChange={(key) => key === '2' && fetchFeedbackHistory()}>
                    <TabPane tab="Nhập Phản Hồi" key="1">
                        <form className="card p-4 shadow-sm" onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Loại Yêu Cầu:</label>
                                <input
                                    type="text"
                                    value={loaiYeuCau}
                                    onChange={(e) => setLoaiYeuCau(e.target.value)}
                                    required
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Nội Dung:</label>
                                <textarea
                                    value={noiDung}
                                    onChange={(e) => setNoiDung(e.target.value)}
                                    required
                                    className="form-control"
                                    rows="4"
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Hình Ảnh:</label>
                                <div className="d-flex justify-content-center align-items-center border rounded" style={{ height: '100px', cursor: 'pointer' }} onClick={() => document.getElementById('hinh_anh').click()}>
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                                    ) : (
                                        <span className="text-muted">Nhấn để chọn hình ảnh</span>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    id="hinh_anh"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />
                            </div>
                            {error && <p className="text-danger">{error}</p>}
                            <button type="submit" className="btn btn-success w-100">Gửi Phản Hồi</button>
                        </form>
                    </TabPane>

                    <TabPane tab="Lịch Sử Phản Hồi" key="2">
                        <h2>Lịch Sử Phản Hồi</h2>
                        {error && <p className="text-danger">{error}</p>}
                        <ul className="list-unstyled">
                            {feedbackHistory.map((feedback) => (
                                <li key={feedback.feedbackID} className="mb-3 p-3 bg-light rounded shadow-sm">
                                    <strong>Ngày Tạo:</strong> {formatDate(feedback.ngayTao)}<br />
                                    <strong>Loại Yêu Cầu:</strong> {feedback.loai_yeu_cau}<br />
                                    <strong>Nội Dung:</strong> {feedback.noi_dung}<br />
                                    {feedback.hinh_anh && (
                                        <div className="mt-2">
                                            <strong>Hình Ảnh:</strong><br />
                                            <Image.PreviewGroup>
                                                <Image
                                                    width={200}
                                                    src={`http://localhost:8080/images/uploads/${feedback.hinh_anh}`}
                                                    className="rounded"
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

export default FeedbackForm;
