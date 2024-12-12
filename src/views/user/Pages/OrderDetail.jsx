import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../partials/Sidebar';

const OrderDetail = () => {
    const [order, setOrder] = useState([]);
    const [user, setUser] = useState({});
    const { id } = useParams();
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/donhang/${id}`);
                const orderData = res.data;

                if (orderData.length > 0) {
                    setOrder(orderData);
                }
            } catch (error) {
                console.error("Error fetching order details:", error);
            }
        };

        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/users/${userId}`);
                setUser(res.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchOrder();
        fetchUser();
    }, [id, userId]);

    const totalAmount =
        order.reduce((total, item) => total + item.so_luong * item.sanpham?.gia_goc, 0) +
        (order[0]?.donhang?.phi_ship || 0);

    return (
        <div className="row vh-100 m-0">
            {/* Sidebar */}
            <div className="col-2 bg-dark text-white p-0">
                <Sidebar userId={userId} />
            </div>

            {/* Main Content */}
            <div className="col-10 bg-light p-4">
                <div
                    style={{
                        backgroundColor: '#f8f9fa',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '20px' }}>Chi Tiết Đơn Hàng</h1>

                    {/* User Information */}
                    <h2 style={{ borderBottom: '2px solid #2c3e50', paddingBottom: '5px', color: '#2c3e50' }}>
                        Thông Tin Người Dùng
                    </h2>
                    <div style={{ marginBottom: '20px' }}>
                        <p><strong>Họ và Tên:</strong> {user.hovaten}</p>
                        <p><strong>Số Điện Thoại:</strong> {user.so_dien_thoai}</p>
                        <p><strong>Email:</strong> {user.accountID}</p>
                        <p><strong>Địa Chỉ:</strong> {order[0]?.donhang?.diachi?.dia_chi}</p>
                    </div>

                    {/* Order Details */}
                    <h2 style={{ borderBottom: '2px solid #2c3e50', paddingBottom: '5px', color: '#2c3e50' }}>
                        Thông Tin Đơn Hàng
                    </h2>
                    <table className="table table-bordered">
                        <thead>
                            <tr className="table-dark">
                                <th>Sản Phẩm</th>
                                <th>Số Lượng</th>
                                <th>Thành Tiền</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.sanpham?.ten_san_pham}</td>
                                    <td>{item.so_luong}</td>
                                    <td>
                                        {(item.so_luong * item.sanpham?.gia_goc).toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </td>
                                    <td className="text-center">
                                        {item.donhang?.trang_thai === 'Đã Giao' && item.sanpham?.san_phamId && (
                                            <Link to={`/review/${item.sanpham.san_phamId}`} className="btn btn-danger">
                                                Viết Đánh Giá
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Order Summary */}
                    <h2 style={{ borderBottom: '2px solid #2c3e50', paddingBottom: '5px', color: '#2c3e50' }}>
                        Tóm Tắt Đơn Hàng
                    </h2>
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Trạng Thái</th>
                                <td>{order[0]?.donhang?.trang_thai}</td>
                            </tr>
                            <tr>
                                <th>Ngày Tạo</th>
                                <td>{order[0]?.donhang?.ngay_tao}</td>
                            </tr>
                            <tr>
                                <th>Thời Gian Xác Nhận</th>
                                <td>{order[0]?.donhang?.thoi_gianXN}</td>
                            </tr>
                            <tr>
                                <th>Phí Ship</th>
                                <td>
                                    {order[0]?.donhang?.phi_ship.toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Hiển thị lý do hủy nếu trạng thái là "Đã Hủy" */}
                    {order[0]?.donhang?.trang_thai === 'Đã Hủy' && (
                        <div>
                            <strong>Lý do hủy đơn: </strong>
                            <span>{order[0]?.donhang?.ly_do || 'Không có lý do cụ thể'}</span>
                        </div>
                    )}

                    {/* Total Amount */}
                    <div style={{ textAlign: 'right', fontSize: '1.2rem', color: '#e74c3c' }}>
                        <strong>Tổng Tiền:</strong>{' '}
                        {totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </div>

                    {/* Back Button */}
                    <Link
                        to={`/lịch-sử-đặt-hàng?userId=${userId}`}
                        className="btn btn-primary mt-3"
                        style={{ display: 'block', textAlign: 'center' }}
                    >
                        Quay Lại Danh Sách Đơn Hàng
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
