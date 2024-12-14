import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { Image } from "antd";
import { EditOutlined } from '@ant-design/icons';
import { DeleteOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { tab } from '@testing-library/user-event/dist/tab';



const CrudCategory = () => {
  const [fileImage, SetfileImage] = useState(null)
  const changeImage = (event) => {
    const value = event.currentTarget.files[0];
    const parent = document.querySelector("[gay]");
    const parent2 = document.querySelector("[gay2]");
    console.log(value.name)
    parent.removeChild(parent2)
    console.log(parent)
    const img = document.createElement('img');
    const srcimg = URL.createObjectURL(value);
    img.setAttribute('src', srcimg);
    img.className = "img-fluid"
    img.style.height = '80px'
    parent.appendChild(img)

    img.addEventListener('dblclick', () => {
      parent.removeChild(img);
      parent.appendChild(parent2);

    })


  }
  const iduser = localStorage.getItem("account_id");
  const [previewImage, setPreviewImage] = useState(null);

  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      bannerId: '',
      createdDate: '',
      status: '',
      image: "",
      imageold: "",
      imageFile: "",
      active: 'Working',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Hãy Nhập Tên Danh Mục'),

      createdDate: Yup.date().required('Hãy Nhập Ngày Tạo'),
      image: Yup.string().required('Hãy Nhập Chọn Chọn ảnh')
    }),
    onSubmit: async (values) => {
      if (update == "") {

        console.log("data", values)
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('bannerId', values.bannerId);
        formData.append('createdDate', values.createdDate);
        formData.append('status', values.active);
        formData.append('image', values.image);
        formData.append('iduser', iduser);
        formData.append('imgFile', fileImage);
        await axios({
          url: `http://localhost:8080/DanhMuc/ADD_DanhMuc`, method: "POST", data: formData, headers: {
            'Content-Type': 'multipart/form-data',

          }
        })
        toast.success('Thêm danh mục thành công!');
        const tab1 = document.querySelector("#table-tab")

        tab1.click();

      }
      else {
        console.log("cập nhật")
        console.log("data", values)
        if (values.imageold == values.image) {
          console.log("cập nhật no img")
          const formData = new FormData();
          formData.append('id', values.id);
          formData.append('name', values.name);

          formData.append('createdDate', values.createdDate);
          formData.append('status', values.active);
          formData.append('image', values.image);
          formData.append('iduser', iduser);
     
          await axios({
            url: `http://localhost:8080/DanhMuc/UPDATE_DanhMucNOImage`, method: "PUT", data: formData, headers: {
              'Content-Type': 'multipart/form-data',

            }
          })
        }
        else {
          const formData = new FormData();
          formData.append('id', values.id);
          formData.append('name', values.name);

          formData.append('createdDate', values.createdDate);
          formData.append('status', values.active);
          formData.append('image', values.image);
          formData.append('iduser', iduser);
          formData.append('imgFile', fileImage);
          await axios({
            url: `http://localhost:8080/DanhMuc/UPDATE_DanhMuc`, method: "PUT", data: formData, headers: {
              'Content-Type': 'multipart/form-data',

            }
          })
        }

        toast.success('Cập nhật danh mục thành công!');
        const tab1 = document.querySelector("#table-tab")

        tab1.click();
      }

    },
  });

  //




  //
  const [update, setupdate] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [datahanhdong, setdatahanhdong] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataBanner, SetdataBanner] = useState([]);
  const api_Banner = async () => {
    const res = await axios({ url: "http://localhost:8080/FindAllBanner", method: "GET" })
    SetdataBanner(res.data);
  }
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/findCategoryNotDelete'); // Replace with actual API endpoint
      const formattedData = response.data.map((item, index) => ({
        key: index,
        categoryId: item.danh_mucId,
        categoryName: item.ten_loaiDM,
        createdDate: item.ngay_tao,
        imageUrl: item.hinh_anh,
        userId: item?.users?.accountID,
        bannerId: item?.banner?.bannerId,
        status: item.trang_thai_xoa == null ? "Chưa xóa" : "cc",
        active: item.hoat_dong
      }));
      setDataSource(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataHanhDong = async () => {
    try {
      const response = await axios.get('http://localhost:8080/HanhDong/FindDanhMuc'); // Replace with actual API endpoint
      const formattedData = response.data.map((item, index) => ({
        key: index,
        categoryId: item.danhMuc.danh_mucId,
        categoryName: item.danhMuc.ten_loaiDM,
        createdDate: item.danhMuc.ngay_tao,
        imageUrl: item.danhMuc.hinh_anh,
        userId: item.danhMuc?.users?.accountID,

        status: item.danhMuc.trang_thai_xoa == null ? "Chưa xóa" : "cc",
        active: item.danhMuc.hoat_dong,
        actions: item.tenHanhDong
      }));
      setdatahanhdong(formattedData)
      console.log('dataaaaaaa', formattedData)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataDeleted = async () => {
    try {
      const response = await axios.get('http://localhost:8080/findCategoryDelete'); // Replace with actual API endpoint
      const formattedData = response.data.map((item, index) => ({
        key: index,
        categoryId: item.danh_mucId,
        categoryName: item.ten_loaiDM,
        createdDate: item.ngay_tao,
        imageUrl: item.hinh_anh,
        userId: item?.users?.accountID,
        bannerId: item?.users?.accountID,
        status: item.trang_thai_xoa == null ? "Chưa xóa" : "Đã xóa",
        active: item.hoat_dong
      }));
      setDataSource(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const columns = [
    {
      title: 'Danh Mục ID',
      dataIndex: 'categoryId',
      key: 'categoryId',
    },
    {
      title: 'Tên Danh Mục',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Ngày Tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (imageUrl) => (
        <Image
          width={50}
          height={60}
          src={`images/${imageUrl}`}
        />

      ),
    },
    {
      title: 'User ID',
      dataIndex: 'userId', // Adjust if your API uses a different field
      key: 'userId',
    },

    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Hoạt động',
      dataIndex: 'active', // chỉ là tên trường dữ liệu
      key: 'active',
      render: (text) => text === 'Working' ? 'Đang hoạt động' : 'Không hoạt động',
    },
    {
      title: 'Nút',
      key: 'actions',
      render: (_, record) => (
        <>


          {record.status == 'Chưa xóa' ?
            <>
              <EditOutlined style={{ fontSize: '24px', color: '#08c' }} onClick={() => {
                formik.setValues(
                  {
                    id: record.categoryId,
                    name: record.categoryName,
                    bannerId: record.bannerId,
                    createdDate: record.createdDate,
                    status: record.status,
                    image: record.imageUrl,
                    active: record.active,
                    imageold: record.imageUrl
                  }
                )

                const tab2 = document.querySelector("#form-tab")

                tab2.click();


              }} />
              <DeleteOutlined onClick={async () => {
                if (window.confirm("Bạn có muốn xóa danh mục này không")) {
                  await axios({ url: `http://localhost:8080/DanhMuc/DeleteDanhMuc/${record.categoryId}`, method: "DELETE" })
                  toast.success('Xóa danh mục thành công!');
                  fetchData()
                }
              }} style={{ fontSize: '24px', color: 'red', marginLeft: "10px" }} />
            </>
            :

            <>
              <RedoOutlined onClick={async () => {
                if (window.confirm("Bạn có muốn khôi phục danh mục này không")) {
                  await axios({ url: `http://localhost:8080/DanhMuc/BackDeleteDanhMuc/${record.categoryId}`, method: "DELETE" })
                  toast.success('Khôi phục danh mục thành công!');
                  fetchDataDeleted();
                }
              }} style={{ fontSize: '24px', color: '#08c' }} />

              <DeleteOutlined onClick={async () => {
                if (window.confirm("Bạn có muốn xóa danh mục này không")) {
                  await axios({ url: `http://localhost:8080/DanhMuc/DeleteDanhMuc/${record.categoryId}`, method: "DELETE" })
                  toast.success('Xóa danh mục thành công!');
                  fetchData()
                }
              }} style={{ fontSize: '24px', color: 'red', marginLeft: "10px" }} />
            </>

          }

        </>
      ),
    },
  ];

  //

  const columnHanhdongs = [
    {
      title: 'Danh Mục ID',
      dataIndex: 'categoryId',
      key: 'categoryId',
    },
    {
      title: 'Tên Danh Mục',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Ngày Tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (imageUrl) => (
        <Image
          width={50}
          height={60}
          src={`images/${imageUrl}`}
        />

      ),
    },
    {
      title: 'User ID',
      dataIndex: 'userId', // Adjust if your API uses a different field
      key: 'userId',
    },
    {
      title: 'Banner ID',
      dataIndex: 'bannerId', // Adjust if your API uses a different field
      key: 'bannerId',
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Hoạt động',
      dataIndex: 'active', // chỉ là tên trường dữ liệu
      key: 'active',
      render: (text) => text === 'Working' ? 'Đang hoạt động' : 'Không hoạt động',
    },

    {
      title: 'Hành động ',
      dataIndex: 'actions',
      key: 'actions'

    },
  ];



  //
  useEffect(() => {
    api_Banner();
    fetchData();
    fetchDataHanhDong();
    console.log('data', dataSource)

  }, []);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,

  };



  return (
    <div className='container-fluid'>

      <div>
        <ul className="nav nav-pills nav-fill" id="myTab" role="tablist">
          <li className="nav-item" role="presentation" onClick={async () => {
            fetchData();
            formik.resetForm()
          }}>
            <button className="nav-link active fw-bold" id="table-tab" data-bs-toggle="tab" data-bs-target="#table-tab-pane" type="button" role="tab" aria-controls="table-tab-pane" aria-selected="true">DANH SÁCH</button>
          </li>
          <li className="nav-item " role="presentation">
            <button className="nav-link fw-bold" onClick={() => {

            }} id="form-tab" data-bs-toggle="tab" data-bs-target="#form-tab-pane" type="button" role="tab" aria-controls="form-tab-pane" aria-selected="false">BIỂU MẪU</button>
          </li>
          <li className="nav-item" role="presentation" onClick={async () => {
            fetchDataDeleted();
            formik.resetForm()
          }}>
            <button className="nav-link fw-bold" id="deleted-tab" data-bs-toggle="tab" data-bs-target="#formdelete-tab-pane" type="button" role="tab" aria-controls="formdelete-tab-pane" aria-selected="false">ĐÃ XÓA</button>
          </li>
          <li className="nav-item" role="presentation">
            <button onClick={async () => {
              fetchDataHanhDong()
              formik.resetForm()
            }} className="nav-link fw-bold" id="action-tab" data-bs-toggle="tab" data-bs-target="#action-tab-pane" type="button" role="tab" aria-controls="action-tab-pane" aria-selected="false">HÀNH ĐỘNG</button>
          </li>
        </ul>

        {/* Tab content */}
        <div className="tab-content mt-3" id="myTabContent">
          {/* Table content */}
          <div className="tab-pane fade show active" id="table-tab-pane" role="tabpanel" aria-labelledby="table-tab">
            <h3>QUẢN LÍ DANH MỤC</h3>

            <div className="row mt-5 mb-3">
              <div className="col-md-4">

                <select onChange={async () => {
                  const value = document.getElementById("searchhoatdong").value

                  if (value == 'Tìm kiếm theo trạng thái hoạt động') {
                    return;
                  }
                  if (value == 'Working') {
                    const res = await axios({ url: "http://localhost:8080/DanhMuc/findALLWorking", method: "GET" })

                    const formattedData = res.data.map((item, index) => ({
                      key: index,
                      categoryId: item.danh_mucId,
                      categoryName: item.ten_loaiDM,
                      createdDate: item.ngay_tao,
                      imageUrl: item.hinh_anh,
                      userId: item?.users?.accountID,
                      bannerId: item?.banner?.bannerId,
                      status: item.trang_thai_xoa == null ? "Chưa xóa" : "cc",
                      active: item.hoat_dong
                    }));
                    setDataSource(formattedData);


                  }
                  if (value == 'NotWorking') {
                    const res = await axios({ url: "http://localhost:8080/DanhMuc/findALLNotWorking", method: "GET" })
                    const formattedData = res.data.map((item, index) => ({
                      key: index,
                      categoryId: item.danh_mucId,
                      categoryName: item.ten_loaiDM,
                      createdDate: item.ngay_tao,
                      imageUrl: item.hinh_anh,
                      userId: item?.users?.accountID,
                      bannerId: item?.banner?.bannerId,
                      status: item.trang_thai_xoa == null ? "Chưa xóa" : "cc",
                      active: item.hoat_dong
                    }));
                    setDataSource(formattedData);
                  }
                }} className="form-select form-select-sm" id='searchhoatdong' aria-label="Small select example">
                  <option selected>Tìm kiếm theo trạng thái hoạt động</option>
                  <option value={'Working'}>Đang hoạt động</option>
                  <option value={'NotWorking'}>Không hoạt động</option>

                </select>



              </div>
              <div className="col-md-4 d-flex">

                {/* <div class="input-group mb-3">
                  <input type="text" class="form-control form-control-sm" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                  <span class="input-group-text" id="basic-addon2"><SearchOutlined style={{ fontSize: 18, marginLeft: "1px" }} /></span>
                </div> */}




              </div>

              <div className="col-md-4">





              </div>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
          </div>

          {/* Deleted content */}
          <div className="tab-pane fade" id="formdelete-tab-pane" role="tabpanel" aria-labelledby="deleted-tab">
            <h3>QUẢN LÍ DANH MỤC - ĐÃ XÓA</h3>
            <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
          </div>

          {/* Action content */}
          <div className="tab-pane fade" id="action-tab-pane" role="tabpanel" aria-labelledby="action-tab">
            <h3>Hành Động Đã Xử Lí</h3>
            <Table rowSelection={rowSelection} columns={columnHanhdongs} dataSource={datahanhdong} />
          </div>
          <div className="tab-pane fade" id="form-tab-pane" role="tabpanel" aria-labelledby="form-tab">
            <form className="row mt-5" onSubmit={formik.handleSubmit}>
              <div className="col-md-6 my-2">
                <div className="form-floating mb-4">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="floatingPassword" className="text-primary fw-bold">
                    TÊN DANH MỤC
                  </label>
                  {formik.errors.name && <div className="text-danger ms-1 fw-bold">{formik.errors.name}</div>}
                </div>



                {formik.values.image == "" && <label gay="sad" className="custum-file-upload mt-4" htmlFor="file">

                  <div gay2="sad2" className="gay">
                    <div className="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeWidth={0} id="SVGRepo_bgCarrier" /><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" /><g id="SVGRepo_iconCarrier"> <path d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd" /> </g></svg>
                    </div>
                    <div className="text">
                      <span>Click to upload image</span>
                    </div>
                    <input type="file" id='file' name='image' onChange={(event) => {
                      formik.setFieldValue('image', event.currentTarget.files[0].name);
                      SetfileImage(event.currentTarget.files[0])


                    }} className=' mt-3' />
                  </div>



                </label>}

                {formik.values.image != "" && <label gay="sad" className="custum-file-upload mt-4" htmlFor="file">



                  <img className='img-fluid' style={{ height: "80px" }} onDoubleClick={() => {
                    formik.setFieldValue('image', "");
                  }} src={`images/${formik.values.image}`} alt="" />


                </label>}
                {formik.errors.image && <div className="text-danger ms-1 fw-bold">{formik.errors.image}</div>}


              </div>

              <div className="col-md-6 my-2">
                <div className="form-floating">
                  <input
                    type="date"
                    className="form-control"
                    id="floatingCreatedDate"
                    placeholder="Ngày tạo"
                    name="createdDate"
                    value={formik.values.createdDate}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="floatingCreatedDate" className="text-primary fw-bold">
                    NGÀY TẠO
                  </label>
                  {formik.errors.createdDate && <div className="text-danger ms-1 fw-bold">{formik.errors.createdDate}</div>}
                </div>

                <div className="form-check form-check-inline mt-4">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="active"
                    id="option1"
                    value="Working"
                    checked={formik.values.active == 'Working'}
                    onChange={formik.handleChange}
                  />
                  <label className="form-check-label fw-bold text-primary" htmlFor="option1">
                    Hoạt động
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="active"
                    id="option2"
                    value="NOtWorking"
                    checked={formik.values.active == 'NOtWorking'}
                    onChange={formik.handleChange}
                  />
                  <label className="form-check-label fw-bold text-primary" htmlFor="option2">
                    Không hoạt động
                  </label>
                </div>


              </div>

              <div className="col-md-12 text-center mt-3">
                <button type="submit" onClick={() => {
                  setupdate("")
                }} className="btn btn-outline-primary fw-bold ms-2 mt-2" style={{ minWidth: 120 }}>
                  Thêm Danh Mục
                </button>

                <button type="submit" onClick={() => {
                  setupdate("cập nhật")
                }} className="btn btn-outline-warning fw-bold ms-2 mt-2" style={{ minWidth: 120 }}>
                  Cập nhật Danh Mục
                </button>
                <button onClick={() => formik.resetForm()} type="button" className="btn btn-outline-success fw-bold ms-2 mt-2" style={{ minWidth: 120 }}>
                  Làm mới
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>





    </div>
  )
}

export default CrudCategory