import React, { useState } from 'react'
import { Table } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
// DanhMuc
// Danh_mucID (PK)
// Ten_loaiDM
// Ngay_tao
// Trang_thaiPD
// Trang_thaiHD
// Ghi_chu
// AccountID (FK)
// BannerID (FK)
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
const dataSource = Array.from({
  length: 46,
}).map((_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
}));
const CrudCategory = () => {
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
            <button className="nav-link active fw-bold" id="table-tab" data-bs-toggle="tab" data-bs-target="#table-tab-pane" type="button" role="tab" aria-controls="table-tab-pane" aria-selected="true">DANH SÁCH</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link fw-bold" id="form-tab" data-bs-toggle="tab" data-bs-target="#form-tab-pane" type="button" role="tab" aria-controls="form-tab-pane" aria-selected="false">BIỂU MẨU</button>
          </li>
        </ul>
        {/* Tab content */}
        <div className="tab-content mt-3" id="myTabContent">
          {/* Table content */}
          <div className="tab-pane fade show active" id="table-tab-pane" role="tabpanel" aria-labelledby="table-tab">
            <h3>QUẢN LÍ DANH MỤC</h3>
            <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
             
          </div>
          {/* Form content */}
          <div className="tab-pane fade" id="form-tab-pane" role="tabpanel" aria-labelledby="form-tab">
            <form className="row mt-5">
             


              <div className="col-md-6 my-2">

                <div className="form-floating mb-3">
                  <input type="pasword" className="form-control" id="floatingPassword" placeholder="Password" />
                  <label htmlFor="floatingPassword" className='text-primary fw-bold'>TÊN DANH MỤC</label>
                </div>

                <select className="form-select form-select mb-4 text-primary fw-bold" aria-label="Large select example">
                  <option selected >CHỌN BANNER ID</option>
                  <option value={1}>One</option>
                  <option value={2}>Two</option>
                  <option value={3}>Three</option>
                </select>


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
                />
              </div>

              <div className="col-md-6 my-2">

                <div className="form-floating ">
                  <input type="date" className="form-control" id="floatingPassword" placeholder="Password" />
                  <label htmlFor="floatingPassword" className='text-primary fw-bold'>NGÀY TẠO</label>
                </div>

                <div className="form-check form-check-inline mt-4">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="options"
                    id="option1"
                    value="option1"
                    checked
                  />
                  <label className="form-check-label fw-bold text-primary" htmlFor="option1">
                    Hoạt động
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="options"
                    id="option2"
                    value="option2"
                  />
                  <label className="form-check-label fw-bold text-primary" htmlFor="option2">
                    Không hoạt động
                  </label>
                </div>



                <label gay="sad" className="custum-file-upload mt-4" htmlFor="file">
                  <div gay2="sad2" className="gay">
                    <div className="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeWidth={0} id="SVGRepo_bgCarrier" /><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" /><g id="SVGRepo_iconCarrier"> <path d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd" /> </g></svg>
                    </div>
                    <div className="text">
                      <span>Click to upload image</span>
                    </div>
                    <input type="file" id='file' name='image' className=' mt-3' />
                  </div>
                </label>










              </div>

              <div className="col-md-4 my-2">

                


                




              </div>



              <div className="col-md-12 text-center mt-3">

                <button className='btn btn-outline-primary fw-bold ms-2 mt-2' style={{ minWidth: 120 }} > Thêm Danh Mục</button>
                <button className='btn btn-outline-danger  fw-bold ms-2 mt-2' style={{ minWidth: 120 }}> Xóa Danh Mục</button>
                <button className='btn btn-outline-warning fw-bold ms-2 mt-2' style={{ minWidth: 120 }}> Cập nhật Danh Mục</button>
                <button className='btn btn-outline-success fw-bold ms-2 mt-2' style={{ minWidth: 120 }}> Làm mới</button>

              </div>

            </form>
          </div>
        </div>
      </div>





    </div>
  )
}

export default CrudCategory