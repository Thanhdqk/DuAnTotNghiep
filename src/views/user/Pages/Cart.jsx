import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Checkbox, Button, Modal, Input } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, UserOutlined, PhoneOutlined, HomeOutlined   } from '@ant-design/icons';

function Cart() {
    const [showPopup, setShowPopup] = useState(false);
    const [checkedAll, setCheckedAll] = useState(false); 
    const [checkedItems, setCheckedItems] = React.useState([false, false]);
    const [quantity, setQuantity] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isModalVoucherOpen, setIsModalVoucherOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(Array(6).fill(false)); // Tạo mảng trạng thái

    const handleToggle = (index) => {
    const newChecked = [...isChecked];
    newChecked[index] = !newChecked[index]; // Đảo trạng thái chỉ phần tử được nhấn
    setIsChecked(newChecked); // Cập nhật lại state
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const showModalAdd = () => {
        setIsModalAddOpen(true);
    };
    const handleOkAdd = () => {
        setIsModalAddOpen(false);
    };
    const handleCancelAdd = () => {
        setIsModalAddOpen(false);
    };
    const showModalVoucher = () => {
        setIsModalVoucherOpen(true);
    };
    const handleOkVoucher = () => {
        setIsModalVoucherOpen(false);
    };
    const handleCancelVoucher = () => {
        setIsModalVoucherOpen(false);
    };
    const handleCheckAllChange = (e) => {
        const isChecked = e.target.checked;
        setCheckedAll(isChecked); 
        setCheckedItems(checkedItems.map(() => isChecked));
      };
    
      const handleCheckItemChange = (index) => (e) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = e.target.checked;
        setCheckedItems(newCheckedItems);
    
        setCheckedAll(newCheckedItems.every((item) => item));
      };

      const increaseQuantity = () => setQuantity(quantity + 1);
      const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
      };
    // Xử lý khi click bên ngoài để đóng popup
    useEffect(() => {
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
    return ( 
        <> 
       
            <nav className="breaddesign col-11 mx-auto" aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <NavLink to={'/'} className={"trangchu"}>Trang chủ</NavLink>
                    </li>
                    <li className="mx-2"><span> | </span></li>
                    <li className="breadcrumb-item giohang" aria-current="page">Giỏ hàng</li>
                </ol>
            </nav>

            <div className="diachi col-11 mx-auto">
                <div className="thongtin">
                    <div className="hangdautien">
                        <img width={32} height={32} src="https://img.icons8.com/windows/32/user-male-circle.png" alt="user" className="icon" />
                        <p className="tieude" >Thông tin người nhận:</p>
                        <p className="noidung" style={{ paddingLeft: '200px' }}>Thành | 0984762140</p>
                        <button className="thaydoidiachi" onClick={showModal}>Thay đổi địa chỉ</button>
                        <Modal width={1000} 
                        title="Địa chỉ giao hàng của tôi" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <Button onClick={showModalAdd}>Thêm địa chỉ giao hàng 
                                <PlusOutlined />
                            </Button>
                            <div className="mt-2 py-2 ps-2" style={{ border: '1px solid #d4d7de' }}>
                                <div className="d-flex align-items-center" style={{ height: '40px' }}>
                                    <img width={32} height={32} src="https://img.icons8.com/windows/32/user-male-circle.png" alt="user" className="icon" /> 
                                    <p style={{ fontWeight: 'bold', margin: '0', paddingRight: '50px' }}>Thông tin người nhận:</p>
                                    <p style={{ margin: '0' }} >Thành | 0984762140</p>
                                </div>
                                <div className="d-flex align-items-center" style={{ height: '40px' }}>
                                    <img width={32} height={32} src="https://img.icons8.com/windows/32/home.png" alt="home" className="icon" /> 
                                    <p style={{ fontWeight: 'bold', margin: '0', paddingRight: '80px' }}>Địa chỉ giao hàng:</p>
                                    <p style={{ margin: '0' }}>đường số 10, Campuchia, tỉnh Đắc Lắk, làng Nủ</p>
                                </div>
                                <div className="d-flex align-items-center" style={{ height: '40px' }}>
                                    <img width={32} height={32} src="https://img.icons8.com/fluency-systems-regular/50/online-store.png" alt="store" className="icon" />
                                    <p style={{ fontWeight: 'bold', margin: '0', paddingRight: '130px' }}>Cửa hàng:</p>
                                    <p style={{ margin: '0' }}>Quận 7</p>
                                </div>
                            </div>
                        </Modal>
                        <Modal width={1000} 
                        title="Thêm địa chỉ mới" open={isModalAddOpen} onOk={handleOkAdd} onCancel={handleCancelAdd}>
                            <div>
                                <div className="mb-3">
                                    <label style={{ fontWeight: 'bold' }} htmlFor="">Tên người nhận <span style={{ color: 'red' }}>*</span></label>
                                    <Input size="large" placeholder="Nhập tên người nhận" prefix={<UserOutlined />} />
                                </div>
                                <div className="mb-3">
                                    <label style={{ fontWeight: 'bold' }} htmlFor="">Số điện thoại <span style={{ color: 'red' }}>*</span></label>
                                    <Input size="large" placeholder="Nhập số điện thoại" prefix={<PhoneOutlined />} />
                                </div>
                                <div>
                                    <label style={{ fontWeight: 'bold' }} htmlFor="">Địa chỉ giao hàng <span style={{ color: 'red' }}>*</span></label>
                                    <Input size="large" placeholder="Nhập địa chỉ giao hàng" prefix={<HomeOutlined />} />
                                </div>
                            </div>
                        </Modal>
                    </div>

                    <div className="hangthuhai">
                        <img width={32} height={32} src="https://img.icons8.com/windows/32/home.png" alt="home" className="icon" />
                        <p className="tieude">Địa chỉ giao hàng:</p>
                        <p className="noidung" style={{ paddingLeft: '233px' }}>đường số 10, Campuchia, tỉnh Đắc Lắk, làng Nủ</p>
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
                    <div className="tieudesanpham col-12">
                        <p>Tất cả sản phẩm (2)</p>
                    </div>
                    <div className="navsanpham col-12">
                        <div className="navsanphamnd">
                            <Checkbox checked={checkedAll}
                            onChange={handleCheckAllChange} style={{ paddingRight: '10px' }} />
                            Sản phẩm
                        </div>
                        <div className="navsotiennd">
                            Số tiền
                            <DeleteOutlined style={{ paddingLeft: '70px' }}/>
                        </div>
                    </div>
                    <div className="col-12 cardgiohang d-flex align-items-start">
                        <Checkbox 
                            checked={checkedItems[0]} 
                            onChange={handleCheckItemChange(0)} 
                            style={{ paddingLeft: '10px', paddingBottom: '140px' }} 
                        />
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
                            <div className="d-flex align-items-center">
                                <Button onClick={decreaseQuantity} type="default" size="small">-</Button>
                                <span style={{ margin: '0 10px' }}>{quantity}</span>
                                <Button onClick={increaseQuantity} type="default" size="small">+</Button>
                                  
                            </div>
                            <p style={{ color: '#777e90', margin: '0' }}>Tối đa 127 sản phẩm</p>
                        </div>
                        <DeleteOutlined style={{ paddingTop: '70px' }} /> 
                    </div>
                    <div className="col-12 cardgiohang d-flex align-items-start">
                        <Checkbox 
                            checked={checkedItems[1]} 
                            onChange={handleCheckItemChange(1)} 
                            style={{ paddingLeft: '10px', paddingBottom: '140px' }} 
                        />
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
                            <div className="d-flex align-items-center">
                                <Button onClick={decreaseQuantity} type="default" size="small">-</Button>
                                <span style={{ margin: '0 10px' }}>{quantity}</span>
                                <Button onClick={increaseQuantity} type="default" size="small">+</Button>
                                  
                            </div>
                            <p style={{ color: '#777e90', margin: '0' }}>Tối đa 127 sản phẩm</p>
                        </div>
                        <DeleteOutlined style={{ paddingTop: '70px' }} /> 
                    </div>
                </div>
                
                <div className="khuyenmai col-4">
                    <div className="tieudekhuyenmai">
                        <p>Khuyến Mãi</p>
                    </div>
                    <div className="noidungkhuyenmai pt-2">
                        <div className="d-flex justify-content-between align-items-center" style={{ height: '45px'}}>
                            <div className="d-flex align-items-center noidungkhuyenmai2" >
                                <p onClick={showModalVoucher} style={{ margin: '0', fontWeight: 'bolder', paddingRight: '10px' }}>Mã giảm giá</p>
                                <img width="32" height="32" src="https://img.icons8.com/dusk/50/discount-ticket.png" alt="discount-ticket"/>
                                <Modal
                                    width={1100}
                                    title="Mã giảm giá của tôi"
                                    open={isModalVoucherOpen}
                                    onOk={handleOkVoucher}
                                    onCancel={handleCancelVoucher}
                                >
                                    <div className="voucher-container">
                                    {Array(6)
                                        .fill()
                                        .map((_, index) => (
                                        <div key={index} className="d-flex align-items-center magiamgiacuatoi">
                                            <img
                                            style={{ paddingRight: '10px' }}
                                            width={100}
                                            height={100}
                                            src="/images/voucher.png"
                                            alt="voucher"
                                            />
                                            <div
                                            style={{
                                                height: '130px',
                                                width: '0px',
                                                borderLeft: '2px dashed #d4d7de',
                                                paddingRight: '10px',
                                            }}
                                            ></div>
                                            <div className="pt-1">
                                            <p style={{ fontWeight: 'bolder' }}>
                                                Giảm giá 20k cho đơn hàng từ 150k
                                            </p>
                                            <p style={{ color: 'gray' }}>01.10.2024 - 31.10.2024 </p>
                                            <p style={{ color: 'red', fontWeight: 'bolder' }}>
                                                Chỉ còn 10 mã giảm giá
                                            </p>
                                            </div>
                                            <div
                                            className={`icon-container ${isChecked[index] ? 'checked' : ''}`}
                                            onClick={() => handleToggle(index)}
                                            >
                                            <img
                                                className="plus-icon"
                                                width="32"
                                                height="32"
                                                src="https://img.icons8.com/ios/50/plus--v1.png"
                                                alt="plus"
                                                style={{ display: isChecked[index] ? 'none' : 'block' }}
                                            />
                                            <img
                                                className="check-icon"
                                                width="37"
                                                height="37"
                                                src="https://img.icons8.com/color/50/checked.png"
                                                alt="check"
                                                style={{ display: isChecked[index] ? 'block' : 'none' }}
                                            />
                                            </div>
                                        </div>
                                        ))}
                                    </div>
                                </Modal>
                            </div>
                            <div className="d-flex align-items-center ">
                                <img width="12" height="12" src="https://img.icons8.com/ios/50/forward--v1.png" alt="forward--v1"/>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center noidungkhuyenmai2" style={{ height: '45px'}}>
                            <p style={{ margin: '0', fontWeight: 'bolder' }}>Ưu đãi cho đơn hàng</p>
                            <img width="12" height="12" src="https://img.icons8.com/ios/50/forward--v1.png" alt="forward--v1"/>
                        </div>
                        <div className="d-flex justify-content-between align-items-center" style={{ height: '45px'}}>
                            <div className="d-flex align-items-center noidungkhuyenmai2">
                                <p style={{ margin: '0', fontWeight: 'bolder', paddingRight: '10px' }}>Giảm giá sốc !</p>
                                <img width="32" height="32" src="https://img.icons8.com/emoji/48/fire.png" alt="fire"/>
                            </div>
                            <div>
                                <img width="12" height="12" src="https://img.icons8.com/ios/50/forward--v1.png" alt="forward--v1"/>
                            </div>
                        </div>
                    </div>
                    <div className="tieudekhuyenmai mt-2">
                        <p>Thông tin thanh toán</p>
                    </div>
                    <div className="mt-2">
                        <div className="d-flex justify-content-between align-items-center" style={{ height: '45px'}}>
                            <div>
                                <p style={{ margin: '0', color: '#777e90' }}>Tổng giá trị đơn hàng</p>
                            </div>
                            <div className="fw-bolder">
                                100.000 ₫
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center" style={{ height: '45px'}}>
                            <div>
                                <p style={{ margin: '0', color: '#777e90' }}>Phí vận chuyển</p>
                            </div>
                            <div className="fw-bolder">
                                0 ₫
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center" style={{ height: '45px'}}>
                            <div>
                                <p style={{ margin: '0', fontWeight: 'bolder' }}>Thành tiền</p>
                            </div>
                            <div className="fw-bolder" style={{ color: 'red' }}>
                                100.000 ₫
                            </div>
                        </div>
                        <div className="col-12 mt-2 thanhtoan" >
                            <NavLink to="/thanhtoan">
                            <button style={{ width: '100%', height: '45px', 
                                borderRadius: '5px', border: 'none', backgroundColor: 'red', 
                                color: 'white', fontWeight: 'bolder' }}>Thanh toán</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>  
            </>  
    );
  }
  export default Cart;