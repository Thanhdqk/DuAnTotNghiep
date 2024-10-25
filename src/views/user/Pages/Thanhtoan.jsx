import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Select } from 'antd';
import { DeleteOutlined, EditOutlined, CreditCardOutlined, WalletOutlined } from '@ant-design/icons';
import axios from "axios";
import { Formik, useFormik } from 'formik';

const options = [
    {
        label: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img style={{ marginRight: '8px' }} width="24" height="24" src="https://img.icons8.com/office/40/wallet.png" alt="wallet" /> Thanh toán trực tiếp
            </div>
        ),
        value: 'Thanh toán trực tiếp',
    },
    {
        label: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img width={24} height={24} src="/images/vnpay.png" alt="" /> Ví Vnpay
            </div>
        ),
        value: 'Ví Vnpay',
    }
];

const labelRender = (props) => {
    const { label, value } = props;
    if (label) {
        return value;
    }
    return (
        <span>
            <img style={{ marginRight: '8px' }} width="24" height="24" src="https://img.icons8.com/office/40/wallet.png" alt="wallet" />
            Phương thức thanh toán
        </span>);
};
function Thanhtoan() {
    const diachi = React.useRef(null);
    const [diachivalue, setdiachivalue] = useState("");
    const [diachivalue2, setdiachivalue2] = useState("");

    const [showPopup, setShowPopup] = useState(false);
    const [listprovince, setlistprovince] = useState([]);

    const api = async () => {
        const res = await axios({
            url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', method: 'GET',
            headers: {
                "Token": "b20158be-5619-11ef-8e53-0a00184fe694",
            }
        });
        setlistprovince(res.data.data);

    }


    const onButtonClick = () => {
        setdiachivalue(diachi.current.innerHTML);
        let firstindex = diachivalue.indexOf("tỉnh");
        console.log(firstindex);
        let diachitemp = diachivalue.substring(firstindex, diachivalue.lastIndexOf(','));
        let diachitemp2 = diachitemp.substring(diachitemp.indexOf(' ')).trim();
        console.log(diachitemp);
        console.log(diachitemp2);
        for (let i = 0; i < listprovince.length; i++) {
            if (listprovince[i].ProvinceName === diachitemp2) {
                console.log("ddas", listprovince[i].ProvinceID);
                setdiachivalue2(listprovince[i].ProvinceID);
            }
        }
        apishippingfee();

    };

    const apishippingfee = async () => {
        const res = await axios({
            url: 'np', method: 'GET',
            headers: {
                "Token": "b20158be-5619-11ef-8e53-0a00184fe694",
                "Content-Type": "application/json",
                "ShopId": 193308,
                " Content-Type": "text/plain"
            }, data: {
                "service_id":53321,
                "insurance_value":500000,
                "coupon": null,
                "from_district_id":1542,
                "to_district_id":1444,
                "to_ward_code":"20314",
                "height":15,
                "length":15,
                "weight":1000,
                "width":15
            }
            
        });
        console.log(res.data);

    };

    // Xử lý khi click bên ngoài để đóng popup

    useEffect(() => {
        api();

        const handleClickOutside = (event) => {
            if (!event.target.closest('.search-container') || !event.target.closest('.popup')) {
                setShowPopup(false);
            }
        };
        const handleScroll = () => {
            setShowPopup(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleInputClick = () => {
        setShowPopup(true);
    };
    console.log("listprovince", listprovince);

    return (
        <>

            <header className="bg-white border-bottom">
                <div className="container-fluid py-1">
                    <div className="row align-items-center">
                        {/* Logo và Dropdown */}
                        <div className="col-3 col-md-3 d-flex align-items-center mt-2 ps-3">
                            <NavLink to="/">
                                <img src="/images/logo-removebg-preview.png" className="me-3 img-fluid" width={80} alt="" />
                            </NavLink>
                        </div>

                        {/* Tìm kiếm */}
                        <div className="col-6 col-md-6 mt-2 mt-md-0 d-flex justify-content-center mt-2 px-2">
                            <input type="text" className="form-control me-2" style={{ width: '500px' }} placeholder="Tìm kiếm" onClick={handleInputClick} />
                            <button className="btn btn-outline-secondary" type="submit">
                                <i className="bi bi-search"></i>
                            </button>
                        </div>

                        {/* Icon giỏ hàng và thông báo */}
                        <div className="col-3 col-md-3 d-flex justify-content-end align-items-center mt-2">
                            <NavLink className="me-4 d-flex align-items-center" to="#">
                                <i className="bi bi-person-circle text-dark fs-4"></i>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </header>

            <nav className="breaddesign col-11 mx-auto" aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <NavLink to={'/'} className={"trangchu"}>Trang chủ</NavLink>
                    </li>
                    <li className="mx-2"><span> | </span></li>
                    <li className="breadcrumb-item trangchu" aria-current="page">Giỏ hàng</li>
                    <li className="mx-2"><span> | </span></li>
                    <li className="breadcrumb-item giohang" aria-current="page">Thanh toán</li>
                </ol>
            </nav>

            <div className="diachi col-11 mx-auto">
                <div className="thongtin">
                    <div className="hangdautien">
                        <img width={32} height={32} src="https://img.icons8.com/windows/32/user-male-circle.png" alt="user" className="icon" />
                        <p className="tieude" >Thông tin người nhận:</p>
                        <p className="noidung" style={{ paddingLeft: '200px' }}>Thành | 0984762140</p>
                    </div>

                    <div className="hangthuhai">
                        <img width={32} height={32} src="https://img.icons8.com/windows/32/home.png" alt="home" className="icon" />
                        <p className="tieude">Địa chỉ giao hàng:</p>
                        <p ref={diachi} className="noidung" style={{ paddingLeft: '233px' }}>đường số 10, Campuchia, tỉnh Long An, làng Nủ</p>
                    </div>

                    <div className="hangthuba">
                        <img width={32} height={32} src="https://img.icons8.com/fluency-systems-regular/50/online-store.png" alt="store" className="icon" />
                        <p className="tieude">Cửa hàng:</p>
                        <p className="noidung" style={{ paddingLeft: '293px' }}>Quận 7</p>
                    </div>
                </div>
            </div>

            <div className="col-11 mx-auto sanphamvakhuyenmai d-flex justify-content-between">
                <div className="sanpham col-7">
                    <div className="navsanpham col-12">
                        <div className="navsanphamnd">
                            Sản phẩm
                        </div>
                        <div className="navsotiennd" style={{ paddingRight: '165px' }}>
                            Số tiền
                        </div>
                    </div>
                    <div className="col-12 cardgiohang d-flex align-items-start">
                        <div>
                            <div className="d-flex">
                                <img width={150} height={150} src="/images/sanpham1.png" alt="Sản phẩm" />
                                <p style={{ width: '300px' }}>Mặt Nạ Giấy Dưỡng Da Dermal Ngọc Trai Và Collagen Trắng Da 23g</p>
                            </div>
                            <div className="d-flex ps-4 align-items-center">
                                <EditOutlined />
                                <input type="text" className="no-outline" placeholder="Thêm ghi chú" />
                            </div>
                        </div>

                        <div className="chitietgiatien d-flex flex-column align-items-center justify-content-center">
                            <p style={{ fontSize: '20px', fontWeight: 'bolder' }}>12.900 ₫</p>
                            <p style={{ color: '#777e90', margin: '0' }}>Số lượng: 5</p>
                        </div>
                    </div>
                    <div className="col-12 cardgiohang d-flex align-items-start">
                        <div>
                            <div className="d-flex">
                                <img width={150} height={150} src="/images/sanpham2.png" alt="Sản phẩm" />
                                <p style={{ width: '300px' }}>Hộp Quà Sữa Tắm Lux Hương Hoa Thiên Điểu 570g</p>
                            </div>
                            <div className="d-flex ps-4 align-items-center">
                                <EditOutlined />
                                <input type="text" className="no-outline" placeholder="Thêm ghi chú" />
                            </div>
                        </div>

                        <div className="chitietgiatien d-flex flex-column align-items-center justify-content-center">
                            <p style={{ fontSize: '20px', fontWeight: 'bolder' }}>12.900 ₫</p>
                            <p style={{ color: '#777e90', margin: '0' }}>Số lượng: 1</p>
                        </div>
                    </div>
                </div>

                <div className="khuyenmai col-4">
                    <div className="tieudekhuyenmai">
                        <p>Thông tin thanh toán</p>
                    </div>
                    <div className="mt-4">
                        <div>
                            <p style={{ margin: '0', fontWeight: 'bold' }}>Bạn có lưu ý gì cho chúng tôi không ?</p>
                        </div>
                        <div className="d-flex align-items-center" style={{ marginTop: '0' }}>
                            <EditOutlined />
                            <input type="text" className="no-outline" placeholder="Thêm ghi chú" />
                        </div>
                        <div className="mt-4">
                            <p style={{ fontWeight: 'bolder' }}>Phương thức thanh toán</p>
                            <Select
                                labelRender={labelRender}
                                defaultValue="1"
                                style={{
                                    width: '100%',
                                }}
                                options={options}
                            />
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-4" style={{ height: '45px' }}>
                            <div>
                                <p style={{ margin: '0', color: '#777e90' }}>Tổng giá trị đơn hàng</p>
                            </div>
                            <div className="fw-bolder">
                                100.000 ₫
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center" style={{ height: '45px' }}>
                            <div>
                                <p style={{ margin: '0', color: '#777e90' }}>Phí vận chuyển</p>
                            </div>
                            <div className="fw-bolder">
                                0 ₫
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center" style={{ height: '45px' }}>
                            <div>
                                <p style={{ margin: '0', fontWeight: 'bolder' }}>Thành tiền</p>
                            </div>
                            <div className="fw-bolder" style={{ color: 'red' }}>
                                100.000 ₫
                            </div>
                        </div>
                        <div className="col-12 mt-2 thanhtoan" >
                            <button onClick={onButtonClick} style={{
                                width: '100%', height: '45px',
                                borderRadius: '5px', border: 'none', backgroundColor: 'red',
                                color: 'white', fontWeight: 'bolder'
                            }}>Đặt hàng</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Thanhtoan;