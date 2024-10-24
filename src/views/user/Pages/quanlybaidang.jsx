
import React, { useEffect, useState, useRef } from 'react'
import { Space, Table, Tag } from 'antd';
import { useFormik } from "formik";
import { Input, Form, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { object } from 'yup';
import { Formik, Field } from 'formik';
const { TextArea } = Input;




const Quanlybaidang = () => {
    const { Column, ColumnGroup } = Table;
    const [content, setContent] = useState('');
    const [baidang, setBaidang] = useState([]);
    const { TextArea } = Input;
    const cc = React.useRef(null);
    const headerCount = ["Bài đăng ID", "Tiêu đề", "Hình ảnh", "Ghi chú", "Hoạt động", "Nội dung", "Phê duyệt", "Yêu Cầu", "Người đăng", "Hành động"];
    let result;
    let formik = useFormik({
        initialValues: {
            bai_dangID: '',
            tieu_de: '',
            hinh_anh: '',
            ghi_chu: '',
            hoat_dong: '',
            noi_dung: '',
            phe_duyet: '',
            yeu_cau: '',
        },
      
    });
    const handleClick = () => {
        console.log(baidang[0].bai_dangID);
        formik.setFieldValue("bai_dangID", baidang[0].bai_dangID);
        formik.setFieldValue("tieu_de", baidang[0].tieu_de);
        formik.setFieldValue("hinh_anh", baidang[0].hinh_anh);
        formik.setFieldValue("ghi_chu", baidang[0].ghi_chu);
        formik.setFieldValue("hoat_dong", baidang[0].hoat_dong);
        formik.setFieldValue("noi_dung", baidang[0].noi_dung);
        formik.setFieldValue("phe_duyet", baidang[0].phe_duyet);
        formik.setFieldValue("yeu_cau", baidang[0].yeu_cau);
        cc.current.click();
        console.log(formik.initialValues);

    }
    
    useEffect(() => {
        axios.get(`http://localhost:8080/baidang/filltable`)
            .then(function (response) {
                setBaidang(response.data);
            })

            .catch(error => console.log(error));




    }, [])


   
   







    const handleEditorChange = (newContent) => {
        console.log(newContent);
        setContent(newContent);
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    const dataSource = Array.from({
        length: 46,
    }).map((_, i) => ({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    }));

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: 'odd',
                text: 'Select Odd Row',
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
                key: 'even',
                text: 'Select Even Row',
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
    return (
        
        <div className='container'>
            <div>
                <ul className="nav nav-pills nav-fill" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active fw-bold" id="table-tab" data-bs-toggle="tab" data-bs-target="#table-tab-pane" type="button" role="tab" >DANH SÁCH</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link fw-bold " id=" form-tab " ref={cc} data-bs-toggle="tab" data-bs-target="#form-tab-pane" type="button" role="tab" >BIỂU MẨU</button>
                    </li>
                </ul>
                {/* Tab content */}
                <div className="tab-content mt-3" id="myTabContent">
                    {/* Table content */}
                    <div className="tab-pane fade show active" id="table-tab-pane" role="tabpanel" >
                        <h3>QUẢN LÍ DANH MỤC</h3>
                        <table class="table">
                            <thead>
                                <tr>
                                    {headerCount.map((item) => {
                                        return (
                                            <th scope="col">{item}</th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody className='table-body-data'>
                                {baidang.map((baidang) => {
                                    return (
                                        <tr>
                                            <td>{baidang.bai_dangID}</td>
                                            <td>{baidang.tieu_de}</td>
                                            <td>{baidang.hinh_anh}</td>
                                            <td>{baidang.ghi_chu}</td>
                                            <td>{baidang.hoat_dong}</td>
                                            <td>{baidang.noi_dung}</td>
                                            <td>{baidang.phe_duyet}</td>
                                            <td>{baidang.yeu_cau}</td>
                                            <td>{baidang.users.accountID}</td>
                                            <td><button id='edit' onClick={handleClick} className='btn btn-secondary'>{baidang.users.accountID}</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                    </div>
                    <div className="tab-pane fade " id="form-tab-pane" role="tabpanel" >
                        <div>
                            <label className='h1 ' htmlFor="">Quản lý bài đăng </label>
                            <div>Thông tin chung</div>
                            <div className='row row-cols-2'>
                                <div className='col'>
                                    <div className='inputtext mt-2'>
                                        <div className='h4'>Mã bài đăng </div>
                                        <div className="input-group mb-3">
                                            <input value={formik.values.bai_dangID} type="text" className="form-control " />
                                        </div>

                                    </div>
                                    <div className='inputtext mt-2'>
                                        <div className='h4'>Nội dung </div>
                                        <Editor
                                            apiKey='cdl7m07e6o2g3q2jko7q8ompxq0yenyd414zt85qbpdonj4i' // Sử dụng API key của bạn

                                            init={{
                                                height: 300,
                                                width: '100%',

                                                menubar: false,
                                                plugins: [
                                                    'advlist autolink lists link image charmap print preview anchor',
                                                    // Bỏ bớt các plugin không cần thiết để kiểm tra
                                                    'insertdatetime media table paste help',
                                                ],
                                                toolbar:
                                                    'undo redo | formatselect | bold italic forecolor backcolor | ' +
                                                    'alignleft aligncenter alignright alignjustify | ' +
                                                    'bullist numlist outdent indent | removeformat | help',
                                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                            }}
                                            name=""
                                            className="mt-5"
                                            onEditorChange={handleEditorChange}
                                            value={formik.values.noi_dung}
                                        />
                                    </div>
                                    <div className='inputtext mt-2'>
                                        <div className='h4'>Trạng thái hoạt động </div>
                                        <select className="form-select">
                                            <option selected value={1}>Ẩn </option>
                                            <option value={2}>Hiện</option>
                                        </select>
                                    </div>
                                    <div className='inputtext mt-2'>
                                        <div className='h4'>Hình ảnh</div>
                                        <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                                            <Upload action="/upload.do" listType="picture-card">
                                                <button style={{ border: 0, background: 'none' }} type="button">
                                                    <PlusOutlined />
                                                    <div style={{ marginTop: 8 }}>Upload</div>
                                                </button>
                                            </Upload>
                                        </Form.Item>

                                    </div>
                                </div>
                                <div className='col'>
                                    <div className='inputtext mt-2'>
                                        <div className='h4'>Tiêu đề </div>
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" placeholder="Nhập tiêu đề" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>

                                    </div>
                                    <div className='inputtext mt-2'>
                                        <div className='h4'>Trạng thái phê duyệt </div>
                                        <select disabled className="form-select">
                                            <option selected value={1}>Đang chờ phê duyệt </option>
                                            <option value={2}>Đã phê duyệt</option>
                                        </select>

                                    </div>
                                    <div className='inputtext mt-2'>
                                        <div className='h4'>Ghi chú </div>


                                        <TextArea rows={5} />

                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 text-center mt-3">

                                <button className='btn btn-outline-primary fw-bold ms-2 mt-2' style={{ minWidth: 120 }} > Thêm Danh Mục</button>
                                <button className='btn btn-outline-danger  fw-bold ms-2 mt-2' style={{ minWidth: 120 }}> Xóa Danh Mục</button>
                                <button className='btn btn-outline-warning fw-bold ms-2 mt-2' style={{ minWidth: 120 }}> Cập nhật Danh Mục</button>
                                <button className='btn btn-outline-success fw-bold ms-2 mt-2' style={{ minWidth: 120 }}> Làm mới</button>

                            </div>
                            <div className="mt-4">
                                <h5 className="text-center">Output:</h5>
                                <div className="border p-3" dangerouslySetInnerHTML={{ __html: content }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

export default Quanlybaidang    