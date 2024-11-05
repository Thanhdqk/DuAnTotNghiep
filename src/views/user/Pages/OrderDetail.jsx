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
        backgroundColor: '#2c3e50',
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
    },
    container: {
        backgroundColor: '#f8f9fa',
        color: '#333',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        padding: '40px',
    },
    heading: {
        textAlign: 'center',
        fontSize: '2rem',
        color: '#2c3e50',
        marginBottom: '20px',
    },
    sectionTitle: {
        fontSize: '1.5rem',
        color: '#2c3e50',
        marginBottom: '15px',
        borderBottom: '2px solid #34495e',
        paddingBottom: '5px',
    },
    listItem: {
        backgroundColor: '#ffffff',
        padding: '15px',
        borderRadius: '5px',
        marginBottom: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    detailText: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
        fontSize: '1rem',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#34495e',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'inline-block',
        textAlign: 'center',
        marginTop: '20px',
        transition: 'background-color 0.3s ease',
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
};

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [images, setImages] = useState([]);
    const userId = localStorage.getItem('userId');

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



        fetchOrder();
    }, [id]);

    return (
        <div style={styles.mainContainer}>
            {/* Sidebar Navigation */}
            <aside style={styles.sidebar}>
                <Link to="/" style={styles.linkStyle}>
                    <h3>Quản Lý Cá Nhân</h3>
                </Link>
                <ul style={styles.menuStyle}>
                    {['Thông tin cá nhân', 'Lịch sử đặt hàng', 'Thẻ thanh toán', 'Phương thức thanh toán', 'Đổi mật khẩu','Feedback', 'Yêu Thích'].map((item, index) => (
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

                    <h2 style={styles.sectionTitle}>Thông Tin Đơn Hàng</h2>
                    {order ? (
                        <ul>
                            {order.map((item) => (
                                <li style={styles.listItem} key={item.id}>
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

                                    <div style={{ marginTop: '10px' }}>

                                        <img
                                            src={`http://localhost:8080/images/uploads/${item.sanpham?.hinhanh[0]?.ten_hinh}`}
                                            alt="Hình ảnh sản phẩm"
                                            style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px', margin: '5px' }}
                                        />
                                    </div>


                                    {item.sanpham?.san_phamId ? (
                                        <Link to={`/review/${item.sanpham.san_phamId}`} style={styles.button}>
                                            Viết Đánh Giá
                                        </Link>
                                    ) : (
                                        <button style={styles.button} disabled>
                                            Không thể đánh giá
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Không có chi tiết đơn hàng nào.</p>
                    )}

                    <Link to={`/order-card?userId=${userId}`} style={styles.button}>
                        Quay Lại Danh Sách Đơn Hàng
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
