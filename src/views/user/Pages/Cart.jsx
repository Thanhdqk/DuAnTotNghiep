import React from "react";
import { useEffect, useState } from "react";
import { json, NavLink } from "react-router-dom";
import { Checkbox, Button, Modal, Input, Select } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, UserOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { ClearCart, DecreaseItem, IncreaseItem, RemoveItem, AddSpthanhtoan, Clear, DecreaseSpthanhtoan, DeleteSpthanhtoan, IncreaseSpthanhtoan, RemoveSpthanhtoan, Thanhtoan, CallAPI_Cart, increaseItem, decreaseItem, removeItem, clearItem } from "../Reducer/cartReducer";
import axios from "axios";
import { toast } from 'react-toastify';



function Cart() {
    const userId = localStorage.getItem('account_id');
    const ListCart = useSelector(state => state.cart.CartDatabase);
    const [listprovince, setlistprovince] = useState([]);
    const [listDistrict, setlistDistrict] = useState([]);
    const [Ward, setWard] = useState(null);
    const [District, setDistrict] = useState(null);
    const [listWard, setlistWard] = useState([]);
    const addressCurent = localStorage.getItem('addressCurent') ? JSON.parse(localStorage.getItem('addressCurent')) : null;
    const [change, setchange] = useState(0)
    const [showPopup, setShowPopup] = useState(false);
    const [checkedAll, setCheckedAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isModalVoucherOpen, setIsModalVoucherOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(Array(6).fill(false)); // Tạo mảng trạng thái
    const [sum, Setsum] = useState(0);
    const [spchecked, setspchecked] = useState([]);
    const [AddressCurrent, SetaddressCurrent] = useState({});
    const [addressList, SetaddressList] = useState([]);
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

    useEffect(() => {
        if (checkedItems.length !== ListCart.gioHangChiTiet?.length) {
            setCheckedItems(new Array(ListCart.gioHangChiTiet?.length).fill(false));
            setCheckedAll(false); // Reset lại checkedAll khi số lượng sản phẩm thay đổi
        }
    }, [ListCart.gioHangChiTiet]);

    const fechtProvince = async () => {
        const res = await axios({
            url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', method: 'GET',
            headers: {
                "Token": "b20158be-5619-11ef-8e53-0a00184fe694",
            }
        });
        console.log(res.data.data);
        setlistprovince(res.data.data);
    }
    const fechtWard = async (id) => {
        console.log('id', id);
        const res = await axios({
            url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id', method: 'POST',
            headers: {
                "Token": "b20158be-5619-11ef-8e53-0a00184fe694",
                "Content-Type": "application/json"
            }, data: JSON.stringify({ token: "b20158be-5619-11ef-8e53-0a00184fe694", district_id: id }),
        });
        console.log('ward', res.data.data);
        setlistWard(res.data.data);
    }




    const fechdistrict = async (a, b, c, d) => {
        const res2 = await axios({
            url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district', method: 'POST',
            headers: {
                "Token": "b20158be-5619-11ef-8e53-0a00184fe694",
                "Content-Type": "application/json"
            }, data: JSON.stringify({ token: "b20158be-5619-11ef-8e53-0a00184fe694", province_id: 202 }),
        });
        setlistDistrict(res2.data.data);
        // setlistDistrict(res2.data.data);
        // apishippingfee(getProvince(diachivalue, res1.data.data), getward(diachivalue, res2.data.data), a, b, c, d);
    }

    const onChange = (value) => {
        const address = document.querySelector('input[id^=ward]').value;
        console.log('ward selected', address)
        console.log(`selected ${value}`);
    };
    const onChangeDistrict = (value) => {
        console.log(value);
        const address = document.querySelector('.ant-select-selection-item');
        address.innerHTML = " ";
        console.log(address);
        fechtWard(value.value);
        setDistrict(value.label + '-' + value.value);
    };
    const onChangeWard = (value) => {
        try {
            setWard(value.label + '-' + value.value);
        }
        catch (error) {
            console.log(error)
        }

    };
    const onSearch = (value) => {
        console.log('search:', value);
    };


    const handleCheckItemChange = (index, cart) => (e) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = e.target.checked; // Cập nhật checkbox của item
        setCheckedItems(newCheckedItems);

        // Kiểm tra xem tất cả checkbox có được chọn không
        const allChecked = newCheckedItems.every(item => item === true);
        setCheckedAll(allChecked);

        // Dispatch action tương ứng
        if (e.target.checked) {
            const api = AddSpthanhtoan(cart);
            dispatch(api);
        } else {
            const api = DeleteSpthanhtoan(cart);
            dispatch(api);
        }
    };

    const handleSubmitADDFORM = async (e) => {
        e.preventDefault()
        const name = document.querySelector('input[name="name"]').value;
        const phone = document.querySelector('input[name="phone"]').value;
        const address = document.querySelector('input[name="address"]').value;



        const queryParams = new URLSearchParams({
            name: name,
            phone: phone,
            address: address,
            iduser: userId
        });

        try {
            const res = await axios.post(`http://localhost:8080/DiaChi/Add?${queryParams.toString()}`);
            const resList = await axios({ url: `http://localhost:8080/FindDiaChiByID?id=${userId}`, method: "GET" })

            SetaddressList(resList.data)
            toast.success("Thêm địa chỉ thành công")
        } catch (error) {

        } finally {
            setIsModalAddOpen(false);
        }
    }




    const ListSPChecked = useSelector(state => state.cart.ListSpthanhtoan) || [];


    const totalAmount = Array.isArray(ListSPChecked)
        ? ListSPChecked.reduce((total, Spthanhtoan) => {

            const price = Spthanhtoan.sanPham.gia_km > 0 ? Spthanhtoan.sanPham.gia_km : Spthanhtoan.sanPham.gia_goc;
            return total + (Spthanhtoan.soLuong * price);
        }, 0)
        : 0;



    const dispatch = useDispatch();
    dispatch(Thanhtoan(ListSPChecked))

    const handleCheckAllChange = (e) => {
        const isChecked = e.target.checked;
        setCheckedAll(isChecked);


        const newCheckedItems = ListCart.gioHangChiTiet.map(cart => cart.sanPham.so_luong > 0 ? isChecked : false);
        setCheckedItems(newCheckedItems);

        if (isChecked) {

            ListCart.gioHangChiTiet.forEach(cart => {
                if (cart.sanPham.so_luong > 0) {
                    const api = AddSpthanhtoan(cart);
                    dispatch(api);
                }
            });
        } else {

            ListCart.gioHangChiTiet.forEach(cart => {
                if (cart.sanPham.so_luong > 0) {
                    const api = DeleteSpthanhtoan(cart);
                    dispatch(api);
                }
            });
        }
    };

    const InformationUser = async () => {

        const res = await axios({ url: `http://localhost:8080/FindDiaChiByID?id=${userId}`, method: "GET" })

        SetaddressList(res.data)
        if (addressCurent != null) {
            SetaddressCurrent(addressCurent);
        }
        else {
            SetaddressCurrent(res.data[0]);
        }




    }




    useEffect(() => {
        console.log('cart run')
        InformationUser()
        fechdistrict()
        dispatch(CallAPI_Cart(userId))
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


            dispatch(Clear())

        };
    }, []);

    const handleInputClick = () => {
        setShowPopup(true);
    };
    return (
        <div className="container-fluid">



            <div className="diachi col-12 mx-auto">
                <div className="thongtin">
                    <div className="hangdautien">
                        <img width={32} height={32} src="https://img.icons8.com/windows/32/user-male-circle.png" alt="user" className="icon" />
                        <p className="tieude" >Thông tin người nhận:</p>
                        <p className="noidung" style={{ paddingLeft: '200px' }}>{AddressCurrent?.users?.hovaten} | {AddressCurrent?.users?.so_dien_thoai ? AddressCurrent?.users?.so_dien_thoai : <span className="text-danger fw-bold">Chưa nhập số điện thoại</span>}</p>
                        <button className="thaydoidiachi" onClick={showModal}>Thay đổi địa chỉ</button>
                        <Modal width={1000}
                            title="Địa chỉ giao hàng của tôi" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <Button onClick={showModalAdd}>Thêm địa chỉ giao hàng
                                <PlusOutlined />
                            </Button>
                            <div >
                                {addressList.map((address, index) => {
                                    return <div className="mt-2 py-2 ps-2" key={address.dia_chiID} style={{ border: '1px solid #d4d7de' }}>

                                        <div className="d-flex align-items-center" style={{ height: '40px' }}>
                                            <img width={32} height={32} src="https://img.icons8.com/windows/32/user-male-circle.png" alt="user" className="icon" />
                                            <p style={{ fontWeight: 'bold', margin: '0', paddingRight: '50px' }}>Thông tin người nhận:</p>
                                            <p style={{ margin: '0' }} >{address?.users?.hovaten} | {address?.users?.so_dien_thoai}</p>
                                        </div>
                                        <div className="d-flex align-items-center" style={{ height: '40px' }}>
                                            <img width={32} height={32} src="https://img.icons8.com/windows/32/home.png" alt="home" className="icon" />
                                            <p style={{ fontWeight: 'bold', margin: '0', paddingRight: '80px' }}>Địa chỉ giao hàng:</p>
                                            <p style={{ margin: '0' }}>{address?.dia_chi}</p>
                                        </div>


                                        {AddressCurrent?.dia_chiID !== address.dia_chiID ? <div className="d-flex align-items-center" style={{ height: '60px' }}>
                                            <button onClick={() => {
                                                const dataJSON = JSON.stringify(address);


                                                localStorage.setItem('addressCurent', dataJSON);
                                                SetaddressCurrent(JSON.parse(localStorage.getItem('addressCurent')))
                                                toast.success("Sử dụng địa chỉ thành công")
                                            }} className="btn btn-primary m-3">Dùng địa chỉ này</button>


                                            <button onClick={async () => {

                                                if (window.confirm("Bạn có muốn xóa địa chỉ này không")) {
                                                    // console.log('sadsadsad',index)
                                                    await axios({ url: `http://localhost:8080/DiaChi/Delete/${address.dia_chiID}`, method: 'DELETE' })
                                                    const resList = await axios({ url: `http://localhost:8080/FindDiaChiByID?id=${userId}`, method: "GET" })

                                                    SetaddressList(resList.data)
                                                    toast.success("Xóa địa chỉ thành công")
                                                }
                                            }} className="btn btn-danger m-3" ><DeleteOutlined /> </button>
                                        </div> : <>
                                        </>}

                                    </div>
                                })}

                            </div>
                        </Modal>
                        <Modal width={1000}
                            title="Thêm địa chỉ mới" open={isModalAddOpen} onOk={handleOkAdd} onCancel={handleCancelAdd}>

                            {AddressCurrent != null ? <form onSubmit={handleSubmitADDFORM}> <div className="mb-3">
                                <label style={{ fontWeight: 'bold' }} htmlFor="">Tên người nhận <span style={{ color: 'red' }}>*</span></label>
                                <Input size="large" name="name" placeholder="Nhập tên người nhận" value={AddressCurrent?.users?.hovaten} prefix={<UserOutlined />} />
                            </div>
                                <div className="mb-3">
                                    <label style={{ fontWeight: 'bold' }} htmlFor="">Số điện thoại <span style={{ color: 'red' }}>*</span></label>
                                    <Input size="large" name="phone" placeholder="Nhập số điện thoại" value={AddressCurrent?.users?.so_dien_thoai} prefix={<PhoneOutlined />} />
                                </div>
                                <div className="d-flex  " style={{ height: '40px' }}>
                                    <div className="me-3">
                                        <Select
                                            style={{ width: '170px' }}
                                            showSearch
                                            placeholder="Chọn phường"
                                            id="ward"
                                            optionFilterProp="label"
                                            onChange={onChangeWard}
                                            labelInValue
                                            onSearch={onSearch}

                                            options={listWard.map((item) => ({ value: item.WardCode, label: item.WardName }))}
                                            allowClear
                                        />
                                    </div>
                                    <div className="me-3">
                                        <Select
                                            style={{ width: '170px' }}
                                            showSearch
                                            placeholder="Quận"
                                            id="district"
                                            optionFilterProp="label"
                                            labelInValue
                                            onChange={onChangeDistrict}
                                            onSearch={onSearch}
                                            options={listDistrict.map((item) => ({ value: item.DistrictID, label: item.DistrictName }))}
                                        />
                                    </div>
                                    <div className="me-3">
                                        <select className="form-select form-select-sm province" >
                                            <option value={'202'} label="Thành phó Hồ Chí Minh" selected>Thành phố Hồ Chí Minh</option>
                                        </select>
                                    </div>


                                </div>
                                <div>
                                    <label style={{ fontWeight: 'bold' }} htmlFor="">Địa chỉ giao hàng <span style={{ color: 'red' }}>*</span></label>
                                    <Input size="large" name="address" required placeholder="Nhập địa chỉ giao hàng" prefix={<HomeOutlined />} />
                                </div>  <button type="submit" onClick={() => {

                                }} className="btn btn-primary m-3">Thêm địa chỉ</button>  </form> :

                                <form> <div className="mb-3">
                                    <label style={{ fontWeight: 'bold' }} htmlFor="">Tên người nhận <span style={{ color: 'red' }}>*</span></label>
                                    <Input size="large" placeholder="Nhập tên người nhận" value={''} prefix={<UserOutlined />} />
                                </div>
                                    <div className="mb-3">
                                        <label style={{ fontWeight: 'bold' }} htmlFor="">Số điện thoại <span style={{ color: 'red' }}>*</span></label>
                                        <Input size="large" placeholder="Nhập số điện thoại" value={''} prefix={<PhoneOutlined />} />
                                    </div>




                                    <div>
                                        <label style={{ fontWeight: 'bold' }} htmlFor="">Địa chỉ giao hàng <span style={{ color: 'red' }}>*</span></label>
                                        <Input size="large" placeholder="Nhập địa chỉ giao hàng" prefix={<HomeOutlined />} />
                                    </div>  </form>}

                        </Modal>
                    </div>

                    <div className="hangthuhai">
                        <img width={32} height={32} src="https://img.icons8.com/windows/32/home.png" alt="home" className="icon" />
                        <p className="tieude">Địa chỉ giao hàng:</p>
                        <p className="noidung" style={{ paddingLeft: '233px' }}>{AddressCurrent?.dia_chi ? AddressCurrent?.dia_chi : <span className="text-danger fw-bold">Chưa nhập địa chỉ</span>}</p>
                    </div>

                    <div className="hangthuba">
                        <img width={32} height={32} src="https://img.icons8.com/fluency-systems-regular/50/online-store.png" alt="store" className="icon" />
                        <p className="tieude">Cửa hàng:</p>
                        <p className="noidung" style={{ paddingLeft: '293px' }}>Quận 7</p>
                    </div>
                    {AddressCurrent?.dia_chi != "" && AddressCurrent?.users?.hovaten != "" && AddressCurrent?.users?.so_dien_thoai != "" ?
                      <></>
                        :  <div className="d-flex align-items-center" style={{ height: '40px' }}>


                        <p className="text-danger fw-bold" style={{ margin: '0', paddingLeft: '400px' }}>Hãy nhập đầy đủ thông tin để có thể thanh toán</p>
                    </div>  
                    }
                </div>
            </div>

            <div className="col-12 mx-auto sanphamvakhuyenmai d-flex justify-content-between">
                <div className="sanpham col-7">
                    <div className="tieudesanpham col-12">
                        <p>Tất cả sản phẩm ({ListCart?.gioHangChiTiet?.length})</p>
                    </div>
                    <div className="navsanpham col-12">
                        <div className="navsanphamnd">
                            <Checkbox checked={checkedAll}
                                onChange={handleCheckAllChange} style={{ paddingRight: '10px' }} />
                            Sản phẩm
                        </div>
                        <div className="navsotiennd">
                            Số tiền
                            <DeleteOutlined onClick={() => {

                                dispatch(clearItem(userId))
                            }} style={{ paddingLeft: '115px' }} />
                        </div>
                    </div>

                    {ListCart?.gioHangChiTiet?.map((cart, index) => {
                        return <div className={`col-12 cardgiohang d-flex align-items-start ${cart.sanPham?.so_luong == 0 ? 'disabled-div' : ''}  `} key={index}>
                            <Checkbox
                                checked={checkedItems[index]}
                                onChange={handleCheckItemChange(index, cart)}

                                style={{ paddingLeft: '10px', paddingBottom: '140px' }}
                            />
                            <div>
                                <div className="d-flex position-relative">
                                    {cart.sanPham.so_luong === 0 && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '0',
                                                left: '40px',
                                                width: '100%',
                                                height: '100%',
                                                color: 'red',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '18px',
                                                fontWeight: 'bold',
                                                zIndex: '1',
                                            }}
                                        >
                                            Hết hàng
                                            <button
                                                className="btn btn-danger btn-interactive"
                                                style={{
                                                    position: 'absolute',
                                                    top: '80%',
                                                    left: '180px',
                                                    zIndex: '2',
                                                    transform: 'translateY(-50%)',
                                                    minWidth: '180px'
                                                }}
                                                onClick={() => {
                                                    const remove = removeItem({ idcart: cart.id, userId, idsanpham: cart.sanPham.san_phamId });
                                                    dispatch(remove);
                                                }}
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    )}

                                    <NavLink to={`/product/detail/${cart.sanPham?.san_phamId}`}><img width={150} height={150} src={`/images/${cart.sanPham?.hinhanh[0]?.ten_hinh}`} alt="Sản phẩm" /></NavLink>

                                    <p className="text-center" style={{ width: '300px' }}>{cart.sanPham?.ten_san_pham}</p>
                                </div>

                            </div>

                            <div className="chitietgiatien d-flex flex-column align-items-center justify-content-center">
                                <p style={{ fontSize: '20px', fontWeight: 'bolder' }}> {(cart.sanPham?.gia_km > 0 ? cart.soLuong * cart.sanPham?.gia_km : cart.soLuong * cart.sanPham?.gia_goc).toLocaleString()}     </p>
                                <div className="d-flex align-items-center">
                                    <Button onClick={() => {

                                        if (ListSPChecked.length > 0) {
                                            const increasesp = DecreaseSpthanhtoan({
                                                productId: cart,
                                                quantity: 1
                                            })
                                            dispatch(increasesp)
                                        }
                                        const increase = decreaseItem({
                                            quantity: cart.soLuong,
                                            userId: userId,
                                            productId: cart.sanPham.san_phamId,
                                            idsp: cart.sanPham.san_phamId,
                                        })
                                        dispatch(increase)


                                    }} type="default" size="small">-</Button>
                                    <span style={{ margin: '0 10px' }}>{cart.soLuong}</span>
                                    <Button onClick={() => {
                                        if (cart.soLuong == cart.sanPham.so_luong) {
                                            alert(`Trong shop còn ${cart.sanPham.so_luong} sản phẩm thêm ăn cc à`);
                                            return;
                                        }
                                        const increase = increaseItem({
                                            idsp: cart.sanPham.san_phamId,
                                            userId: userId
                                        })

                                        dispatch(increase)

                                        if (ListSPChecked.length > 0) {
                                            const increasesp = IncreaseSpthanhtoan({
                                                productId: cart,
                                                quantity: 1
                                            })
                                            dispatch(increasesp)
                                        }





                                    }} type="default" size="small">+</Button>

                                </div>
                                <p style={{ color: '#777e90', margin: '0' }}>Tối đa {cart.sanPham?.so_luong} sản phẩm </p>
                            </div>
                            <DeleteOutlined onClick={() => {
                                const remove = removeItem({ userId, idsanpham: cart.sanPham.san_phamId });
                                dispatch(remove);

                            }} style={{ paddingTop: '70px', paddingLeft: '65px' }} />
                        </div>
                    })}

                    {ListCart?.gioHangChiTiet?.length == 0 &&
                        <div className="col-md-12 mt-5 text-center">

                            <h4 className='fw-bold'>Rất tiếc !</h4>
                            <h6>Bạn chưa thêm sản phẩm nào vào giỏ hàng</h6>
                            <img src="/images/img-comment.svg" alt="" /></div>}


                </div>

                <div className="khuyenmai col-4">
                    <div className="tieudekhuyenmai">
                        <p>Khuyến Mãi</p>
                    </div>
                    <div className="noidungkhuyenmai pt-2">
                        <div className="d-flex justify-content-between align-items-center" style={{ height: '45px' }}>
                            <div className="d-flex align-items-center noidungkhuyenmai2" >
                                <p onClick={showModalVoucher} style={{ margin: '0', fontWeight: 'bolder', paddingRight: '10px' }}>Mã giảm giá</p>
                                <img width="32" height="32" src="https://img.icons8.com/dusk/50/discount-ticket.png" alt="discount-ticket" />
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
                                <img width="12" height="12" src="https://img.icons8.com/ios/50/forward--v1.png" alt="forward--v1" />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center noidungkhuyenmai2" style={{ height: '45px' }}>
                            <p style={{ margin: '0', fontWeight: 'bolder' }}>Ưu đãi cho đơn hàng</p>
                            <img width="12" height="12" src="https://img.icons8.com/ios/50/forward--v1.png" alt="forward--v1" />
                        </div>
                        <div className="d-flex justify-content-between align-items-center" style={{ height: '45px' }}>
                            <div className="d-flex align-items-center noidungkhuyenmai2">
                                <p style={{ margin: '0', fontWeight: 'bolder', paddingRight: '10px' }}>Giảm giá sốc !</p>
                                <img width="32" height="32" src="https://img.icons8.com/emoji/48/fire.png" alt="fire" />
                            </div>
                            <div>
                                <img width="12" height="12" src="https://img.icons8.com/ios/50/forward--v1.png" alt="forward--v1" />
                            </div>
                        </div>
                    </div>
                    <div className="tieudekhuyenmai mt-2">
                        <p>Thông tin thanh toán</p>
                    </div>
                    <div className="mt-2">
                        <div className="d-flex justify-content-between align-items-center" style={{ height: '45px' }}>
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
                                {totalAmount.toLocaleString()} ₫
                            </div>
                        </div>
                        <div className="col-12 mt-2 thanhtoan" >
                            <NavLink to="/thanhtoan">
                                <button disabled={ListSPChecked.length === 0 || AddressCurrent?.dia_chi == "" || AddressCurrent?.users?.hovaten == "" || AddressCurrent?.users?.so_dien_thoai == ""} style={{
                                    width: '100%', height: '45px',
                                    borderRadius: '5px', border: 'none',
                                    backgroundColor: ListSPChecked.length === 0 || AddressCurrent?.dia_chi == "" || AddressCurrent?.users?.hovaten == "" || AddressCurrent?.users?.so_dien_thoai == ""  ? 'black' : 'red',
                                    color: 'white', fontWeight: 'bolder'

                                }}>Thanh toán</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Cart;