import React from "react";
import { useEffect, useState } from "react";
import { json, NavLink, useNavigate } from "react-router-dom";
import { Checkbox, Button, Modal, Input, Select } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, UserOutlined, PhoneOutlined, HomeOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { ClearCart, DecreaseItem, IncreaseItem, addtotal, RemoveItem, addtotalweight, addvoucher2, addtotalheight, addtotallength, addtotalwidth, addtotalafterdiscount, AddSpthanhtoan, Clear, DecreaseSpthanhtoan, adddiscount, DeleteSpthanhtoan, IncreaseSpthanhtoan, RemoveSpthanhtoan, addvoucher, Thanhtoan, CallAPI_Cart, increaseItem, decreaseItem, removeItem, clearItem } from "../Reducer/cartReducer";
import axios from "axios";
import Swal from 'sweetalert2'
import { Card, Col, Container, Row } from 'react-bootstrap'; import { toast } from 'react-toastify';
const { confirm } = Modal;


function Cart() {
    const userId = localStorage.getItem('account_id');
    const ListCart = useSelector(state => state.cart.CartDatabase);
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
    const [voucherApplied, setvoucherApplied] = useState(false);
    const [selectedvoucher, setselectedvoucher] = useState({});
    const [vouchervalid, setvouchervalid] = useState(false);
    const [voucherindex, setvoucherindex] = useState(-1);



    let [ship, setship] = useState(0);
    let [click1, setclick1] = useState(-1);
    const [Ward, setWard] = useState(null);
    const [District, setDistrict] = useState(null);
    let [shipvalue, setshipvalue] = useState("");
    let [shipvalue_discount, setshipvalue_discount] = useState("");
    const btnforapplyvoucher = React.useRef([]);
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [listprovince, setlistprovince] = useState([]);
    const [listDistrict, setlistDistrict] = useState([]);
    const [listWard, setlistWard] = useState([]);
    const shippingfee = React.useRef(null);
    const [errormessage, seterrormessage] = useState('');
    let voucher = (localStorage.getItem('voucher'));
    let formatnumber;
    const ListSPChecked = useSelector(state => state.cart.ListSpthanhtoan) || [];
    const product_id_params = ListSPChecked.map(item => item.sanPham.san_phamId);
    const navigate = useNavigate();



    const showSwal = () => {
        Swal.fire({
            title: 'Có lỗi đã xảy ra',
            text: errormessage + 'Vui lòng thử lại!',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }

    const handleToggle = (index) => {
        const newChecked = [...isChecked];
        newChecked[index] = !newChecked[index]; // Đảo trạng thái chỉ phần tử được nhấn
        setIsChecked(newChecked); // Cập nhật lại state

    };




    const info = () => {
        Modal.info({
            title: 'Có lỗi đã xảy ra',
            content: (
                <div>
                    <p className="h1"> {errormessage} </p>
                </div>
            ),
            onOk() { },
        });
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
            iduser: userId,
            province: 202,
            district: District,
            ward: Ward
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

    const checkvalidvoucher = async () => {
        const jsonparsevoucher = JSON.parse(voucher);
        if (jsonparsevoucher != null) {
            const object = JSON.parse(localStorage.getItem('voucher'));
            const response = await axios({ url: `http://localhost:8080/checkifvoucherisvalid?voucherId=${object.voucherID}&accountID=${userId}&amount=${totalAmount}`, method: 'POST' });
            const respone2 = await axios({
                url: `http://localhost:8080/checkifproductsarevalid?selectedproductid=${product_id_params}`,
                method: "POST",
            })

            if (jsonparsevoucher != null) {
                if (!response.data) {

                    seterrormessage(errormessage.includes("Voucher đã hết hạn hoặc hết số lần sử dụng!") ? errormessage + "" : errormessage + "Voucher đã hết hạn hoặc hết số lần sử dụng!");
                    return false;
                }
                if (respone2.data.length != 0) {
                    seterrormessage(errormessage.includes("Sản phẩm đã hết hàng  ") ? errormessage + "" : errormessage + " Sản phẩm đã hết hàng ");
                    return false;
                }
                if (response.data && respone2.data.length === 0) {
                    return true;
                }
            }
        } else {
            const respone2 = await axios({
                url: `http://localhost:8080/checkifproductsarevalid?selectedproductid=${product_id_params}`,
                method: "POST",
            })
            if (respone2.data.length != 0) {
                seterrormessage(errormessage.includes("Sản phẩm đã hết hàng  ") ? errormessage + "" : errormessage + " Sản phẩm đã hết hàng ");
                return false;
            }
            if (respone2.data.length === 0) {
                return true;
            }
        }
        return false
    }

    function resultcheckcart() {
        return checkvalidvoucher().
            then(function (response) {
                var userid = JSON.parse(response);
                userid ? voucherApplied ? navigate('/thanhtoan') : navigatetoCart() : showSwal();
            });
    }
    const navigatetoCart = () => {
        localStorage.setItem('discount', 0);
        localStorage.setItem('total_after', JSON.stringify(0));
        const api = adddiscount(0);
        dispatch(api);
        const api2 = addtotalafterdiscount(JSON.stringify(0));
        dispatch(api2);
        navigate('/thanhtoan')
    }





    const totalAmount = Array.isArray(ListSPChecked)
        ? ListSPChecked.reduce((total, Spthanhtoan) => {
            const price = Spthanhtoan.sanPham.gia_km > 0 ? Spthanhtoan.sanPham.gia_km : Spthanhtoan.sanPham.gia_goc;
            return total + (Spthanhtoan.soLuong * price);
        }, 0)
        : 0;
    const totallength = Array.isArray(ListSPChecked)
        ? ListSPChecked.reduce((total, Spthanhtoan) => {
            return total + Spthanhtoan.sanPham.chieu_dai;
        }, 0)
        : 0;
    const totalheight = Array.isArray(ListSPChecked)
        ? ListSPChecked.reduce((total, Spthanhtoan) => {
            return total + Spthanhtoan.sanPham.chieu_cao;
        }, 0)
        : 0;
    const totalweight = Array.isArray(ListSPChecked)
        ? ListSPChecked.reduce((total, Spthanhtoan) => {
            return total + Spthanhtoan.sanPham.khoi_luong;
        }, 0)
        : 0;
    const totalwidth = Array.isArray(ListSPChecked)
        ? ListSPChecked.reduce((total, Spthanhtoan) => {
            return total + Spthanhtoan.sanPham.chieu_rong;
        }, 0)
        : 0;


    const applyVoucher = (selectedvoucher, index, a, b) => {
        setvoucherindex(index);
        const api = addvoucher(selectedvoucher);
        dispatch(api);
        localStorage.setItem('voucher', JSON.stringify(selectedvoucher));
        setIsModalVoucherOpen(false)

        const nodeList = document.querySelectorAll(".voucher-btn");
        const amount = document.querySelectorAll(".amount")

        // console.log('h', a, b);
        // console.log(parseFloat(amount[0].innerHTML.substring(0, amount[0].innerHTML.length - 1)));
        // console.log(amount[0].innerHTML.substring(amount[0].innerHTML.indexOf(',') + 1, amount[0].innerHTML.length));
        const stringtemp = parseInt(amount[0].innerHTML.substring(0, amount[0].innerHTML.length - 1)) * 1000;
        // console.log(index);
        if (!voucherApplied) {
            for (let i = 0; i < nodeList.length; i++) {
                nodeList[i].disabled = true;
                nodeList[index].disabled = false;
            }
            setvoucherApplied(true)
            btnforapplyvoucher.current[index].innerHTML = "Đã áp dụng"
            setvoucherindex(index);
            let total = (a + b) - selectedvoucher.so_tien_giam;
            console.log('discount', total);
            setshipvalue_discount(total)
            setclick1(index);
            localStorage.setItem('total_after', JSON.stringify(total));
            localStorage.setItem('discount', parseInt(selectedvoucher.so_tien_giam));
            const api = adddiscount(parseInt(selectedvoucher.so_tien_giam));
            dispatch(api);
            const api2 = addtotalafterdiscount(JSON.stringify(total));
            dispatch(api2);
            console.log("ship_discount", total);
            console.log("shipvalue", shipvalue);
        } else {
            localStorage.setItem('voucher', null);

            const api = addvoucher("");
            dispatch(api);

            const api2 = adddiscount(0);
            dispatch(api2);
            const api3 = addtotalafterdiscount(0);
            dispatch(api3);

            setvoucherApplied(false)
            localStorage.setItem('discount', 0);
            localStorage.setItem('total_after', JSON.stringify(0));
            for (let i = 0; i < nodeList.length; i++) {
                nodeList[i].disabled = false;
                nodeList[index].disabled = false;
            }
            btnforapplyvoucher.current[index].innerHTML = "Áp dụng"
            setshipvalue_discount(0)
        }




    };

    const checkamounttotal = () => {

        try {
            console.log('run', voucherindex);
            const voucher = JSON.parse(localStorage.getItem('voucher'));
            if (totalAmount < voucher.don_hang_toi_thieu) {
                btnforapplyvoucher.current[voucherindex].innerHTML = "Áp dụng"
                btnforapplyvoucher.current[voucherindex].disabled = true;
                setvoucherApplied(false);
                localStorage.setItem('voucher', null);
                setvoucherindex(-1);

                localStorage.setItem('discount', 0);
                localStorage.setItem('total_after', JSON.stringify(0));
                const api = adddiscount(0);
                dispatch(api);
                const api2 = addtotalafterdiscount(JSON.stringify(0));
                dispatch(api2);
                setshipvalue_discount(0)
            }
        } catch (error) {

        }

    }
    const disabledbutton = (don_hang_toi_thieu, index, totalAmount) => {
        if (don_hang_toi_thieu >= totalAmount && index != voucherindex) {
            return true;
        } else if (voucherApplied && index != voucherindex) {
            return true;
        }
    }


    const onChange = (value) => {
        const address = document.querySelector('input[id^=ward]').value;
        console.log('ward selected', address)
        console.log(`selected ${value}`);
    };
    const onChangeDistrict = (value) => {
        try {
            console.log(value);
            fechtWard(value.value);
            setDistrict(value.label + '-' + value.value);
            const address = document.querySelector('.ant-select-selection-item');
            address.innerHTML = " ";
            console.log(address);
        }
        catch (error) {
            console.log(error)
        }
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
            const response = await axios.get(`http://localhost:8080/api/vouchernotbeingused/${userId}`);
            setVouchers(response.data);

        } catch (error) {
            console.error('Error loading vouchers:', error);
        } finally {
            setLoading(false);
        }
    };
    const apishippingfee = async (a, b, c, d) => {
        // console.log('fee', a, b, c, d);
        if (a != 0) {
            const res = await axios({
                url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', method: 'POST',
                headers: {
                    'Token': "b20158be-5619-11ef-8e53-0a00184fe694",
                    'ShopId': 193308,
                    'Content-Type': 'application/json',
                }, data: {
                    "token": "b20158be-5619-11ef-8e53-0a00184fe694",
                    "shop_id": 193308,
                    "service_type_id": 2,
                    "service_id": 53320,
                    "insurance_value": 100000,
                    "coupon": null,
                    "cod_failed_amount": 2000,
                    "from_district_id": 1449,
                    "from_ward_code": "20706",
                    "to_district_id": parseInt((addressCurent.quan).substring(addressCurent.quan.indexOf('-') + 1, addressCurent.quan.length)),
                    "to_ward_code": (addressCurent.phuong).substring(addressCurent.phuong.indexOf('-') + 1, addressCurent.phuong.length),
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
            localStorage.setItem('shippingfee', res.data.data.total);
            formatnumber = res.data.data.total.format(0, 3, '.', ',');
        }
    };


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
    const fetchpool = async () => {
        const res = await axios({
            url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/station/get', method: 'POST',
            headers: {
                "Token": "b20158be-5619-11ef-8e53-0a00184fe694",
                "Content-Type": "application/json"
            }, data: {
                "district_id": 1449,
                "ward_code": "20706",
                "offset": 0,
                "limit": 1000

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
    }

    Number.prototype.format = function (n, x, s, c) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
            num = this.toFixed(Math.max(0, ~~n));

        return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
    };

    const dispatch = useDispatch();
    dispatch(Thanhtoan(ListSPChecked))

    const handleCheckAllChange = (e) => {
        const isChecked = e.target.checked;
        setCheckedAll(isChecked);
        const newCheckedItems = ListCart.gioHangChiTiet.map(cart => cart.sanPham.so_luong > 0 ? isChecked : false);
        setCheckedItems(newCheckedItems);
        if (isChecked) {
            localStorage.setItem('totalamount', JSON.stringify(totalAmount));
            ListCart.gioHangChiTiet.forEach(cart => {
                if (cart.sanPham.so_luong > 0) {
                    const api = AddSpthanhtoan(cart);
                    dispatch(api);
                }
            });
        } else {
            localStorage.setItem('totalamount', JSON.stringify(totalAmount));
            ListCart.gioHangChiTiet.forEach(cart => {
                if (cart.sanPham.so_luong > 0) {
                    const api = DeleteSpthanhtoan(cart);
                    dispatch(api);
                }
            });

        }
    };
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        iconColor: 'white',
        customClass: {
          popup: 'colored-toast',
        },
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      })

      const ToastFire = () => {
        Toast.fire({
            icon: 'error',
            title: `Bạn đã chọn hết sản phẩm !`,
          })
      }

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
        if (checkedItems.length !== ListCart.gioHangChiTiet?.length) {
            setCheckedItems(new Array(ListCart.gioHangChiTiet?.length).fill(false));
            setCheckedAll(false); // Reset lại checkedAll khi số lượng sản phẩm thay đổi
        }
    }, [ListCart.gioHangChiTiet]);

    useEffect(() => {
        console.log("voucherApplied :", voucherApplied);
        console.log("voucherindex :", voucherindex);
        const voucher = localStorage.getItem('voucher') == null ? JSON.parse(localStorage.getItem('voucher')) : JSON.parse(localStorage.getItem('voucher'));
        if (voucher !== null) {
            console.log("Không có voucher");
            checkamounttotal();
        }
        localStorage.setItem('totalamount', JSON.stringify(totalAmount));
        const api = addtotal(totalAmount);
        dispatch(api);


        apishippingfee(totalweight, totallength, totalwidth, totalheight);

        const api3 = addtotalweight(totalweight);
        const api4 = addtotallength(totallength);
        const api5 = addtotalwidth(totalwidth);
        const api6 = addtotalheight(totalheight);
        dispatch(api3);
        dispatch(api4);
        dispatch(api5);
        dispatch(api6);
        localStorage.setItem("totalweight", totalweight);
        localStorage.setItem("totallength", totallength);
        localStorage.setItem("totalwidth", totalwidth);
        localStorage.setItem("totalheight", totalheight);

    }, [totalAmount]);

    useEffect(() => {
    }, [Ward, District]);

    useEffect(() => {
    }, [selectedvoucher]);


    useEffect(() => {
        localStorage.setItem('voucher', null);
        InformationUser()
        fetchVouchers();
        fechdistrict();
        fechtProvince();
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
                                            <p style={{ margin: '0' }} >{address.users.hovaten} | {address.users.so_dien_thoai}</p>
                                        </div>
                                        <div className="" style={{ height: '40px' }}>
                                            <div className="d-flex align-items-center">
                                                <img width={32} height={32} src="https://img.icons8.com/windows/32/home.png" alt="home" className="icon" />
                                                <p style={{ fontWeight: 'bold', margin: '0', paddingRight: '80px' }}>Địa chỉ giao hàng:</p>
                                                <p style={{ margin: '0' }}>{address.dia_chi}, {(address.phuong)?.substring(0, (address.phuong)?.indexOf('-'))},  {(address.quan)?.substring(0, (address.quan)?.indexOf('-'))} , {address.thanh_pho === "202" ? 'Hồ Chi Minh' : address.thanh_pho}</p>
                                            </div>
                                        </div>
                                        {AddressCurrent?.dia_chiID !== address.dia_chiID ? <div className="d-flex align-items-center" style={{ height: '60px' }}>
                                            <button onClick={() => {
                                                const dataJSON = JSON.stringify(address);
                                                localStorage.setItem('addressCurent', dataJSON);
                                                SetaddressCurrent(JSON.parse(localStorage.getItem('addressCurent')))
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

                                {AddressCurrent?.users?.so_dien_thoai == "" ? <div className="mb-3">
                                    <label style={{ fontWeight: 'bold' }} htmlFor="">Số điện thoại <span style={{ color: 'red' }}>*</span></label>
                                    <Input size="large" name="phone" placeholder="Chưa có số điện thoại" type="number" prefix={<PhoneOutlined />} />
                                </div> : <div className="mb-3">
                                    <label style={{ fontWeight: 'bold' }} htmlFor="">Số điện thoại <span style={{ color: 'red' }}>*</span></label>
                                    <Input size="large" name="phone" type="number" placeholder="Nhập số điện thoại" value={AddressCurrent?.users?.so_dien_thoai} prefix={<PhoneOutlined />} />
                                </div>}

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
                                        {/* <Select
                                            showSearch

                                            placeholder="Tỉnh/Thành Phố"
                                            optionFilterProp="label"
                                            onChange={onChange}
                                            id="province"
                                            disabled
                                            onSearch={onSearch}
                                            defaultValue="Thành phố Hồ Chí Minh"
                                            options={[
                                                {
                                                    value: '202',
                                                    label: 'Thành phố Hồ Chí Minh',
                                                },

                                            ]}
                                        /> */}
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
                        <p className="noidung" style={{ paddingLeft: '293px' }}>Phường Tân Phong,Quận 7,Hồ Chí Minh</p>
                    </div>
                    {AddressCurrent?.dia_chi != "" && AddressCurrent?.users?.hovaten != "" && AddressCurrent?.users?.so_dien_thoai != "" ?
                        <></>
                        : <div className="d-flex align-items-center" style={{ height: '40px' }}>


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
                        return <div className={`col-12 cardgiohang d-flex align-items-start ${cart.sanPham?.so_luong == 0 || cart.sanPham.hoat_dong === "Off" ? 'disabled-div' : ''}  `} key={index}>
                            <Checkbox
                                checked={checkedItems[index]}
                                onChange={handleCheckItemChange(index, cart)}

                                style={{ paddingLeft: '10px', paddingBottom: '140px' }}
                            />
                            <div>
                                <div className="d-flex position-relative">
                                    {cart.sanPham.hoat_dong === 'Off' && cart.sanPham.so_luong == 0 && (
                                        <>
                                            <div className="out-of-stock">Không khả dụng</div>
                                            <Button
                                                className="btn-interactive "
                                                onClick={() => {
                                                    const remove = removeItem({
                                                        idcart: cart.id,
                                                        userId,
                                                        idsanpham: cart.sanPham.san_phamId,
                                                    });
                                                    dispatch(remove);
                                                }}
                                            >
                                                Xóa
                                            </Button>
                                        </>
                                    )}
                                    {cart.sanPham.hoat_dong === 'Off' && cart.sanPham.so_luong != 0 && (
                                        <>
                                            <div className="out-of-stock">Không khả dụng</div>
                                            <Button
                                                className="btn-interactive "
                                                onClick={() => {
                                                    const remove = removeItem({
                                                        idcart: cart.id,
                                                        userId,
                                                        idsanpham: cart.sanPham.san_phamId,
                                                    });
                                                    dispatch(remove);
                                                }}
                                            >
                                                Xóa
                                            </Button>
                                        </>
                                    )}



                                    {cart.sanPham.so_luong === 0 && cart.sanPham.hoat_dong === 'On' && (
                                        <>
                                            <div className="out-of-stock">Hết hàng</div>
                                            <Button
                                                className="btn-interactive "
                                                onClick={() => {
                                                    const remove = removeItem({
                                                        idcart: cart.id,
                                                        userId,
                                                        idsanpham: cart.sanPham.san_phamId,
                                                    });
                                                    dispatch(remove);
                                                }}
                                            >
                                                Xóa
                                            </Button>
                                        </>
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


                                            // alert(`Trong shop còn ${cart.sanPham.so_luong} sản phẩm thêm ăn cc à`);
                                            ToastFire(cart.sanPham.so_luong);
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
                                        {vouchers.map((voucher, index) => (
                                            <Col key={voucher.voucherID} sm={6} md={2}>
                                                <Card className="mb-3 " >
                                                    <Card.Img variant="top" src={`/images/${voucher.hinh_anh}`} />
                                                    <Card.Body style={{ height: '320px' }}>
                                                        <Card.Title>Giảm: {voucher.so_tien_giam} VND</Card.Title>
                                                        <Card.Title>Đơn thiểu để dùng: {voucher.don_hang_toi_thieu.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} </Card.Title>
                                                        {voucher.don_hang_toi_thieu > totalAmount ? <Card.Text>Cần mua thêm: {voucher.don_hang_toi_thieu - totalAmount}</Card.Text> : null}
                                                        <Card.Text>Hạn sử dụng: {voucher.han_su_dung}</Card.Text>
                                                        <Card.Text>Lượt dùng còn lại: {voucher.so_luong - voucher.so_luot_SD} lần</Card.Text>
                                                    </Card.Body>

                                                    <button
                                                        disabled={disabledbutton(voucher.don_hang_toi_thieu, index, totalAmount)} ref={ref => btnforapplyvoucher.current[index] = ref}
                                                        className="btn btn-primary voucher-btn"
                                                        onClick={() => {
                                                            console.log("don hang toi thieu:", voucher.don_hang_toi_thieu);
                                                            console.log("totalAmount:", totalAmount);
                                                            applyVoucher(voucher, index, totalAmount, shipvalue);
                                                            setselectedvoucher(voucher);
                                                        }}
                                                    >
                                                        Áp dụng
                                                    </button>
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
                                {totalAmount.toLocaleString()} ₫
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
                                {shipvalue_discount > 0 ? (shipvalue_discount).toLocaleString() : totalAmount > 0 ? (totalAmount + shipvalue).toLocaleString() : totalAmount.toLocaleString()} ₫
                            </div>
                        </div>
                        <div className="col-12 mt-2 thanhtoan" >

                            <button onClick={
                                () => {
                                    console.log("error:", errormessage);
                                    // if (!resultcheckcart()) {
                                    //     showSwal()
                                    //     console.log(resultcheckcart(),'fale');

                                    // } else {
                                    //     console.log(resultcheckcart(),'true');
                                    //     if (!voucherApplied) {
                                    //         localStorage.setItem('discount', 0);
                                    //         localStorage.setItem('total_after', JSON.stringify(0));
                                    //         navigate('/thanhtoan')
                                    //     } else {
                                    //         navigate('/thanhtoan')
                                    //     }
                                    // }
                                    resultcheckcart();
                                }
                            } disabled={ListSPChecked.length === 0 || AddressCurrent?.dia_chi == "" || AddressCurrent?.users?.hovaten == "" || AddressCurrent?.users?.so_dien_thoai == ""} style={{
                                width: '100%', height: '45px',
                                borderRadius: '5px', border: 'none',
                                backgroundColor: ListSPChecked.length === 0 || AddressCurrent?.dia_chi == "" || AddressCurrent?.users?.hovaten == "" || AddressCurrent?.users?.so_dien_thoai == "" ? 'black' : 'red',
                                color: 'white', fontWeight: 'bolder'
                            }}>Thanh toán</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Cart;