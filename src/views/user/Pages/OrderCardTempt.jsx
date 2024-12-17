import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Modal from 'react-modal';
import Sidebar from '../partials/Sidebar';
import { Steps, QRCode } from 'antd';
Modal.setAppElement('#root');

const DonHang = () => {
    const userId = localStorage.getItem('account_id');
    const [donhangList, setDonHangList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentOrderId, setCurrentOrderId] = useState('');

    const [selectedReason, setSelectedReason] = useState('');

    const [donhang, setdonhang] = useState([]);
    const [token, settoken] = useState("");
    const [urlforqrcode, seturlforqrcode] = useState('');
    const getdonhang = async () => {
        const res = await axios({ url: `http://localhost:8080/getalldonhang`, method: 'GET' })
        setdonhang(res.data)
    }
    const getPaypalAccessToken = async () => {
        const res = await axios({
            method: 'post',
            url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
            data: 'grant_type=client_credentials', // => this is mandatory x-www-form-urlencoded. DO NOT USE json format for this
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',// => needed to handle data parameter
                'Accept-Language': 'en_US',
            },
            auth: {
                username: "AUuoahug326XM8PupIWATfSZph2ulLyvj714hnfx7DV-Z9MNjC9hSehpDh4VqE6mvtS6ExGgNSkhML2K",
                password: "EBRxibct4O7BsLjLUR0iAELmNHPVzI0UCU5HQ-LOzW-w3EUVOWRYhiLP4bZK4zM0YNX-IkWs_blvqV8c"
            },

        });

        localStorage.setItem('paypal_token', res.data.access_token);
        console.log('paypal access token', res.data.access_token);
        settoken(res.data.access_token);
    }

    const repay = async (id) => {
        console.log("repay");
        const res = await axios({
            url: `https://api-m.sandbox.paypal.com/v2/checkout/orders/${id}`,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res.data);
        seturlforqrcode(res.data.links.find(link => link.rel === "approve").href);
    }


    const Show_order_details = async (id) => {
        const res = await axios({
            url: `https://api-m.sandbox.paypal.com/v2/checkout/orders/${id}`,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        console.log('order details', res.data);
        Show_details_for_authorized_payment(res.data.purchase_units[0].payments.authorizations[0].id);
        Show_captured_payment_details(res.data.purchase_units[0].payments.captures[0].id);
    }
    const Refund_captured_payment = async (url) => {
        const res = await axios({
            url: `${url}`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            data: {}
        })
        console.log(res.data);
    }

    const Show_details_for_authorized_payment = async (id) => {

        const res = await axios({
            url: `https://api-m.sandbox.paypal.com/v2/payments/authorizations/${id}`,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        console.log('authorization details', res.data);

    }
    const Show_captured_payment_details = async (id) => {
        const res = await axios({
            url: `https://api-m.sandbox.paypal.com/v2/payments/captures/${id} `,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        console.log('capture  payment  details', res.data);
        console.log(res.data.links.find(link => link.rel === "refund").href);
        Refund_captured_payment(res.data.links.find(link => link.rel === "refund").href);

    }

    const Stepforstatus = (status) => {
        console.log(status);
        if (status === "Đang chờ xử lý") {
            return <>
                <Steps
                    direction="vertical"
                    current={getCurrentStep(status)}
                    items={[
                        { title: 'Đang chờ xử lý', description: 'Đơn hàng đã được xác nhận và chuẩn bị.' },
                        { title: 'Đang Chuẩn Bị', description: 'Đơn hàng đang được chuẩn bị để vận chuyển.' },
                        { title: 'Đang Giao', description: 'Đơn hàng đang trong quá trình vận chuyển.' },
                        { title: 'Đã giao', description: 'Đơn hàng đã được giao đến khách hàng.' },
                    ]}
                />
            </>
        }
        else if (status === "Đã Hủy") {
            return <>
                <Steps
                    direction="vertical"
                    current={1}
                    items={[
                        { title: 'Đang chờ xử lý', description: 'Đơn hàng đã được xác nhận và chuẩn bị.' },
                        { title: 'Đã Hủy', description: 'Đơn hàng đã bị hủy bởi người dùng.' },
                    ]}
                />
            </>
        }
        else if (status === "Chờ Thanh Toán") {
            return <>
                <Steps
                    direction="vertical"
                    current={getCurrentStep(status)}
                    items={[
                        { title: 'Chờ thanh toán', description: 'Đơn hàng đang chờ thanh toán.' },
                        { title: 'Đang chờ xử lý', description: 'Đơn hàng đã được xác nhận và chuẩn bị.' },
                        { title: 'Đang Chuẩn Bị', description: 'Đơn hàng đang được chuẩn bị để vận chuyển.' },
                        { title: 'Đang Giao', description: 'Đơn hàng đang trong quá trình vận chuyển.' },
                        { title: 'Đã giao', description: 'Đơn hàng đã được giao đến khách hàng.' },
                    ]}
                />
            </>
        }
    }
    const repayVNpay = async (amount) => {
        const res = await axios({
            url: `http://localhost:8080/repayVNpay?total=${amount}`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        seturlforqrcode(res.data);
    }


    const buttons = (status, donhang) => {
        const donhangJson = JSON.parse(donhang)

        if (status === "Chờ Thanh Toán") {

            return <>

                <button data-bs-toggle="modal" data-bs-target="#exampleModal2"
                    onClick={() => {


                        if (donhangJson.phuongthuctt.phuong_thucTTID == "ptt02") {
                            repay(donhangJson.online_payment_id)
                        } else if (donhangJson.phuongthuctt.phuong_thucTTID == "ptt03") {
                            localStorage.setItem("donhangidvnpay", donhangJson.don_hangid);
                            repayVNpay(donhangJson.tong_tien)

                        }
                    }
                    }
                    className="btn btn-primary mt-2 w-100"
                >
                    Thanh toán
                </button>
                <button
                    onClick={() => {
                        // handleCancelOrder(donhangJson.don_hangid)
                        // if (donhangJson.phuongthuctt.phuong_thucTTID == "ptt02") {
                        //     alert('refunded order')
                        //     Show_order_details(donhangJson.online_payment_id)
                        // }
                        openCancelModal(donhangJson.don_hangid)
                    }
                    }
                    className="btn btn-danger mt-2 w-100"
                >
                    Hủy Đơn
                </button>
            </>
        } else if (status === "Đang chờ xử lý") {
            return <button
                onClick={() => {
                    openCancelModal(donhangJson.don_hangid)
                    
                }
                }
                className="btn btn-danger mt-2 w-100"
            >
                Hủy Đơn
            </button>
        }

    }

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
        localStorage.setItem("donhangidvnpay", null);
        getPaypalAccessToken();
        getdonhang();
        const fetchDonHang = async () => {
            if (!userId) {
                setError('User ID is required');
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get(`http://localhost:8080/api/donhang?userId=${userId}`);
                const sortedData = response.data.sort((a, b) => {
                    if ((a.trang_thai === 'Đã Hủy' || a.trang_thai === 'Đã giao') && !(b.trang_thai === 'Đã Hủy' || b.trang_thai === 'Đã giao')) return 1;
                    if (!(a.trang_thai === 'Đã Hủy' || a.trang_thai === 'Đã giao') && (b.trang_thai === 'Đã Hủy' || b.trang_thai === 'Đã giao')) return -1;
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
            case 'Đã giao':
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
                                    <td>{donhang.dia_chi?.dia_chi ? donhang.dia_chi?.dia_chi : 'Địa chỉ không tồn tại'}</td>
                                    <td>{donhang.voucher?.so_tien_giam?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) || 'Không áp dụng'}</td>
                                    <td>{donhang.phi_ship.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                    <td>{donhang.tong_tien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                    <td>
                                        {/* {donhang.trang_thai === 'Đã Hủy' ? (
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
                          { title: 'Đã giao', description: 'Đơn hàng Đã giao.' },
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
                    )} */}
                                        {Stepforstatus(donhang.trang_thai)}
                                        {buttons(donhang.trang_thai, JSON.stringify(donhang))}
                                    </td>
                                    <td className='align-middle'>
                                        <Link to={`/OrderDetail/${donhang.don_hangid}`} className="text-decoration-none">
                                            <button className="btn btn-primary align-middle">Xem Chi Tiết</button>
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
                    content: { width: '400px', margin: '0', borderRadius: '10px', padding: '20px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute' },
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
            <div>
                <div className="modal fade" id="exampleModal2" tabIndex={-1} >
                    <div className="modal-dialog modal-dialog-centered" >
                        <div className="modal-content">
                            <div className="modal-header" style={{ borderBottom: 'none' }}>


                                <div className='row text-center'>
                                    <div className="col-12 ">  <div className='h2'>Đặt hàng thành công</div></div>
                                    <div className="col-12 ">
                                        <QRCode
                                            errorLevel="H"
                                            value={urlforqrcode}
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                    </div>
                                    <div className="col-12 mt-2">
                                        <button className='btn btn-primary' onClick={() => { window.open(urlforqrcode, '_blank') }}>Chuyển tiếp đến trang thanh toán</button>
                                    </div>

                                </div>

                            </div>
                            <div className="modal-footer text-center    ">


                                {/* <button ref={btn3} type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    <Link to={`/lịch-sử-đặt-hàng/`} >
                                        Xem Chi Tiết
                                    </Link>
                                </button> */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default DonHang;