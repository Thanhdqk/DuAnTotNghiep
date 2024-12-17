import React from "react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { message, Select } from 'antd';
import { DeleteOutlined, EditOutlined, CreditCardOutlined, WalletOutlined } from '@ant-design/icons';
import axios from "axios";
import { Formik, useFormik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { QRCode } from 'antd';
import { styled } from "@mui/material";
import { clearListSpthanhtoan2 } from "../Reducer/cartReducer";
import Swal from 'sweetalert2'








const options = [
    {
        label: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img style={{ marginRight: '8px' }} width="24" height="24" src="https://img.icons8.com/office/40/wallet.png" alt="wallet" /> Thanh toán trực tiếp
            </div>
        ),
        value: '1',
    },
    {
        label: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img width={24} height={24} src="https://img.icons8.com/color/48/paypal.png" alt="" /> Paypal(giảm 5% giá trị sản phẩm)
            </div>
        ),
        value: '2',
    }, {
        label: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img width={24} height={24} src="images/vnpay.png" alt="" /> Ví Vnpay (giảm 5% giá trị sản phẩm)
            </div>
        ),
        value: '3',
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

    let shipfee = localStorage.getItem('shippingfee');

    useSelector(state => state.cart.ListSpthanhtoan2)

    let total =  useSelector(state => state.cart.total)
    let totalafterdiscount = useSelector(state => state.cart.totalafterdiscount)
    let voucher = useSelector(state => state.cart.voucher)
    let voucher2 = useSelector(state => state.cart.voucher2)
    let discount = useSelector(state => state.cart.discount)
    let totalweight= useSelector(state => state.cart.totalweight)
    let totallength= useSelector(state => state.cart.totallength)
    let totalwidth=useSelector(state => state.cart.totalwidth)
    let totalheight=useSelector(state => state.cart.totalheight)
    const AddressCurrent = localStorage.getItem('addressCurent') ? JSON.parse(localStorage.getItem('addressCurent')) : null;


    console.log('test', (((parseInt(total) + parseInt(shipfee)) * 0.00003951).toString()));
    console.log(Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
        ((parseInt(total) + parseInt(shipfee)) * 0.00003951)).toString());

    const dispatch = useDispatch();
    const [temptid, settemptid] = useState(1);
    const [ghichu, setghichu] = useState('');
    const [usingonlinepayment, setusingonlinepayment] = useState(false);
    const userId = localStorage.getItem('account_id');
    const selectedvoucher = localStorage.getItem('voucher') ? JSON.parse(localStorage.getItem('voucher')) : null;
    const [vouchervalid, setvouchervalid] = useState(false);
    const [urlforqrcode, seturlforqrcode] = useState('');
    const [donhangid, setdonhangid] = useState('');
    const [token, settoken] = useState("");
    const [errormessage, seterrormessage] = useState('');
    const [leadtime, setleadtime] = useState(0);
    const ListSPChecked = useSelector(state => state.cart.ListSpthanhtoan2) || [];
    console.log(ListSPChecked);
    const product_id_params = ListSPChecked.map(item => item.sanPham.san_phamId);
    const product_quantity_params = ListSPChecked.map(item => item.soLuong);
    console.log(product_id_params);
    console.log(ListSPChecked.map(item => item.soLuong));
    const totalAmount = Array.isArray(ListSPChecked)
        ? ListSPChecked.reduce((total, Spthanhtoan) => {
            const price = Spthanhtoan.sanPham.gia_km > 0 ? Spthanhtoan.sanPham.gia_km : Spthanhtoan.sanPham.gia_goc;
            return total + (Spthanhtoan.soLuong * price);
        }, 0)
        : 0;


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
                    seterrormessage(errormessage + "Voucher đã hết hạn hoặc hết số lần sử dụng!");
                }
                if (respone2.data.length != 0) {
                    seterrormessage(errormessage + " Sản phẩm đã hết hàng ");
                }
                if (response.data && respone2.data.length === 0) {
                    // alert("Thanh toán thanh công!");
                    create_ghn_order()
                    dispatch(clearListSpthanhtoan2());
                }
            }
        } else {
            const respone2 = await axios({
                url: `http://localhost:8080/checkifproductsarevalid?selectedproductid=${product_id_params}`,
                method: "POST",
            })
            if (respone2.data.length != 0) {
                seterrormessage(" Sản phẩm đã hết hàng ");
            }
            if (respone2.data.length === 0) {
                // alert("Thanh toán thanh công!");
                create_ghn_order()
                dispatch(clearListSpthanhtoan2());

            }
        }
    }
    const diachi = React.useRef(null);
    const shippingfee = React.useRef(null);
    const sodt = React.useRef(null);
    const btn = React.useRef(null);
    const btn3 = React.useRef(null);
    const [diachivalue, setdiachivalue] = useState("");
    const [diachivalue2, setdiachivalue2] = useState("");
    const [shipvalue, setshipvalue] = useState("");
    const [method, setmethod] = useState(1);
    const redirect = useNavigate();

    const btn3click = () => {
        redirect('/');
    }

    const data = {
        token: "b20158be-5619-11ef-8e53-0a00184fe694",
        shop_id: 193308,
        service_type_id: null,
        service_id: 53320,
        insurance_value: 100000,
        coupon: null,
        cod_failed_amount: 2000,
        from_district_id: 1454,
        from_ward_code: "21211",
        to_district_id: 1452,
        to_ward_code: "21012",
        weight: parseInt(15),
        length: parseInt(50),
        width: parseInt(50),
        height: parseInt(50),
        cod_value: parseInt(0),
    };
    const apishippingfee = async () => {
        const res = await axios({
            url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', method: 'POST',
            headers: {
                'Token': data.token,
                'Content-Type': 'application/json',
            }, data: JSON.stringify(data),

        }); setshipvalue(res.data.data.total);
        setdiachivalue(diachi.current.innerHTML);
        let firstindex = diachivalue.indexOf("tinh");
        console.log(firstindex);
        let diachitemp = diachivalue.substring(firstindex, diachivalue.lastIndexOf(','));
        let diachitemp2 = diachitemp.substring(diachitemp.indexOf(' ')).trim();
        console.log(diachitemp);
        console.log(diachitemp2);
        for (let i = 0; i < listprovince.length; i++) {
            if (listprovince[i].ProvinceName === diachitemp2) {
                console.log("tỉnh id", listprovince[i].ProvinceID);
                setdiachivalue2(listprovince[i].ProvinceID);
            }
        }
        let formatnumber = res.data.data.total.format(2, 3, '.', ',');;
    };



    // parseInt(totalAmount) + parseInt(shipfee), 
    const apipayment = async (id, paypalid) => {

        console.log('run save');
        console.log("method :", method);
        const res = await axios({
            url: `http://localhost:8080/createpayment?userid=${userId}&spid=${product_id_params}&quantity=${product_quantity_params}&total=${Math.round(checkfordiscount())}&method=${method}&paypalid=${paypalid}`, method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }, data: {
                'don_hangid': id,
                'trang_thai': method == "1" ? "Đang chờ xử lý" : "Chờ Thanh Toán",
                'ngay_tao': new Date(),
                'thoi_gianXN': null,
                'dia_chi': AddressCurrent.dia_chi,
                'so_dien_thoai': AddressCurrent.users.so_dien_thoai,
                'ghi_chu': ghichu ? ghichu : '',
                'phi_ship': shipfee,
                'voucher': JSON.parse(voucher),
                'tong_tien': checkfordiscount(),
                'thoi_gian_du_kien': leadtime.toString(),
                'online_payment_id': paypalid ? paypalid : null,
                'users': {
                    'accountID': AddressCurrent.users.accountID,
                },
                'diachi': {
                    'dia_chiID': AddressCurrent.dia_chiID
                },
                'phuongthuctt': {
                    'phuong_thucTTID': checkmethod()
                }
            }
        });
        if (method == 3) { window.open(res.data); seturlforqrcode(res.data); }

        console.log("Response tao don hang: ", res.data);
        setdonhangid(res.data.don_hangid);
        sendmail();

    }
    const sendmail = async () => {
        const res = await axios({
            url: `http://localhost:8080/sendmail?accountid=${userId}`, method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }, data: {

            }
        });
    }
    const checkmethod = () => {
        if (method == 1) {
            return "ptt01"
        } else if (method == 2) {
            return "ptt02"
        } else if (method == 3) {
            return "ptt03"
        }

    }

    Number.prototype.format = function (n, x, s, c) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
            num = this.toFixed(Math.max(0, ~~n));

        return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
    };

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

    const capturepayment = async (orderid) => {
        const res = await axios({
            url: `https://api-m.sandbox.paypal.com/v2/checkout/orders/69S924224Y991290R/capture`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }, data: {

            }
        });
    }

    const Calculate_the_expected_delivery_time = async () => {
        const res = await axios({
            url: `https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime`,
            method: 'POST',
            headers: {
                'Token': "b20158be-5619-11ef-8e53-0a00184fe694",
                'Content-Type': 'application/json',
            },
            data: {
                "from_district_id": 1454,
                "from_ward_code": "21211",
                "to_district_id": parseInt((AddressCurrent.quan).substring(AddressCurrent.quan.indexOf('-') + 1, AddressCurrent.quan.length)),
                "to_ward_code": (AddressCurrent.phuong).substring(AddressCurrent.phuong.indexOf('-') + 1, AddressCurrent.phuong.length),
                "service_id": 53320
            }


        });
        console.log(res.data);
        setleadtime(res.data.data.leadtime);
    }

    const askiftheywanttocontinue = () => {
        Swal.fire({
            title: "Thông báo về việc thanh toán thông qua VNpay!",
            text: "Khi thanh toán thông qua bán VNpay thì bạn sẽ không được hoàn tiền khi hủy đơn! Hãy xuy nghĩ kỹ",
            confirmButtonText: "Tiếp tục thanh toán",
            denyButtonText: `Don't save`
        })
    }


    const paypal_CreateOrder = async (id) => {
        console.log("create paypal order");
        console.log(getPaypalAccessToken());
        try {
            const res = await axios({
                url: `https://api-m.sandbox.paypal.com/v2/checkout/orders `, method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }, data: {
                    "intent": "AUTHORIZE",
                    "purchase_units": [
                        {
                            "amount": {
                                "currency_code": "USD",
                                "value": Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
                                    ((parseInt(total) + parseInt(shipfee)) * 0.00003951)).toString()
                            }
                        }
                    ],
                    "application_context": {
                        "return_url": "http://localhost:3000/paymentreturn",
                        "cancel_url": "http://localhost:3000/orderhistory",
                        "shipping_preference": "NO_SHIPPING",
                        "user_action": "PAY_NOW"
                    }
                }

            });
            if (method == '2') {
                if (res.data.status == 'CREATED') {
                    apipayment(id, res.data.id);
                    seturlforqrcode(res.data.links.find(link => link.rel === "approve").href);
                    localStorage.setItem('paypal_order_id', res.data.id);
                    console.log('paypal', res.data.links.find(link => link.rel === "approve").href);
                }
            }




        } catch (error) {

        }

    }

    const create_ghn_order = async () => {
        const res = await axios({
            url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create', method: 'POST',
            headers: {
                'Token': "b20158be-5619-11ef-8e53-0a00184fe694",
                'ShopId': 193308,
                'Content-Type': 'application/json',
            }, data: {
                "token": "b20158be-5619-11ef-8e53-0a00184fe694",
                "shop_id": 193308,
                "payment_type_id": 2,
                "note": "Tintest 123",
                "required_note": "KHONGCHOXEMHANG",
                "from_name": "ShopSnackcuaThanh",
                "from_phone": "0987654321",
                "from_address": " 123 Đường Nguyễn Văn Linh,Phường Tân Phong,Quận 7,Hồ Chí Minh,Vietnam",
                "from_ward_name": "Phường Tân Phong",
                "from_district_name": "Quận 7",
                "from_province_name": "HCM",
                "return_phone": "0933775144",
                "return_address": "39 NTT",
                "return_district_id": null,
                "return_ward_code": "",
                "client_order_code": "",
                "to_name": AddressCurrent.users.hovaten,
                "to_phone": AddressCurrent.users.so_dien_thoai,
                "to_address": AddressCurrent.dia_chi,
                "to_ward_code": (AddressCurrent.phuong).substring(AddressCurrent.phuong.indexOf('-') + 1, AddressCurrent.phuong.length),
                "to_district_id": parseInt((AddressCurrent.quan).substring(AddressCurrent.quan.indexOf('-') + 1, AddressCurrent.quan.length)),
                "cod_amount": 0,
                "content": "Theo New York Times",
                "weight": parseInt(totalweight),
                "length": parseInt(totallength),
                "width": parseInt(totalwidth),
                "height": parseInt(totalheight),
                "pick_station_id": null,
                "deliver_station_id": null,
                "insurance_value": 0,
                "service_id": 0,
                "service_type_id": 2,
                "coupon": null,
                "pick_shift": [2],
            },
        }).catch(error => {

        })
        console.log("ghn create data", res.data);

        if (res.data.code === 200) {
            if (method == "1") {
                console.log(res.data.data.order_code, 'id ghn');
                settemptid(temptid + 1);
                apipayment(res.data.data.order_code, null);
            }
            else if (method == "2") {
                console.log("run paypal");
                paypal_CreateOrder(res.data.data.order_code);
            }
            else {
                console.log(res.data.data.order_code, 'id ghn');
                apipayment(res.data.data.order_code, null);
            }
        }


    }

    const checkfordiscount = () => {
        if (discount > 0 && usingonlinepayment) {
            return (totalafterdiscount - ((totalafterdiscount * 5) / 100));
        }
        else if (discount > 0) {
            return totalafterdiscount;
        }
        else if (usingonlinepayment) {
            return ((parseInt(total) + parseInt(shipfee)) - (((parseInt(total) + parseInt(shipfee)) * 5) / 100));
        }
        else {
            return (parseInt(total) + parseInt(shipfee));
        }
    }





    useEffect(() => {
        // totalweight = localStorage.getItem('totalweight');
        // totallength = localStorage.getItem('totallength');
        // totalwidth = localStorage.getItem("totalwidth");
        // totalheight = localStorage.getItem("totalheight");
        // voucher = localStorage.getItem('voucher');

        // console.log(JSON.parse(voucher));
    }, [donhangid, totalAmount, vouchervalid]);
    useEffect(() => {
        console.log('voucher validation', vouchervalid);
    }, [vouchervalid])

    const returntocart = () => {
        return <NavLink className={"text-decoration-none "} to={"/cart"}> <span className={"text-decoration-none text-dark"}>Chưa chọn voucher ?</span>  Quay về giỏ hàng</NavLink>
    }


    useEffect(() => {
        const currentLocation = window.location.pathname;
        localStorage.setItem('currentLocation', currentLocation);
        api();
        // apishippingfee();
        getPaypalAccessToken();
        Calculate_the_expected_delivery_time();
        voucher2 = JSON.parse(localStorage.getItem('voucher'));
        shipfee = localStorage.getItem('shippingfee');
        total = localStorage.getItem('totalamount');
        totalafterdiscount = localStorage.getItem('total_after');
        discount = localStorage.getItem('discount');
        voucher = (localStorage.getItem('voucher'));
        console.log('method', method);

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
    }, [method, discount, voucher2, ListSPChecked]);


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
                        <p className="noidung" style={{ paddingLeft: '200px' }}>{AddressCurrent?.users?.hovaten} | {AddressCurrent?.users?.so_dien_thoai ? AddressCurrent?.users?.so_dien_thoai : <span className="text-danger fw-bold">Chưa nhập số điện thoại</span>}</p>
                    </div>
                    <div className="hangthuhai">
                        <img width={32} height={32} src="https://img.icons8.com/windows/32/home.png" alt="home" className="icon" />
                        <p className="tieude">Địa chỉ giao hàng:</p>
                        <p className="noidung" style={{ paddingLeft: '233px' }}>{AddressCurrent?.dia_chi ? AddressCurrent?.dia_chi
                            + "," + AddressCurrent.phuong.substring(0, AddressCurrent.phuong.indexOf('-'))
                            + "," + AddressCurrent.quan.substring(0, AddressCurrent.quan.indexOf('-')) + ", Hồ Chí Minh" :
                            <span className="text-danger fw-bold">Chưa nhập địa chỉ</span>}</p>
                    </div>

                    <div className="hangthuba">
                        <img width={32} height={32} src="https://img.icons8.com/fluency-systems-regular/50/online-store.png" alt="store" className="icon" />
                        <p className="tieude">Cửa hàng:</p>
                        <p className="noidung" style={{ paddingLeft: '293px' }}>Phường Tân Phong,Quận 7,Hồ Chí Minh</p>
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
                    {ListSPChecked.length != 0 ? ListSPChecked.map((sp, index) => {
                        return <div className="col-12 cardgiohang d-flex align-items-start" key={index}>
                            <div>
                                <div className="d-flex">
                                    <img width={150} height={150} src={`/images/${sp.sanPham.hinhanh[0].ten_hinh}`} alt="Sản phẩm" />
                                    <p style={{ width: '300px' }}>{sp.sanPham.ten_san_pham}</p>
                                </div>

                            </div>

                            <div className="chitietgiatien d-flex flex-column align-items-center justify-content-center">
                                <p style={{ fontSize: '20px', fontWeight: 'bolder' }}> {sp.sanPham.gia_km > 0 ? sp.soLuong * sp.sanPham.gia_km : sp.soLuong * sp.sanPham.gia_goc} </p>
                                <p style={{ color: '#777e90', margin: '0' }}>Số lượng: {sp.soLuong}</p>
                            </div>
                        </div>
                    }) : <div className="col-12 cardgiohang d-flex align-items-start" >
                        <div>
                            <div className="d-flex">
                                Không có sản phẩm vui lòng quay về  <Link to={`/cart/`} >
                                    giỏ hàng
                                </Link>
                            </div>
                        </div>
                    </div>
                    }
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
                            <input type="text" onChange={(e) => { setghichu(e.target.value); console.log(e.target.value) }} className="no-outline" placeholder="Thêm ghi chú" />
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
                                onChange={(value) => {
                                    setmethod(value)
                                    if (value == '3') {
                                        askiftheywanttocontinue()
                                    }
                                    if (value != '1') {
                                        setusingonlinepayment(true);
                                    } else {
                                        setusingonlinepayment(false);
                                    }
                                }}
                            />
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-4" style={{ height: '45px' }}>
                            <div>
                                <p style={{ margin: '0', color: '#777e90' }}>Tổng giá trị đơn hàng</p>
                            </div>
                            <div className="fw-bolder">
                                {(total).toLocaleString()} ₫
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center" style={{ height: '45px' }}>
                            <div>
                                <p style={{ margin: '0', color: '#777e90' }}>Voucher đã chọn</p>
                            </div>
                            <div className="fw-bolder">
                                {voucher2 ? voucher2.voucherID : returntocart()}
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center" style={{ height: '45px' }}>
                            <div>
                                <p style={{ margin: '0', color: '#777e90' }}>Phí vận chuyển</p>
                            </div>
                            <div className="fw-bolder">
                                {(shipfee).toLocaleString()} đ
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center" style={{ height: '45px' }}>
                            <div>
                                <p style={{ margin: '0', fontWeight: 'bolder' }}>Thành tiền</p>
                            </div>
                            <div className="fw-bolder" style={{ color: 'red' }}>
                                {checkfordiscount().toLocaleString()} đ

                                {/* {discount > 0 ? usingonlinepayment ? (totalafterdiscount - ((totalafterdiscount * 5) / 100)).toLocaleString() : (totalafterdiscount).toLocaleString() : (parseInt(total) + parseInt(shipfee)).toLocaleString()} ₫ */}
                            </div>

                        </div>
                        <div className="col-12 mt-2 thanhtoan" >
                            {errormessage.length > 0 ?
                                <Link to={`/cart/`} >  <button style={{
                                    width: '100%', height: '45px',
                                    borderRadius: '5px', border: 'none', backgroundColor: 'red',
                                    color: 'white', fontWeight: 'bolder'
                                }}>Trở về giỏ hàng</button> </Link> :
                                <button disabled={ListSPChecked.length == 0 ? true : false} className="thanhtoanbtn" data-bs-toggle="modal" data-bs-target="#exampleModal2" ref={btn} onClick={() => {
                                    if (userId.includes("null")) {
                                        redirect('/login');

                                    } else {
                                        const jsonparsevoucher = JSON.parse(voucher);
                                        console.log(jsonparsevoucher)
                                        checkvalidvoucher(voucher);
                                    }
                                }} style={{
                                    width: '100%', height: '45px',
                                    borderRadius: '5px', border: 'none', backgroundColor: 'red',
                                    color: 'white', fontWeight: 'bolder'
                                }}>{ListSPChecked.length == 0 ? "Vui lòng chọn sản phẩm ở giỏ hàng" : "Đặt hàng"}</button>}
                        </div>
                        {/* <div className="col-12 mt-2 thanhtoan" >
                            <button onClick={paypal_CreateOrder} style={{
                                width: '100%', height: '45px',
                                borderRadius: '5px', border: 'none', backgroundColor: 'red',
                                color: 'white', fontWeight: 'bolder'
                            }}>Đặt hàng</button>
                        </div> */}


                        <div>
                            <div className="modal fade" id="exampleModal2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} >
                                <div className="modal-dialog modal-dialog-centered" >
                                    <div className="modal-content">
                                        <div className="modal-header" style={{ borderBottom: 'none' }}>

                                            <div className='h2'>{errormessage.length > 0 ? errormessage : 'Đặt hàng thành công'}</div>
                                        </div>
                                        <div className='row text-center '>
                                            <div className="modal-body" >
                                                {method == 1 ?
                                                    <>
                                                        <button data-bs-dismiss="modal" className='btn btn-primary' onClick={() => {
                                                            redirect('/lịch-sử-đặt-hàng');
                                                        }}>
                                                            Chuyển tiếp đến trang đơn hàng
                                                        </button>
                                                    </>
                                                    : <>
                                                        <div className="col-12 ">
                                                            <QRCode
                                                                errorLevel="H"
                                                                value={urlforqrcode}
                                                                style={{ width: '100%', height: '100%' }}
                                                            />
                                                        </div>
                                                        <div className="col-12 mt-1">
                                                            <button className='btn btn-primary' data-bs-dismiss="modal" onClick={() => {
                                                                window.open(urlforqrcode, '_blank');
                                                                // window.open('about:blank', '_self');
                                                                window.close();
                                                            }}>
                                                                Chuyển tiếp đến trang thanh toán
                                                            </button>
                                                        </div>
                                                    </>
                                                }
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div>
                            <div className="modal fade" id="exampleModal2" tabIndex={-1} >
                                <div className="modal-dialog modal-dialog-centered" >
                                    <div className="modal-content">
                                        <div className="modal-header" style={{ borderBottom: 'none' }}>
                                            <div className='h2'>Đặt hàng thành công</div>
                                        </div>
                                        <div className="modal-footer text-center    ">
                                            <button ref={btn3} type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                                <Link to={`/lịch-sử-đặt-hàng/`} >
                                                    Xem Chi Tiết
                                                </Link>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Thanhtoan;