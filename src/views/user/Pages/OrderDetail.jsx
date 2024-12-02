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
                const orderData = res.data;

                if (orderData.length > 0) {
                    // Kiểm tra trạng thái đã đánh giá cho từng sản phẩm
                    const updatedOrder = await Promise.all(
                        orderData.map(async (item) => {
                            if (item.sanpham?.id) {
                                try {
                                    // Kiểm tra nếu sản phẩm đã được đánh giá
                                    const { data: hasReviewed } = await axios.get(
                                        `http://localhost:8080/api/reviews/exist`,
                                        {
                                            params: {
                                                sanPhamId: item.sanpham.id,
                                                userId,
                                            },
                                        }
                                    );
                                    return { ...item, hasReviewed }; // Thêm trạng thái hasReviewed vào từng sản phẩm
                                } catch (error) {
                                    console.error("Error checking review status:", error);
                                    return { ...item, hasReviewed: false }; // Nếu có lỗi, mặc định là chưa đánh giá
                                }
                            }
                            return { ...item, hasReviewed: false };
                        })
                    );

                    setOrder(updatedOrder);
                }
            } catch (error) {
                console.error("Error fetching order details:", error);
            }
        };

        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/users/${userId}`);
                setUser(res.data); // Lấy thông tin người dùng
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchOrder();
        fetchUser(); // Lấy thông tin người dùng
    }, [id, userId]);


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
                            <div style={styles.detailText}>
                                <strong>Địa Chỉ:</strong>
                                <span>{order && order[0]?.donhang.diachi.dia_chi}</span>
                            </div>
                        </div>
                    )}

                    {/* Hiển thị thông tin đơn hàng */}
                    <h2 style={styles.sectionTitle}>Thông Tin Đơn Hàng</h2>
                    {order ? (
                        <div>
                            {/* Bảng 1: Sản Phẩm, Số Lượng, Thành Tiền */}
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                                <thead>
                                    <tr>
                                        <th style={{ borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'left' }}>Sản Phẩm</th>
                                        <th style={{ borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'left' }}>Số Lượng</th>
                                        <th style={{ borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'left' }}>Thành Tiền</th>
                                        <th style={{ borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'left' }}>Thao Tác</th> {/* Cột cho "Viết Đánh Giá" */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.map((item) => (
                                        <tr key={item.id}>
                                            <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <img
                                                        src={`http://localhost:8080/images/uploads/${item.sanpham?.hinhanh[0]?.ten_hinh}`}
                                                        alt="Hình ảnh sản phẩm"
                                                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px', marginRight: '10px' }}
                                                    />
                                                    <span>{item.sanpham?.ten_san_pham || 'Không có tên sản phẩm'}</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{item.so_luong}</td>
                                            <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                                                {(item.so_luong * item.sanpham?.gia_goc).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                            </td>
                                            <td style={{ padding: '10px', borderBottom: '1px solid #ccc', textAlign: 'center' }}>
                                                {item.donhang?.trang_thai === 'Đã Giao' && item.sanpham?.san_phamId && (
                                                    <Link to={`/review/${item.sanpham.san_phamId}`} style={styles.button}>
                                                        Viết Đánh Giá
                                                    </Link>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* <td style={{ padding: '10px', borderBottom: '1px solid #ccc', textAlign: 'center' }}>
                                {item.donhang?.trang_thai === 'Đã Giao' && item.sanpham?.id && !item.hasReviewed && (
                                    <Link to={`/review/${item.sanpham.id}`} style={styles.button}>
                                        Viết Đánh Giá
                                    </Link>
                                )}
                            </td> */}

                            {/* Bảng 2: Trạng Thái, Ngày Tạo, Thời Gian Xác Nhận, Phí Ship */}
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr>
                                        <th style={{ borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'left' }}>Trạng Thái</th>
                                        <th style={{ borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'left' }}>Ngày Tạo</th>
                                        <th style={{ borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'left' }}>Thời Gian Xác Nhận</th>
                                        <th style={{ borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'left' }}>Phí Ship</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr key={order[0].id}>
                                        <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                                            {order[0].donhang?.trang_thai}
                                        </td>
                                        <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                                            {order[0].donhang?.ngay_tao}
                                        </td>
                                        <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                                            {order[0].donhang?.thoi_gianXN}
                                        </td>
                                        <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                                            {order[0].donhang?.phi_ship.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                        </td>
                                    </tr>

                                </tbody>
                            </table>

                            {/* Hiển thị tổng tiền (bao gồm phí ship) */}
                            <div style={styles.detailText}>
                                <strong>Tổng Tiền:</strong>
                                <span>
                                    {(
                                        order.reduce((total, item) => total + (item.so_luong * item.sanpham?.gia_goc), 0) +
                                        (order[0]?.donhang?.phi_ship || 0)  // Thêm phí ship
                                    ).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                </span>
                            </div>

                        </div>
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
