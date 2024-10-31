import React, { useRef, forwardRef, useCallback } from "react";
import { useEffect, useState } from "react";
import { json, NavLink } from "react-router-dom";
import { Checkbox, Button, Modal, Input } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, UserOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { ClearCart, DecreaseItem, IncreaseItem, RemoveItem, AddSpthanhtoan, Clear, DecreaseSpthanhtoan, DeleteSpthanhtoan, IncreaseSpthanhtoan, RemoveSpthanhtoan, Thanhtoan, CallAPI_Cart, increaseItem, decreaseItem, removeItem } from "../Reducer/cartReducer";
import axios from "axios";
import { Card, Col, Container, Row } from 'react-bootstrap';

function Cart() {
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(true);
    const addressCurent = localStorage.getItem('addressCurent') ? JSON.parse(localStorage.getItem('addressCurent')) : null;
    const userId = localStorage.getItem('account_id');
    const [change, setchange] = useState(0)
    const [showPopup, setShowPopup] = useState(false);
    const [checkedAll, setCheckedAll] = useState(false);
    const [checkedItems, setCheckedItems] = React.useState([false, false]);
    const [quantity, setQuantity] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isModalVoucherOpen, setIsModalVoucherOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(Array(6).fill(false)); // Tạo mảng trạng thái
    const [sum, Setsum] = useState(0);
    const [spchecked, setspchecked] = useState([]);
    const [listprovince, setlistprovince] = useState([]);
    const [listDistrict, setlistDistrict] = useState([]);
    const Diachiref = useRef(null);
    const shippingfee = React.useRef(null);
    const btnforapplyvoucher = React.useRef([]);
    // const [diachivalue, setdiachivalue] = useState(addressCurent.dia_chi);
    const diachivalue = addressCurent.dia_chi;
    const [diachivalue2, setdiachivalue2] = useState("");
    const [diachivalue3, setdiachivalue3] = useState("");
    let [shipvalue, setshipvalue] = useState("");
    let [shipvalue_discount, setshipvalue_discount] = useState("");
    let [ship, setship] = useState(0);
    let [click1, setclick1] = useState(-1);
    const [AddressCurrent, SetaddressCurrent] = useState({});
    const [addressList, SetaddressList] = useState([]);
    const [addressList2, SetaddressList2] = useState([]);
    let formatnumber;
    const [voucherApplied, setvoucherApplied] = useState(false);

    const [wei, setwei] = useState(0);







    const applyVoucher = (selectedvoucher, index, a, b) => {
        setIsModalVoucherOpen(false)

        const nodeList = document.querySelectorAll(".voucher-btn");
        const amount = document.querySelectorAll(".amount")

        console.log('h', a, b);
        console.log(parseFloat(amount[0].innerHTML.substring(0, amount[0].innerHTML.length - 1)));
        console.log(amount[0].innerHTML.substring(amount[0].innerHTML.indexOf(',') + 1, amount[0].innerHTML.length));
        const stringtemp = parseInt(amount[0].innerHTML.substring(0, amount[0].innerHTML.length - 1)) * 1000;
        console.log(index);
        if (!voucherApplied) {
            for (let i = 0; i < nodeList.length; i++) {
                nodeList[i].disabled = true;
                nodeList[index].disabled = false;
            }
            setvoucherApplied(true)
            btnforapplyvoucher.current[index].innerHTML = "Đã áp dụng"

            let ship_discount = (a + b) - selectedvoucher.so_tien_giam;

            console.log('discount', ship_discount);
            setshipvalue_discount(ship_discount)
            setclick1(index);
            localStorage.setItem('totalamount', JSON.stringify(totalAmount));
            localStorage.setItem('shipfee', JSON.stringify(b));
            localStorage.setItem('shipfee_discount', JSON.stringify(ship_discount));
            localStorage.setItem('discount', JSON.stringify(parseInt(selectedvoucher.so_tien_giam)));
            console.log("ship_discount", ship_discount);
            console.log("shipvalue", shipvalue);
        } else {
            setvoucherApplied(false)
            for (let i = 0; i < nodeList.length; i++) {
                nodeList[i].disabled = false;
                nodeList[index].disabled = false;
            }
            btnforapplyvoucher.current[index].innerHTML = "Áp dụng"
            setshipvalue_discount(0)
        }




    };
    function testSelector(selector = '') {

        const [type, ...classNames] = selector.split('.');
        return instance => {
            if (type && instance.type !== type) {
                return false;
            }
            const { className = '' } = instance.props;
            const instanceClassNames = className.split(' ');
            return classNames.every(className => instanceClassNames.includes(className));
        };
    }



    const fetchVouchers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/loadVoucher');
            setVouchers(response.data);

        } catch (error) {
            console.error('Error loading vouchers:', error);
        } finally {
            setLoading(false);
        }
    };
    const apishippingfee = async (idprovince, iddistrict, a, b, c, d) => {
        console.log('fee', idprovince, iddistrict, a, b, c, d);
        if (a != 0) {
            const res = await axios({
                url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', method: 'POST',
                headers: {
                    'Token': data.token,
                    'Content-Type': 'application/json',
                }, data: {
                    "token": "b20158be-5619-11ef-8e53-0a00184fe694",
                    "shop_id": 193308,
                    "service_type_id": 2,
                    "service_id": 53320,
                    "insurance_value": 100000,
                    "coupon": null,
                    "cod_failed_amount": 2000,
                    "from_district_id": 1454,
                    "from_ward_code": "21211",
                    "to_district_id": 2090,
                    "to_ward_code": "22407",
                    "weight": parseInt(a),
                    "length": parseInt(b),
                    "width": parseInt(c),
                    "height": parseInt(d),
                    "cod_value": parseInt(0),
                },

            }).catch(error => {
                console.log(error);
            });
            console.log(res.data.data);
            setshipvalue(res.data.data.total);
            formatnumber = res.data.data.total.format(0, 3, '.', ',');
        }


        // shippingfee.current.innerHTML = formatnumber + "đ";





    };
    const data = {
        token: "b20158be-5619-11ef-8e53-0a00184fe694",
        shop_id: 193308,
        service_type_id: 2,
        service_id: 53320,
        insurance_value: 100000,
        coupon: null,
        cod_failed_amount: 2000,
        from_district_id: 1454,
        from_ward_code: "21211",
        to_district_id: 1452,
        to_ward_code: "21012",
        weight: parseInt(1),
        length: parseInt(5),
        width: parseInt(50),
        height: parseInt(50),
        cod_value: parseInt(0),
    };



    const getProvince = (province, list) => {
        let firstindex = province.indexOf("tinh");
        // console.log(firstindex);
        let diachitemp = province.substring(firstindex, province.length);
        let diachitemp2 = diachitemp.substring(diachitemp.indexOf(' ')).replace(/ /g, '').toLowerCase();
        // console.log(diachitemp);
        // console.log(diachitemp2);
        let result = "";
        for (let i = 0; i < list.length; i++) {
            for (let j = 0; j < list[i].NameExtension.length; j++) {
                if (list[i].NameExtension[j] === diachitemp2) {
                    console.log("user province id", list[i].ProvinceID);
                    setdiachivalue2(list[i].ProvinceID);
                    return list[i].ProvinceID
                }
            }

        }
        return result;
    };
    const getward = (district, list) => {
        // console.log('provinceid', list);
        let firstindex = district.lastIndexOf("huyen");
        console.log('district', firstindex);
        let diachitemp = district.substring(firstindex + 5, district.indexOf(','));
        let diachitemp2 = diachitemp.substring(diachitemp.indexOf(' ')).replace(/ /g, '').toLowerCase();
        // console.log('district', diachitemp);
        // console.log('district 2', diachitemp2);
        // console.log(list[11]);
        for (let i = 0; i < list.length; i++) {
            for (let j = 0; j < list[i].NameExtension.length; j++) {
                if (list[i].NameExtension[j] === diachitemp2) {
                    console.log("user district id", list[i].DistrictID);
                    setdiachivalue3(list[i].DistrictID);
                    return list[i].DistrictID
                }
            }
        }
        return "";
    }

    const fechtProvince = async () => {
        const res = await axios({
            url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', method: 'GET',
            headers: {
                "Token": "b20158be-5619-11ef-8e53-0a00184fe694",
            }
        });
        console.log(res.data.data);
        setlistprovince(res.data.data);
        // fechdistrict(getProvince(diachivalue, res.data.data));

    }
    const getnumber = async () => {
        const res = await axios({
            url: `http://localhost:8080/getnumber?number=${totalAmount}`, method: 'GET'
        });
        return res.data;

    }


    const fechdistrict = async (a, b, c, d) => {
        const res1 = await axios({
            url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', method: 'GET',
            headers: {
                "Token": "b20158be-5619-11ef-8e53-0a00184fe694",
            }
        });

        const res2 = await axios({
            url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district', method: 'POST',
            headers: {
                "Token": "b20158be-5619-11ef-8e53-0a00184fe694",
                "Content-Type": "application/json"
            }, data: JSON.stringify({ token: "b20158be-5619-11ef-8e53-0a00184fe694", province_id: getProvince(diachivalue, res1.data.data) }),
        });

        setlistDistrict(res2.data.data);
        apishippingfee(getProvince(diachivalue, res1.data.data), getward(diachivalue, res2.data.data), a, b, c, d);
    }

    Number.prototype.format = function (n, x, s, c) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
            num = this.toFixed(Math.max(0, ~~n));

        return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
    };


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









    const ListCart = useSelector(state => state.cart.CartDatabase);
    const ListSPChecked = useSelector(state => state.cart.ListSpthanhtoan) || [];




    const totalAmount = Array.isArray(ListSPChecked)
        ? ListSPChecked.reduce((total, Spthanhtoan) => {
            // Nếu `gia_km` lớn hơn 0, dùng `gia_km`, nếu không dùng `gia_goc`
            const price = Spthanhtoan.sanpham.gia_km > 0 ? Spthanhtoan.sanpham.gia_km : Spthanhtoan.sanpham.gia_goc;
            return (total + (Spthanhtoan.so_luong * price));
        }, 0)
        : 0;
    const totallength = Array.isArray(ListSPChecked)
        ? ListSPChecked.reduce((total, Spthanhtoan) => {
            return total + Spthanhtoan.sanpham.chieu_dai;
        }, 0)
        : 0;
    const totalheight = Array.isArray(ListSPChecked)
        ? ListSPChecked.reduce((total, Spthanhtoan) => {
            return total + Spthanhtoan.sanpham.chieu_cao;
        }, 0)
        : 0;
    const totalweight = Array.isArray(ListSPChecked)
        ? ListSPChecked.reduce((total, Spthanhtoan) => {
            return total + Spthanhtoan.sanpham.khoi_luong;
        }, 0)
        : 0;
    const totalwidth = Array.isArray(ListSPChecked)
        ? ListSPChecked.reduce((total, Spthanhtoan) => {
            return total + Spthanhtoan.sanpham.chieu_rong;
        }, 0)
        : 0;



    console.log("total", totalheight, totalweight, totalwidth, totallength, totalAmount);


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


    const dispatch = useDispatch();
    dispatch(Thanhtoan(ListSPChecked))


    const handleCheckItemChange = (index, cart) => (e) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = e.target.checked;

        setCheckedItems(newCheckedItems);


        setCheckedAll(newCheckedItems.every((item) => item));
        if (e.target.checked) {
            const api = AddSpthanhtoan(cart);
            dispatch(api)
            // setwei(totalAmount);
            // fechdistrict(totalAmount);
            // setwei(totalAmount,fechdistrict(totalAmount));
            getnumber();

        }
        else {
            const api = DeleteSpthanhtoan(cart);
            dispatch(api)


        }
    };




    const handleCheckAllChange = (e) => {
        const isChecked = e.target.checked;
        setCheckedAll(isChecked);
        setCheckedItems(Array(ListCart.length).fill(isChecked));

        if (isChecked) {
            // Nếu tất cả được chọn, dispatch action cho tất cả sản phẩm
            ListCart.forEach(cart => {
                const api = AddSpthanhtoan(cart);
                dispatch(api);

            });

        } else {
            // Nếu không có sản phẩm nào được chọn, dispatch action xóa cho tất cả
            ListCart.forEach(cart => {
                const api = DeleteSpthanhtoan(cart);
                dispatch(api);
            });
        }

    };


    const handleInputClick = () => {

        setShowPopup(true);
    };
    const measuredRef = useCallback(node => {
        if (node !== null) {
            node.innerHTML = '123';
        }
    }, [totalAmount]);


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
        } catch (error) {

        } finally {
            setIsModalAddOpen(false);
        }
    }

    useEffect(() => {

        fechdistrict(totalweight, totalheight, totallength, totalwidth);

    }, [totalAmount]);




    useEffect(() => {

        console.log('cart run')

        InformationUser()
        setCheckedItems(Array(ListCart.length).fill(false));
        dispatch(CallAPI_Cart(userId))
        fetchVouchers();

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


    return (
        <>
            <div className="container-fluid">

                <div className="diachi col-12 mx-auto">
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
                                <div >
                                    {addressList.map((address, index) => {
                                        return <div className="mt-2 py-2 ps-2" key={address.dia_chiID} style={{ border: '1px solid #d4d7de' }}>

                                            <div className="d-flex align-items-center" style={{ height: '40px' }}>
                                                <img width={32} height={32} src="https://img.icons8.com/windows/32/user-male-circle.png" alt="user" className="icon" />
                                                <p style={{ fontWeight: 'bold', margin: '0', paddingRight: '50px' }}>Thông tin người nhận:</p>
                                                <p style={{ margin: '0' }} >{address.users.hovaten} | {address.users.so_dien_thoai}</p>
                                            </div>
                                            <div className="d-flex align-items-center" style={{ height: '40px' }}>
                                                <img width={32} height={32} src="https://img.icons8.com/windows/32/home.png" alt="home" className="icon" />
                                                <p style={{ fontWeight: 'bold', margin: '0', paddingRight: '80px' }}>Địa chỉ giao hàng:</p>
                                                <p style={{ margin: '0' }}>{address.dia_chi}</p>
                                            </div>

                                            {AddressCurrent?.dia_chiID !== address.dia_chiID ? <div className="d-flex align-items-center" style={{ height: '60px' }}>
                                                <button onClick={() => {
                                                    const dataJSON = JSON.stringify(address);


                                                    localStorage.setItem('addressCurent', dataJSON);
                                                    SetaddressCurrent(JSON.parse(localStorage.getItem('addressCurent')))
                                                }} className="btn btn-primary m-3">Dùng địa chỉ này</button>
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
                    </div>
                </div>

                <div className="col-12 mx-auto sanphamvakhuyenmai d-flex justify-content-between">
                    <div className="sanpham col-7">
                        <div className="tieudesanpham col-12">
                            <p>Tất cả sản phẩm ({ListCart.length})</p>
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
                                    const clear = ClearCart();
                                    dispatch(clear)
                                }} style={{ paddingLeft: '115px' }} />
                            </div>
                        </div>

                        {ListCart.map((cart, index) => {
                            return <div className="col-12 cardgiohang d-flex align-items-start" key={index}>
                                <Checkbox
                                    checked={checkedItems[index]}
                                    onChange={handleCheckItemChange(index, cart)}

                                    style={{ paddingLeft: '10px', paddingBottom: '140px' }}
                                />
                                <div>
                                    <div className="d-flex">
                                        <img width={150} height={150} src={`/images/${cart.sanpham.hinhanh[0].ten_hinh}`} alt="Sản phẩm" />
                                        <p className="text-center" style={{ width: '300px' }}>{cart.sanpham.ten_san_pham}</p>
                                    </div>

                                </div>

                                <div className="chitietgiatien d-flex flex-column align-items-center justify-content-center">
                                    <p style={{ fontSize: '20px', fontWeight: 'bolder' }}> {(cart.sanpham.gia_km > 0 ? cart.so_luong * cart.sanpham.gia_km : cart.so_luong * cart.sanpham.gia_goc).toLocaleString()}     </p>
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
                                                quantity: cart.so_luong,
                                                userId: userId,
                                                productId: cart.sanpham.san_phamId,
                                                idcart: cart.id
                                            })
                                            dispatch(increase)


                                        }} type="default" size="small">-</Button>
                                        <span style={{ margin: '0 10px' }}>{cart.so_luong}</span>
                                        <Button onClick={() => {
                                            const increase = increaseItem({
                                                idcart: cart.id,
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
                                    <p style={{ color: '#777e90', margin: '0' }}>Tối đa 127 sản phẩm </p>
                                </div>
                                <DeleteOutlined onClick={() => {
                                    const remove = removeItem({ idcart: cart.id, userId });
                                    dispatch(remove);

                                }} style={{ paddingTop: '70px', paddingLeft: '65px' }} />
                            </div>
                        })}


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
                                            {vouchers.map((voucher, index) => (
                                                <Col key={voucher.voucherID} sm={6} md={4}>
                                                    <Card className="mb-3">
                                                        <Card.Img variant="top" src={`/images/${voucher.hinh_anh}`} />
                                                        <Card.Body>
                                                            <Card.Title>Giảm: {voucher.so_tien_giam} VND</Card.Title>
                                                            <Card.Text>Hạn sử dụng: {voucher.han_su_dung}</Card.Text>


                                                            <button ref={ref => btnforapplyvoucher.current[index] = ref} className="btn btn-primary voucher-btn"
                                                                onClick={() => {
                                                                    applyVoucher(voucher, index, totalAmount, shipvalue);
                                                                }}
                                                            >
                                                                Áp dụng
                                                            </button>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
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
                                <div ref={shippingfee} className="fw-bolder">
                                    {shipvalue.toLocaleString()} ₫
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center" style={{ height: '45px' }}>
                                <div>
                                    <p style={{ margin: '0', fontWeight: 'bolder' }}>Thành tiền</p>
                                </div>
                                <div className="fw-bolder amount" style={{ color: 'red' }}>
                                    {shipvalue_discount > 0 ? (shipvalue_discount).toLocaleString() : (totalAmount + shipvalue).toLocaleString()} ₫
                                </div>
                            </div>
                            <div className="col-12 mt-2 thanhtoan" >
                                <NavLink to="/thanhtoan">
                                    <button disabled={ListSPChecked.length === 0} style={{
                                        width: '100%', height: '45px',
                                        borderRadius: '5px', border: 'none',
                                        backgroundColor: ListSPChecked.length === 0 ? 'black' : 'red',
                                        color: 'white', fontWeight: 'bolder'
                                    }}>Thanh toán</button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}
export default Cart;