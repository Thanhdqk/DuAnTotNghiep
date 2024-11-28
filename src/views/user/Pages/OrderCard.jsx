import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Steps } from 'antd';

// CSS styles
const styles = {
    container: {
        display: 'flex',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
    },
    sidebar: {
        width: '250px',
        backgroundColor: '#2c3e50',
        color: '#fff',
        padding: '20px',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    },
    link: {
        textDecoration: 'none',
        color: 'white',
    },
    menu: {
        listStyleType: 'none',
        padding: '0',
    },
    button: {
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
    mainContent: {
        flex: 1,
        padding: '40px',
        backgroundColor: '#ecf0f1',
        overflowY: 'auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    tableHeader: {
        backgroundColor: '#34495e',
        color: 'white',
        textAlign: 'left',
    },
    th: {
        padding: '12px',
        border: '1px solid #bdc3c7',
    },
    td: {
        padding: '12px',
        border: '1px solid #bdc3c7',
        backgroundColor: 'white',
    },
    noData: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#bdc3c7',
    },
    loading: {
        textAlign: 'center',
        marginTop: '20%',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: '20%',
    },
};

const DonHang = () => {
    const userId = localStorage.getItem('userId'); // Retrieve user ID from localStorage
    const [donhangList, setDonHangList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDonHang = async () => {
            if (!userId) {
                setError('User ID is required');
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get(`http://localhost:8080/api/donhang?userId=${userId}`);
                const sortedData = response.data.sort((a, b) => {
                    // Move 'Đã Hủy' and 'Đã Giao' orders to the bottom
                    if ((a.trang_thai === 'Đã Hủy' || a.trang_thai === 'Đã Giao') && !(b.trang_thai === 'Đã Hủy' || b.trang_thai === 'Đã Giao')) return 1;
                    if (!(a.trang_thai === 'Đã Hủy' || a.trang_thai === 'Đã Giao') && (b.trang_thai === 'Đã Hủy' || b.trang_thai === 'Đã Giao')) return -1;
                    
                    // For other orders, sort by date (newest first)
                    return new Date(b.ngay_tao) - new Date(a.ngay_tao);
                });
                setDonHangList(sortedData);
                console.log('Order data:', sortedData);
            } catch (err) {
                console.error(err);
                setError('Error fetching data: ' + (err.response?.data?.message || err.message));
            } finally {
                setLoading(false);
            }
        };
    
        fetchDonHang();
    }, [userId]);
    const getCurrentStep = (status) => {
        switch (status) {
            case 'Nhận Đơn':
                return 0;
            case 'Đang Chuẩn Bị':
                return 1;
            case 'Đang Giao':
                return 2;
            case 'Đã Giao':
                return 3;
            case 'Đã Hủy':
                return 4; // Step for canceled orders if you want it to appear in the steps
            default:
                return 0;
        }
    };

    //     For orders that have just been received: "Nhận Đơn"
    // For orders currently being delivered: "Đang Giao"
    // For orders that have been delivered: "Đã Giao"
    const handleCancelOrder = async (orderId) => {
        try {
            await axios.put(`http://localhost:8080/api/donhang/cancel/${orderId}`);
            // Refresh the order list after cancellation
            setDonHangList(donhangList.map(donhang =>
                donhang.don_hangid === orderId ? { ...donhang, trang_thai: 'Đã Hủy' } : donhang
            ));
            alert('Order has been canceled.');
        } catch (error) {
            console.error('Error canceling order:', error);
            alert('Failed to cancel the order.');
        }
    };
    if (loading) return <div style={styles.loading}>Loading...</div>;
    if (error) return (
        <div style={styles.error}>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} style={styles.button}>Try Again</button>
        </div>
    );

    return (
        <div style={styles.container}>
            <aside style={styles.sidebar}>
                <Link to="/" style={styles.link}>
                    <h3>Quản Lý Cá Nhân</h3>
                </Link>
                <ul style={styles.menu}>
                    {['Thông tin cá nhân', 'Lịch sử đặt hàng', 'Đổi mật khẩu', 'Feedback', 'Yêu Thích', 'Mã giảm giá'].map((item, index) => (
                        <li key={index}>
                            <Link to={`/${item.replace(/ /g, '-').toLowerCase()}?userId=${userId}`} style={styles.link}>
                                <button style={styles.button}>{item}</button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>

            <main style={styles.mainContent}>
                <h1 style={{ fontSize: '28px', color: '#34495e' }}>Danh Sách Đơn Hàng</h1>
                {donhangList.length === 0 ? (
                    <p style={styles.noData}>Không có đơn hàng nào.</p>
                ) : (
                    <table style={styles.table} aria-label="Danh sách đơn hàng">
                        <thead>
                            <tr style={styles.tableHeader}>
                                <th style={styles.th}>ID</th>
                                <th style={styles.th}>Ngày Tạo</th>
                                <th style={styles.th}>Người Dùng</th>
                                <th style={styles.th}>Số Điện Thoại</th>
                                <th style={styles.th}>Địa Chỉ</th>
                                <th style={styles.th}>Voucher</th>
                                <th style={styles.th}>Phí Ship</th>
                                <th style={styles.th}>Tổng Tiền</th>
                                <th style={styles.th}>Trạng Thái</th>
                                <th style={styles.th}>Đánh Giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donhangList.map((donhang) => (
                                <tr key={donhang.don_hangid}>
                                    <td style={styles.td}>{donhang.don_hangid}</td>
                                    <td style={styles.td}>{new Date(donhang.ngay_tao).toLocaleDateString()}</td>
                                    <td style={styles.td}>{donhang.users ? donhang.users.hovaten : 'Tên không tồn tại'}</td>
                                    <td style={styles.td}>{donhang.so_dien_thoai}</td>
                                    <td style={styles.td}>{donhang.diachi ? donhang.diachi.dia_chi : 'Địa chỉ không tồn tại'}</td>
                                    <td style={styles.td}>{donhang.voucher ? donhang.voucher.so_tien_giam : 'Không có mã giảm giá '}</td>
                                    <td style={styles.td}>{donhang.phi_ship.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                    <td style={styles.td}>{donhang.tong_tien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                    <td style={styles.td}>
                                        {donhang.trang_thai === 'Đã Hủy' ? (
                                            <Steps
                                                direction="vertical"
                                                current={1} // Set to 1 to mark "Đã Hủy" as the current step
                                                items={[
                                                    { title: 'Nhận Đơn', description: 'Đơn hàng đã được xác nhận và chuẩn bị.' },
                                                    { title: 'Đã Hủy', description: 'Đơn hàng đã bị hủy bởi người dùng.' },
                                                ]}
                                            />
                                        ) : (
                                            <Steps
                                                direction="vertical"
                                                current={getCurrentStep(donhang.trang_thai)}
                                                items={[
                                                    { title: 'Nhận Đơn', description: 'Đơn hàng đã được xác nhận và chuẩn bị.' },
                                                    { title: 'Đang Chuẩn Bị', description: 'Đơn hàng đang được chuẩn bị để vận chuyển.' },
                                                    { title: 'Đang Giao', description: 'Đơn hàng đang trong quá trình vận chuyển.' },
                                                    { title: 'Đã Giao', description: 'Đơn hàng đã được giao đến khách hàng.' },
                                                ]}
                                            />
                                        )}
                                        {donhang.trang_thai === 'Nhận Đơn' && (
                                            <button
                                                onClick={() => handleCancelOrder(donhang.don_hangid)}
                                                style={{ ...styles.button, backgroundColor: '#e74c3c' }}
                                            >
                                                Hủy Đơn
                                            </button>
                                        )}
                                    </td>

                                    <td style={styles.td}>
                                        <Link to={`/OrderDetail/${donhang.don_hangid}`} style={styles.link}>
                                            <button style={styles.button}>Xem Chi Tiết</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                )}
            </main>
        </div>
    );
};

export default DonHang;
