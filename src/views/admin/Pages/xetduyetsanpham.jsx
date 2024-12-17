import React, { useEffect, useState } from "react";
import { Table, Space } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { render } from "@testing-library/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ColumnGroup from "antd/es/table/ColumnGroup";

import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, Modal } from "antd";
import Swal from 'sweetalert2'


const fileList = [];

function Xetduyetsanpham() {
    const [image, setImage] = useState(null);
    const userId = localStorage.getItem("account_id");

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [dataSource, setdataSource] = useState([]);
    const [dataSource2, setdataSource2] = useState([]);
    const [dataSource3, setdataSource3] = useState([]);
    const [datahanhdong, setdatahanhdong] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [hinhAnh, setHinhAnh] = useState(null);
    const [change, setchange] = useState(0);

    const [yeucau, setyeucau] = useState("");
    const [noidung, setnoidung] = useState("");
    const [approvalstatus, setapprovalstatus] = useState(false);
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);

    const alertCurrent = () => {
        Swal.fire({
            icon: "error",
            title: "Sai thông tin đầu vào",
            text: "Phải nhập lý do từ chối mới có thể tiếp tục",
        });
    }

    const alertSuccess = () => {
        Swal.fire({
            icon: "success",
            title: "Thành công",
            text: "Thao tác đã được thực hiện",
        });
    }


    const showModal1 = () => {
        setIsModalOpen1(true);
    };

    const handleOk1 = () => {
        formik.submitForm();
        setIsModalOpen1(false);
    };

    const handleCancel1 = () => {

        setIsModalOpen1(false);
    };
    const showModal2 = () => {
        setIsModalOpen2(true);
    };

    const handleOk2 = () => {
        formik.submitForm();
        setIsModalOpen2(false);
    };

    const handleCancel2 = () => {
        setIsModalOpen2(false);
    };

    const formik = useFormik({
        initialValues: {
            ngay_tao: "",
            loai_yeu_cau: "",
            hoat_dong: "Đang hoạt động",
            noi_dung: "",
            feedback: "",
            hinh_anh: "",
            ghi_chu: "",
            users: "",
        },
        onSubmit: (values) => {
            approvalstatus ? dorespone(values) : values.ghi_chu ? dorespone2(values) : alertCurrent();
            console.log("first", values);
        },
    });

    const columns = [
        {
            title: "ID",
            dataIndex: "san_phamId",
            key: "san_phamId",
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "ten_san_pham",
            key: "ten_san_pham",
        },
        {
            title: "Ngày tạo",
            dataIndex: "ngay_tao",
            key: "ngay_tao",
        },
        {
            title: "Giá sản phẩm",
            dataIndex: "gia_goc",
            key: "gia_goc",
        },
        {
            title: "Số lượng nhập",
            dataIndex: "so_luong",
            key: "so_luong",
        },
        {
            title: "Hình ảnh",
            dataIndex: "hinhanh",
            key: "hinhanh",
            hidden: true,
        },
        {
            title: "Người gửi yêu cầu",
            dataIndex: "users",
            key: "users",
        },
        {
            title: "Nút",
            key: "nut",
            render: (_, record) => (
                <div>
                    {/* <button
                        className="btn btn-danger me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#phanhoimodal"
                        onClick={() => {
                            delete record.key;
                            setapprovalstatus(true);
                            formik.setValues({
                                san_phamId: record.san_phamId,
                                ten_san_pham: record.ten_san_pham,
                                ngay_tao: record.ngay_tao,
                                hinh_anh: record.hinh_anh,
                                ngay_tao: record.ngay_tao,
                                gia_goc: record.gia_goc,
                                so_luong: record.so_luong,
                                users: record?.users,
                            });
                        }}
                    >
                        Chấp nhận
                    </button>

                    <button
                        className="btn btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#tuchoimodal"
                        onClick={() => {
                            delete record.key;
                            setapprovalstatus(false);
                            formik.setValues({
                                san_phamId: record.san_phamId,
                                ten_san_pham: record.ten_san_pham,
                                ngay_tao: record.ngay_tao,
                                hinh_anh: record.hinh_anh,
                                ngay_tao: record.ngay_tao,
                                gia_goc: record.gia_goc,
                                so_luong: record.so_luong,
                                users: record?.users,
                            });
                        }}
                    >
                        Từ Chối
                    </button> */}
                    <Button className="me-1" type="primary" onClick={() => {
                        delete record.key;
                        setapprovalstatus(true);
                        formik.setValues({
                            san_phamId: record.san_phamId,
                            ten_san_pham: record.ten_san_pham,
                            ngay_tao: record.ngay_tao,
                            hinh_anh: record.hinh_anh,
                            ngay_tao: record.ngay_tao,
                            gia_goc: record.gia_goc,
                            so_luong: record.so_luong,
                            users: record?.users,
                        });
                        showModal1();
                    }}>
                        Duyệt
                    </Button>
                    <Button type="primary" onClick={() => {
                        delete record.key;
                        setapprovalstatus(false);
                        formik.setValues({
                            san_phamId: record.san_phamId,
                            ten_san_pham: record.ten_san_pham,
                            ngay_tao: record.ngay_tao,
                            hinh_anh: record.hinh_anh,
                            ngay_tao: record.ngay_tao,
                            gia_goc: record.gia_goc,
                            so_luong: record.so_luong,
                            users: record?.users,
                        });
                        showModal2();
                    }}>
                        Từ chối
                    </Button>
                </div>
            ),
        },
    ];

    const columnHanhdongs = [
        {
            title: "ID",
            dataIndex: "san_phamId",
            key: "san_phamId",
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "ten_san_pham",
            key: "ten_san_pham",
        },

        {
            title: "Giá sản phẩm",
            dataIndex: "gia_goc",
            key: "gia_goc",
        },
        {
            title: "Số lượng nhập",
            dataIndex: "so_luong",
            key: "so_luong",
        },
        {
            title: "Hình ảnh",
            dataIndex: "hinhanh",
            key: "hinhanh",
            hidden: true,
        },
        {
            title: "Người gửi yêu cầu",
            dataIndex: "users",
            key: "users",
        },
        {
            title: "Ngày thực hiện",
            dataIndex: "ngay_tao",
            key: "ngay_tao",
        },
        {
            title: "Người thực hiện",
            dataIndex: "personwhodid",
            key: "personwhodid",
        },

        {
            title: "hanhdong",
            dataIndex: "hanhdong",
            key: "hanhdong",
        },
    ];
    const columnrespone = [
        {
            title: "ID",
            dataIndex: "san_phamId",
            key: "san_phamId",
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "ten_san_pham",
            key: "ten_san_pham",
        },
        {
            title: "Ngày tạo",
            dataIndex: "ngay_tao",
            key: "ngay_tao",
        },
        {
            title: "Giá sản phẩm",
            dataIndex: "gia_goc",
            key: "gia_goc",
        },
        {
            title: "Số lượng nhập",
            dataIndex: "so_luong",
            key: "so_luong",
        },
        {
            title: "Hình ảnh",
            dataIndex: "hinhanh",
            key: "hinhanh",
            hidden: true,
        },
        {
            title: "Người gửi yêu cầu",
            dataIndex: "users",
            key: "users",
        },
        // {
        //     title: 'Nút',
        //     key: 'nut',
        //     render: (_, record) => (
        //         <div>

        //             <button className='btn btn-danger me-2' data-bs-toggle="modal" data-bs-target="#chitietmodal" onClick={() => {
        //                 formik2.setValues(
        //                     {
        //                         responseID: record.responseID,
        //                         han_su_dung: record.hansudung,
        //                         ngay_tao: record.ngay_tao,
        //                         loai_yeu_cau: record.loai_yeu_cau,
        //                         noi_dung: record.noi_dung,
        //                         users: record.users,
        //                         hinh_anh: record.hinh_anh,
        //                         feedback: record.feedback,
        //                         noi_dung_feedback: record.noi_dung_feedback
        //                     }
        //                 );

        //             }} >Xem chi tiết </button>

        //         </div>
        //     )
        // },
    ];
    const columnrespone2 = [
        {
            title: "ID",
            dataIndex: "san_phamId",
            key: "san_phamId",
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "ten_san_pham",
            key: "ten_san_pham",
        },
        {
            title: "Ngày tạo",
            dataIndex: "ngay_tao",
            key: "ngay_tao",
        },
        {
            title: "Giá sản phẩm",
            dataIndex: "gia_goc",
            key: "gia_goc",
        },
        {
            title: "Số lượng nhập",
            dataIndex: "so_luong",
            key: "so_luong",
        },
        {
            title: "Lý do từ chối",
            dataIndex: "ghi_chu",
            key: "ghi_chu",
        },
        {
            title: "Hình ảnh",
            dataIndex: "hinhanh",
            key: "hinhanh",
            hidden: true,
        },
        {
            title: "Người gửi yêu cầu",
            dataIndex: "users",
            key: "users",
        },
        // {
        //     title: 'Nút',
        //     key: 'nut',
        //     render: (_, record) => (
        //         <div>

        //             <button className='btn btn-danger me-2' data-bs-toggle="modal" data-bs-target="#chitietmodal" onClick={() => {
        //                 formik2.setValues(
        //                     {
        //                         responseID: record.responseID,
        //                         han_su_dung: record.hansudung,
        //                         ngay_tao: record.ngay_tao,
        //                         loai_yeu_cau: record.loai_yeu_cau,
        //                         noi_dung: record.noi_dung,
        //                         users: record.users,
        //                         hinh_anh: record.hinh_anh,
        //                         feedback: record.feedback,
        //                         ghi_chu:record.ghi_chu,
        //                         noi_dung_feedback: record.noi_dung_feedback
        //                     }
        //                 );

        //             }} >Xem chi tiết </button>

        //         </div>
        //     )
        // },
    ];
    const formik2 = useFormik({
        initialValues: {
            responseID: "",
            ngay_tao: "",
            noi_dung_feedback: "",
            loai_yeu_cau: "",
            noi_dung: "",
            feedback: "",
            hinh_anh: "",
            users: "",
        },
        onSubmit: (values) => {
            dorespone(values);
            console.log("first", values);
        },
    });
    const fetchDataHanhDong = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/FindSanPhamByDTO"
            ); // Replace with actual API endpoint
            const formattedData = response.data.map((item, index) => ({
                key: index,
                san_phamId: item.sanpham.san_phamId,
                ten_san_pham: item.sanpham.ten_san_pham,

                hinh_anh: item.sanpham.hinh_anh,

                gia_goc: item.sanpham.gia_goc,
                so_luong: item.sanpham.so_luong,
                users: item.sanpham?.users?.accountID,
                hanhdong: item?.tenHanhDong,
                ngay_tao: item.ngay_hanh_dong,
                personwhodid: item?.users?.accountID,
            }));
            setdatahanhdong(formattedData);
            console.log("dataaaaaaa", formattedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const changeImage = (event) => {
        const value = event.currentTarget.files[0];
        const parent = document.querySelector("[gay]");
        const parent2 = document.querySelector("[gay2]");
        console.log(value.name);
        parent.removeChild(parent2);
        console.log(parent);
        const img = document.createElement("img");
        const srcimg = URL.createObjectURL(value);

        img.setAttribute("src", srcimg);
        img.className = "img-fluid";
        img.style.height = "80px";
        parent.appendChild(img);

        img.addEventListener("dblclick", () => {
            parent.removeChild(img);
            parent.appendChild(parent2);
        });
    };
    const onSelectChange = (value) => {
        console.log(`selected ${value}`);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: "odd",
                text: "Select Odd Row",
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
            {
                key: "even",
                text: "Select Even Row",
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
        ],
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const getallresponse = async () => {
        const response = await axios.get(
            "http://localhost:8080/Product/getproductsHaventBeenApproved"
        );
        const formattedData = response.data.map((item, index) => ({
            key: index,
            san_phamId: item.san_phamId,
            ten_san_pham: item.ten_san_pham,
            ngay_tao: item.ngayTao,
            hinh_anh: item.hinh_anh,
            gia_goc: item.gia_goc,
            so_luong: item.so_luong,
            users: item?.accountid,
        }));
        setdataSource(formattedData);
    };

    const getallresponse2 = async () => {
        const response = await axios.get(
            "http://localhost:8080/Product/getproductsHaveBeenApproved"
        );
        const formattedData = response.data.map((item, index) => ({
            key: index,
            san_phamId: item.san_phamId,
            ten_san_pham: item.ten_san_pham,
            ngay_tao: item.ngayTao,
            hinh_anh: item.hinh_anh,
            gia_goc: item.gia_goc,
            so_luong: item.so_luong,
            users: item?.accountid,
        }));
        setdataSource2(formattedData);
    };
    const getallresponse3 = async () => {
        const response = await axios.get(
            "http://localhost:8080/Product/getproductsHaveBeenNotApproved"
        );
        const formattedData = response.data.map((item, index) => ({
            key: index,
            san_phamId: item.san_phamId,
            ten_san_pham: item.ten_san_pham,
            ngay_tao: item.ngayTao,
            hinh_anh: item.hinh_anh,
            gia_goc: item.gia_goc,
            so_luong: item.so_luong,
            users: item?.accountid,
            ghi_chu: item?.ghi_chu,
        }));
        setdataSource3(formattedData);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setHinhAnh(file);
        setImagePreview(URL.createObjectURL(file)); // Display preview of the selected image
    };

    const dorespone = async (values) => {
        const res = await axios({
            url: `http://localhost:8080/approveproduct?productid=${values.san_phamId}&ghichu=${values.ghi_chu}&accountId=${userId}`,
            method: "POST",
            data: {},
            headers: { "Content-Type": "application/json" },
        });
        if(res.status === 200){
            alertSuccess();
        }
        setchange(change + 1);
    };
    const dorespone2 = async (values) => {
        const res = await axios({
            url: `http://localhost:8080/notapprove?productid=${values.san_phamId}&ghichu=${values.ghi_chu},&accountId=${userId}`,
            method: "POST",
            data: {},
            headers: { "Content-Type": "application/json" },
        });
        if(res.status === 200){
            alertSuccess();
        }
        setchange(change + 1);

    };

    useEffect(() => {
        getallresponse();
        getallresponse2();
        getallresponse3();
        fetchDataHanhDong();
    }, [fileList, change]);

    return (
        <div className="container">
            <div>
                <ul className="nav nav-pills nav-fill" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link active fw-bold"
                            id="table-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#table-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="table-tab-pane"
                            aria-selected="true"
                        >
                            DANH SÁCH
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link  fw-bold"
                            id="table-tab2"
                            data-bs-toggle="tab"
                            data-bs-target="#table-tab-pane2"
                            type="button"
                            role="tab"
                            aria-controls="table-tab-pane"
                            aria-selected="true"
                        >
                            DANH SÁCH SẢN PHẨM ĐÃ DUYỆT{" "}
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link  fw-bold"
                            id="table-tab3"
                            data-bs-toggle="tab"
                            data-bs-target="#table-tab-pane3"
                            type="button"
                            role="tab"
                            aria-controls="table-tab-pane"
                            aria-selected="true"
                        >
                            DANH SÁCH SẢN PHẨM ĐÃ TỪ CHỐI
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link fw-bold"
                            id="form-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#table-tab-pane4"
                            type="button"
                            role="tab"
                            aria-controls="form-tab-pane"
                            aria-selected="false"
                        >
                            Hành động
                        </button>
                    </li>
                </ul>
                {/* Tab content */}
                <div className="tab-content mt-3" id="myTabContent">
                    {/* Table content */}
                    <div
                        className="tab-pane fade show active"
                        id="table-tab-pane"
                        role="tabpanel"
                        aria-labelledby="table-tab"
                    >
                        <h3>QUẢN LÍ PHÊ DUYỆT SẢN PHẨM</h3>
                        <Table
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={dataSource}
                        />
                    </div>
                    <div
                        className="tab-pane fade "
                        id="table-tab-pane2"
                        role="tabpanel"
                        aria-labelledby="table-tab"
                    >
                        <h3>Danh sách sản phẩm đã duyệt </h3>
                        <Table
                            rowSelection={rowSelection}
                            columns={columnrespone}
                            dataSource={dataSource2}
                        />
                    </div>
                    <div
                        className="tab-pane fade "
                        id="table-tab-pane3"
                        role="tabpanel"
                        aria-labelledby="table-tab"
                    >
                        <h3>Danh sách sản phẩm bị từ chối</h3>
                        <Table
                            rowSelection={rowSelection}
                            columns={columnrespone2}
                            dataSource={dataSource3}
                        />
                    </div>
                    {/* Form content */}
                    <div
                        className="tab-pane fade "
                        id="table-tab-pane4"
                        role="tabpanel"
                        aria-labelledby="table-tab"
                    >
                        <h3>QUẢN LÍ POPUP4</h3>
                        <Table
                            rowSelection={rowSelection}
                            columns={columnHanhdongs}
                            dataSource={datahanhdong}
                        />
                    </div>
                </div>
            </div>



            <Modal title="Thông tin sản phẩm" open={isModalOpen1} okText="Duyệt" cancelText="Đóng" onOk={handleOk1} onCancel={handleCancel1}>
                <form onSubmit={formik.handleSubmit} className="">
                    <div className="input-group mb-3   d-flex justify-content-center">
                        <span className="input-group-text" id="basic-addon1">
                            Tên sản phẩm
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            value={formik.values.ten_san_pham}
                        />
                    </div>
                    <div className="input-group mb-3   d-flex justify-content-center">
                        <span className="input-group-text" id="basic-addon1">
                            Giá sản phẩm
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            value={formik.values.gia_goc + " VND"}
                        />
                    </div>
                    <div className="input-group mb-3   d-flex justify-content-center">
                        <span className="input-group-text" id="basic-addon1">
                            Số lượng
                        </span>
                        <input
                            type="number"
                            className="form-control"
                            value={formik.values.so_luong}
                        />
                    </div>
                    <div
                        data-bs-toggle="modal"
                        data-bs-target="#thongbaomodal"
                        className="input-group mb-3  d-flex justify-content-center"
                    >

                    </div>
                </form>
            </Modal>
            <div>
                <div className="modal fade" id="phanhoimodal">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content text-center">
                            <div
                                className="modal-header justify-content-center "
                                style={{ borderBottom: "none" }}
                            >
                                <div className="h2 ">Duyệt sản phẩm</div>
                            </div>
                            <div className="modal-body text-center">
                                <form onSubmit={formik.handleSubmit} className="">
                                    <div className="input-group mb-3   d-flex justify-content-center">
                                        <span className="input-group-text" id="basic-addon1">
                                            Tên sản phẩm
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formik.values.ten_san_pham}
                                        />
                                    </div>
                                    <div className="input-group mb-3   d-flex justify-content-center">
                                        <span className="input-group-text" id="basic-addon1">
                                            Giá sản phẩm
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formik.values.gia_goc + " VND"}
                                        />
                                    </div>
                                    <div className="input-group mb-3   d-flex justify-content-center">
                                        <span className="input-group-text" id="basic-addon1">
                                            Số lượng
                                        </span>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={formik.values.so_luong}
                                        />
                                    </div>
                                    <div
                                        data-bs-toggle="modal"
                                        data-bs-target="#thongbaomodal"
                                        className="input-group mb-3  d-flex justify-content-center"
                                    >
                                        <button type="submit" className="btn btn-success">
                                            Duyệt
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal title="Basic Modal" open={isModalOpen2} okText="Từ chối" cancelText="Đóng" onOk={handleOk2} onCancel={handleCancel2}>
                <form onSubmit={formik.handleSubmit} className="">
                    <div className="input-group mb-3   d-flex justify-content-center">
                        <span className="input-group-text" id="basic-addon1">
                            Tên sản phẩm
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            value={formik.values.ten_san_pham}
                        />
                    </div>
                    <div className="input-group mb-3   d-flex justify-content-center">
                        <span className="input-group-text" id="basic-addon1">
                            Giá sản phẩm
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            value={formik.values.gia_goc + " VND"}
                        />
                    </div>
                    <div className="input-group mb-3   d-flex justify-content-center">
                        <span className="input-group-text" id="basic-addon1">
                            Số lượng
                        </span>
                        <input
                            type="number"
                            className="form-control"
                            value={formik.values.so_luong}
                        />
                    </div>
                    <div className="input-group mb-3   d-flex justify-content-center">
                        <span
                            style={{ width: "120px" }}
                            className="input-group-text"
                            id="basic-addon1"
                        >
                            Lý do từ chối
                        </span>
                        {formik.errors.ghi_chu && <div className="text-danger ms-1 fw-bold">{formik.errors.ghi_chu}</div>}
                        <input
                            type="text"
                            className="form-control"
                            name="ghi_chu"
                            onChange={formik.handleChange}
                            value={formik.values.ghi_chu}
                        />
                    </div>
                    <div
                        data-bs-toggle="modal"
                        data-bs-target="#thongbao2modal"
                        className="input-group mb-3  d-flex justify-content-center"
                    >

                    </div>
                </form>
            </Modal>
            <div>


                <div className="modal fade" id="tuchoimodal">
                    <div className="modal-dialog  modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header" style={{ borderBottom: "none" }}>
                                <div className="h2">Từ chối duyệt </div>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={formik.handleSubmit} className="">
                                    <div className="input-group mb-3   d-flex justify-content-center">
                                        <span className="input-group-text" id="basic-addon1">
                                            Tên sản phẩm
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formik.values.ten_san_pham}
                                        />
                                    </div>
                                    <div className="input-group mb-3   d-flex justify-content-center">
                                        <span className="input-group-text" id="basic-addon1">
                                            Giá sản phẩm
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formik.values.gia_goc + " VND"}
                                        />
                                    </div>
                                    <div className="input-group mb-3   d-flex justify-content-center">
                                        <span className="input-group-text" id="basic-addon1">
                                            Số lượng
                                        </span>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={formik.values.so_luong}
                                        />
                                    </div>
                                    <div className="input-group mb-3   d-flex justify-content-center">
                                        <span
                                            style={{ width: "120px" }}
                                            className="input-group-text"
                                            id="basic-addon1"
                                        >
                                            Ghi chú
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="ghi_chu"
                                            onChange={formik.handleChange}
                                            value={formik.values.ghi_chu}
                                        />
                                    </div>
                                    <div
                                        data-bs-toggle="modal"
                                        data-bs-target="#thongbao2modal"
                                        className="input-group mb-3  d-flex justify-content-center"
                                    >
                                        <button type="submit" className="btn btn-success">
                                            Từ chôi
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="thongbaomodal">
                    <div className="modal-dialog  modal-dialog-centered">
                        <div className="modal-content">
                            <div
                                className="modal-header justify-content-center"
                                style={{ borderBottom: "none" }}
                            >
                                <div className="h2">Duyệt thành công</div>
                            </div>
                            <div className="modal-body text-center">
                                <button
                                    type="button"
                                    class="btn btn-success"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="thongbao2modal">
                    <div className="modal-dialog  modal-dialog-centered">
                        <div className="modal-content">
                            <div
                                className="modal-header justify-content-center"
                                style={{ borderBottom: "none" }}
                            >
                                <div className="h2">Đã từ chối yêu cầu</div>
                            </div>
                            <div className="modal-body text-center">
                                <button
                                    type="button"
                                    class="btn btn-success"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Xetduyetsanpham;
