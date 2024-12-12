import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Steps } from 'antd';
import Modal from 'react-modal';
import Sidebar from '../partials/Sidebar';
Modal.setAppElement('#root');

const DonHang = () => {
  const userId = localStorage.getItem('userId');
  const [donhangList, setDonHangList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState('');
  const [selectedReason, setSelectedReason] = useState('');

  const reasons = [
    "Muốn thay đổi địa chỉ giao hàng",
    "Muốn nhập/thay đổi mã Voucher",
    "Muốn thay đổi sản phẩm trong đơn hàng (size, màu sắc, số lượng....)",
    "Thủ tục thanh toán quá rắc rối",
    "Tìm thấy giá rẻ hơn ở chỗ khác",
    "Đổi ý, không muốn mua nữa",
    "Khác",
  ];

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
          if ((a.trang_thai === 'Đã Hủy' || a.trang_thai === 'Đã Giao') && !(b.trang_thai === 'Đã Hủy' || b.trang_thai === 'Đã Giao')) return 1;
          if (!(a.trang_thai === 'Đã Hủy' || a.trang_thai === 'Đã Giao') && (b.trang_thai === 'Đã Hủy' || b.trang_thai === 'Đã Giao')) return -1;
          return new Date(b.ngay_tao) - new Date(a.ngay_tao);
        });
        setDonHangList(sortedData);
      } catch (err) {
        console.error(err);
        setError('Error fetching data: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchDonHang();
  }, [userId]);

  const openCancelModal = (orderId) => {
    setCurrentOrderId(orderId);
    setIsModalOpen(true);
  };

  const handleCancelOrder = async () => {
    if (!selectedReason) {
      alert('Vui lòng chọn lý do hủy.');
      return;
    }
    try {
      await axios.put(`http://localhost:8080/api/donhang/cancel/${currentOrderId}?lyDo=${encodeURIComponent(selectedReason)}`);
      setDonHangList(donhangList.map(donhang =>
        donhang.don_hangid === currentOrderId ? { ...donhang, trang_thai: 'Đã Hủy', ly_do: selectedReason } : donhang
      ));
      alert('Đơn hàng đã được hủy.');
    } catch (error) {
      console.error('Error canceling order:', error);
      alert('Không thể hủy đơn hàng.');
    } finally {
      setIsModalOpen(false);
      setSelectedReason('');
    }
  };

  const getCurrentStep = (status) => {
    switch (status) {
      case 'Đang chờ xử lý':
        return 0;
      case 'Đang Chuẩn Bị':
        return 1;
      case 'Đang Giao':
        return 2;
      case 'Đã Giao':
        return 3;
      case 'Đã Hủy':
        return 4;
      default:
        return 0;
    }
  };

  if (error) return (
    <div className="text-center text-danger mt-5">
      <p>{error}</p>
      <button className="btn btn-primary" onClick={() => window.location.reload()}>Thử lại</button>
    </div>
  );

  return (
    <div className="d-flex vh-100">
<div className='col-2'>
        <Sidebar userId={userId} />
      </div>

      <main className="flex-grow-1 p-4 bg-light overflow-auto col-6">
        <h1 className="fs-4 text-primary">Danh Sách Đơn Hàng</h1>
        {donhangList.length === 0 ? (
          <p className="text-center text-muted">Không có đơn hàng nào.</p>
        ) : (
          <table className="table table-bordered mt-4">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Ngày Tạo</th>
                <th>Người Dùng</th>
                <th>Số Điện Thoại</th>
                <th>Địa Chỉ</th>
                <th>Voucher</th>
                <th>Phí Ship</th>
                <th>Tổng Tiền</th>
                <th>Trạng Thái</th>
                <th>Đánh Giá</th>
              </tr>
            </thead>
            <tbody>
              {donhangList.map((donhang) => (
                <tr key={donhang.don_hangid}>
                  <td>{donhang.don_hangid}</td>
                  <td>{new Date(donhang.ngay_tao).toLocaleDateString()}</td>
                  <td>{donhang.users?.hovaten || 'Tên không tồn tại'}</td>
                  <td>{donhang.so_dien_thoai}</td>
                  <td>{donhang.diachi?.dia_chi || 'Địa chỉ không tồn tại'}</td>
                  <td>{donhang.voucher?.so_tien_giam?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) || 'Không áp dụng'}</td>
                  <td>{donhang.phi_ship.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                  <td>{donhang.tong_tien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                  <td>
                    {donhang.trang_thai === 'Đã Hủy' ? (
                      <Steps
                        direction="vertical"
                        current={1}
                        items={[
                          { title: 'Đang chờ xử lý', description: 'Đơn hàng đã được xác nhận.' },
                          { title: 'Đã Hủy', description: `Lý do: ${donhang.ly_do || "Không có lý do."}` },
                        ]}
                      />
                    ) : (
                      <Steps
                        direction="vertical"
                        current={getCurrentStep(donhang.trang_thai)}
                        items={[
                          { title: 'Đang chờ xử lý', description: 'Đơn hàng đã được xác nhận.' },
                          { title: 'Đang Chuẩn Bị', description: 'Đơn hàng đang chuẩn bị.' },
                          { title: 'Đang Giao', description: 'Đơn hàng đang giao.' },
                          { title: 'Đã Giao', description: 'Đơn hàng đã giao.' },
                        ]}
                      />
                    )}
                    {donhang.trang_thai === 'Đang chờ xử lý' && (
                      <button
                        onClick={() => openCancelModal(donhang.don_hangid)}
                        className="btn btn-danger mt-2"
                      >
                        Hủy Đơn
                      </button>
                    )}
                  </td>
                  <td>
                    <Link to={`/OrderDetail/${donhang.don_hangid}`} className="text-decoration-none">
                      <button className="btn btn-primary">Xem Chi Tiết</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          content: { width: '400px', margin: 'auto', borderRadius: '10px', padding: '20px' },
        }}
      >
        <h2>Chọn Lý Do Hủy Đơn</h2>
        <div>
          {reasons.map((reason, index) => (
            <div key={index} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value={reason}
                checked={selectedReason === reason}
                onChange={(e) => setSelectedReason(e.target.value)}
              />
              <label className="form-check-label">{reason}</label>
            </div>
          ))}
        </div>
        <button onClick={handleCancelOrder} className="btn btn-success mt-3 me-2">Xác Nhận</button>
        <button onClick={() => setIsModalOpen(false)} className="btn btn-danger mt-3">Hủy</button>
      </Modal>
    </div>
  );
};

export default DonHang;
