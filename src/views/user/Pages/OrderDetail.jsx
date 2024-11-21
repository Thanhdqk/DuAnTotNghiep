import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
    content: {
        marginLeft: '270px',
        flex: '1',
        padding: '20px',
    },
    container: {
        backgroundColor: '#f8f9fa',
        color: '#333',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '40px',
    },
    heading: {
        textAlign: 'center',
        fontSize: '2.5rem',
        color: '#2c3e50',
        marginBottom: '30px',
    },
    sectionTitle: {
        fontSize: '1.8rem',
        color: '#2c3e50',
        marginBottom: '15px',
        borderBottom: '2px solid #2c3e50',
        paddingBottom: '8px',
    },
    listItem: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease',
    },
    listItemHovered: {
        transform: 'translateY(-5px)',
    },
    detailText: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
        fontSize: '1.1rem',
    },
    button: {
        padding: '12px 20px',
        backgroundColor: '#2980b9',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'inline-block',
        textAlign: 'center',
        marginTop: '25px',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#3498db',
    },
    linkStyle: {
        textDecoration: 'none',
        color: 'white',
    },
    menuStyle: {
        listStyleType: 'none',
        padding: '0',
        marginTop: '30px',
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
    imageContainer: {
        marginTop: '15px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
    },
    imageStyle: {
        width: '100px',
        height: '100px',
        objectFit: 'cover',
        borderRadius: '5px',
    },
};

const OrderDetail = () => {
    const [order, setOrder] = useState(null);
    const [user, setUser] = useState(null);
    const [images, setImages] = useState([]);
    const { id } = useParams();
    const userId = localStorage.getItem('userId'); // Get userId from localStorage

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/donhang/${id}`);
                setOrder(res.data);

                if (res.data.length > 0) {
                    const sanPhamId = res.data[0].sanpham.id;
                    const imageRes = await axios.get(`http://localhost:8080/api/hinhanh/sanpham/${sanPhamId}`);
                    setImages(imageRes.data);
                }
            } catch (error) {
                console.error("Error fetching order details:", error);
            }
        };

        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/users/${userId}`);
                setUser(res.data); // Set the user data
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchOrder();
        fetchUser(); // Fetch user details
    }, [id, userId]);

    return (
        <div style={styles.mainContainer}>
            {/* Sidebar Navigation */}
            <aside style={styles.sidebar}>
                <Link to="/" style={styles.linkStyle}>
                    <h3>Quản Lý Cá Nhân</h3>
                </Link>
                <ul style={styles.menuStyle}>
                    {['Thông tin cá nhân', 'Lịch sử đặt hàng', 'Thẻ thanh toán', 'Phương thức thanh toán', 'Đổi mật khẩu', 'Feedback', 'Yêu Thích'].map((item, index) => (
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
                    <h1 style={styles.heading}>Chi Tiết Đơn Hàng</h1>

                    {/* Hiển thị thông tin người dùng */}
                    {user && (
                        <div style={{ marginBottom: '30px' }}>
                            <h2 style={styles.sectionTitle}>Thông Tin Người Dùng</h2>
                            <div style={styles.detailText}>
                                <strong>Họ và tên:</strong>
                                <span>{user.hovaten}</span>
                            </div>
                            <div style={styles.detailText}>
                                <strong>Số điện thoại:</strong>
                                <span>{user.so_dien_thoai}</span>
                            </div>
                            <div style={styles.detailText}>
                                <strong>Email:</strong>
                                <span>{user.accountID}</span>
                            </div>
                        </div>
                    )}

                    <h2 style={styles.sectionTitle}>Thông Tin Đơn Hàng</h2>
                    {order ? (
                        <ul>
                            {order.map((item) => (
                                <li
                                    style={{ ...styles.listItem, '&:hover': styles.listItemHovered }}
                                    key={item.id}
                                >
                                    <div style={styles.detailText}>
                                        <strong>Sản Phẩm:</strong>
                                        <span>{item.sanpham?.ten_san_pham || 'Không có tên sản phẩm'}</span>
                                    </div>
                                    <div style={styles.detailText}>
                                        <strong>Số Lượng:</strong>
                                        <span>{item.so_luong}</span>
                                    </div>
                                    <div style={styles.detailText}>
                                        <strong>Thành Tiền:</strong>
                                        <span>{(item.so_luong * item.sanpham?.gia_goc).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                    </div>
                                    <div style={styles.detailText}>
                                        <strong>Trạng Thái:</strong>
                                        <span>{item.donhang?.trang_thai}</span>
                                    </div>
                                    <div style={styles.detailText}>
                                        <strong>Ngày Tạo:</strong>
                                        <span>{item.donhang?.ngay_tao}</span>
                                    </div>
                                    <div style={styles.detailText}>
                                        <strong>Thời Gian Xác Nhận:</strong>
                                        <span>{item.donhang?.thoi_gianXN}</span>
                                    </div>
                                    <div style={styles.detailText}>
                                        <strong>Số Điện Thoại:</strong>
                                        <span>{item.donhang?.so_dien_thoai}</span>
                                    </div>
                                    <div style={styles.detailText}>
                                        <strong>Ghi Chú:</strong>
                                        <span>{item.donhang?.ghi_chu}</span>
                                    </div>
                                    <div style={styles.detailText}>
                                        <strong>Phí Ship:</strong>
                                        <span>{item.donhang?.phi_ship.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                    </div>
                                    <div style={styles.detailText}>
                                        <strong>Tổng Tiền:</strong>
                                        <span>{item.donhang?.tong_tien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                    </div>
                                    <div style={styles.detailText}>
                                        <strong>Địa Chỉ:</strong>
                                        <span>{item.donhang.diachi.dia_chi}</span>
                                    </div>

                                    {/* Image Gallery */}
                                    <div style={{ marginTop: '10px' }}>
                                        <img
                                            src={`http://localhost:8080/images/uploads/${item.sanpham?.hinhanh[0]?.ten_hinh}`}
                                            alt="Hình ảnh sản phẩm"
                                            style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px', margin: '5px' }}
                                        />
                                    </div>

                                    {item.donhang?.trang_thai === 'Đã Giao' && item.sanpham?.san_phamId && (
                                        <Link to={`/review/${item.sanpham.san_phamId}`} style={styles.button}>
                                            Viết Đánh Giá
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Không có chi tiết đơn hàng nào.</p>
                    )}

                    <Link to={`/lịch-sử-đặt-hàng?userId=${userId}`} style={styles.button}>
                        Quay Lại Danh Sách Đơn Hàng
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
