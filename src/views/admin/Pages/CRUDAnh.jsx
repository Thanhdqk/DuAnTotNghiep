import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Image, Table } from 'antd';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import Select from 'react-select'
import { toast } from 'react-toastify';


const CRUDAnh = () => {
  const [update, setupdate] = useState("");
  const [nameSP, setnameSP] = useState([]);
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

  const changeImagephu1 = (event) => {
    console.log('changeImagephu1  ')
    const value = event.currentTarget.files[0];
    const parent = document.querySelector("[gay1]");
    const parent2 = document.querySelector("[gay3]");
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

  const changeImagephu2 = (event) => {
    console.log('changeImagephu2  ')
    const value = event.currentTarget.files[0];
    const parent = document.querySelector("[gay2]");
    const parent2 = document.querySelector("[gay4]");
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

  const changeImagephu3 = (event) => {
    console.log('changeImagephu1  ')
    const value = event.currentTarget.files[0];
    const parent = document.querySelector("[gay3]");
    const parent2 = document.querySelector("[gay5]");
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


  const formik = useFormik({

    initialValues: {
      id: '',
      name: '',
      imagemain: '',
      imagephu1: '',
      imagephu2: '',
      imagephu3: '',
      imagemainold: '',
      imagephu1old: '',
      imagephu2old: '',
      imagephu3old: '',

    },
    validationSchema: Yup.object({
      name: Yup.string().required('Hãy Chọn Tên Sản Phẩm'),
      imagemain: Yup.string().required('Hãy Chọn Hình ảnh chính')
    }),
    onSubmit: async (values) => {
      if (update == '') {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('imagemain', values.imagemain);
        formData.append('imagephu1', values.imagephu1);
        formData.append('imagephu2', values.imagephu2);
        formData.append('imagephu3', values.imagephu3);
        formData.append('imagemainold', values.imagemainold);
        formData.append('imagephu1old', values.imagephu1old);
        formData.append('imagephu2old', values.imagephu2old);
        formData.append('imagephu3old', values.imagephu3old);

        // Sử dụng Axios để gửi yêu cầu PUT đến server
        axios.put(`http://localhost:8080/update/images`, formData)
          .then(response => {
            console.log("Cập nhật thành công:", response.data);
          })
          .catch(error => {
            console.error("Có lỗi khi cập nhật hình ảnh:", error);
          });
          toast.success('Thêm hình ảnh thành công!');
      }
      else {


        console.log("cập nhật")

        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('imagemain', values.imagemain);
        formData.append('imagephu1', values.imagephu1);
        formData.append('imagephu2', values.imagephu2);
        formData.append('imagephu3', values.imagephu3);
        formData.append('imagemainold', values.imagemainold);
        formData.append('imagephu1old', values.imagephu1old);
        formData.append('imagephu2old', values.imagephu2old);
        formData.append('imagephu3old', values.imagephu3old);

        // Sử dụng Axios để gửi yêu cầu PUT đến server
        axios.put(`http://localhost:8080/update/images`, formData)
          .then(response => {
            console.log("Cập nhật thành công:", response.data);
          })
          .catch(error => {
            console.error("Có lỗi khi cập nhật hình ảnh:", error);
          });
          toast.success('Cập nhật hình ảnh thành công!');
      }

    }


  })


  const [dataSource, SetdataSource] = useState([]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const [DataHinhAnh, SetDataHinhAnh] = useState([]);



  const apiHinhAnh = async () => {
    const res = await axios({ url: "http://localhost:8080/HinhAnh/FindALL", method: "GET" })

    const data = res.data.map((item, index) => {
      const tenSanPham = item.tenSanPham;
      const hinhanh = item.hinhanh;


      return {
        key: index,
        tenSanPham: tenSanPham,
        anhchinh: hinhanh[0] ? hinhanh[0].ten_hinh : '',  // Hình ảnh chính
        anhphu1: hinhanh[1] ? hinhanh[1].ten_hinh : '',    // Hình ảnh phụ 1
        anhphu2: hinhanh[2] ? hinhanh[2].ten_hinh : '',    // Hình ảnh phụ 2
        anhphu3: hinhanh[3] ? hinhanh[3].ten_hinh : '',    // Hình ảnh phụ 3
      };
    });

    // Cập nhật dữ liệu vào state (giả sử bạn sử dụng state trong React)
    SetdataSource(data);
  }


  const api_Ten_SP = async () => {
    const res = await axios({ url: "http://localhost:8080/FindNameSP", method: "GET" });

    const options = res.data.map(item => ({
      value: item,
      label: item
    }))
    setnameSP(options)



  }



  const columns = [
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'tenSanPham',
      key: 'tenSanPham'
    },
    {
      title: 'Hình Ảnh Chính',
      dataIndex: 'anhchinh',
      key: 'anhchinh',
      render: (imageUrl) => (
        <Image
          width={50}
          height={60}
          src={`images/${imageUrl}`}
        />
      )
    },
    {
      title: 'Hình Ảnh Phụ 1',
      dataIndex: 'anhphu1',
      key: 'anhphu1',
      render: (imageUrl) => (
        <Image
          width={50}
          height={60}
          src={`images/${imageUrl}`}
        />
      )
    },
    {
      title: 'Hình Ảnh Phụ 2',
      dataIndex: 'anhphu2',
      key: 'anhphu2',
      render: (imageUrl) => (
        <Image
          width={50}
          height={60}
          src={`images/${imageUrl}`}
        />
      )
    },
    {
      title: 'Hình Ảnh Phụ 3',
      dataIndex: 'anhphu3',
      key: 'anhphu3',
      render: (imageUrl) => (
        <Image
          width={50}
          height={60}
          src={`images/${imageUrl}`}
        />
      )
    },
    {
      title: 'Nút',
      dataIndex: 'tenSanPham',
      key: 'name',
      render: (_, record) => (
        <>
          <EditOutlined style={{ fontSize: '24px', color: 'blue', marginLeft: "10px" }} onClick={() => {
            console.log('sad', record)
            formik.setFieldValue("name", record.tenSanPham)
            formik.setFieldValue("imagemain", record.anhchinh)
            formik.setFieldValue("imagephu1", record.anhphu1)
            formik.setFieldValue("imagephu2", record.anhphu2)
            formik.setFieldValue("imagephu3", record.anhphu3)
            formik.setFieldValue("imagemainold", record.anhchinh)
            formik.setFieldValue("imagephu1old", record.anhphu1)
            formik.setFieldValue("imagephu2old", record.anhphu2)
            formik.setFieldValue("imagephu3old", record.anhphu3)
            const tab2 = document.querySelector("#form-tab")

            tab2.click();
          }} ></EditOutlined>

        </>
      )
    }
  ];


  useEffect(() => {
    apiHinhAnh()
    api_Ten_SP()

  }, [])

  return (
    <div className='container-fluid'>

      <div>
        <ul className="nav nav-pills nav-fill" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active fw-bold" id="table-tab" onClick={()=>{
              apiHinhAnh()
            }} data-bs-toggle="tab" data-bs-target="#table-tab-pane" type="button" role="tab" aria-controls="table-tab-pane" aria-selected="true">DANH SÁCH</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link fw-bold" id="form-tab" data-bs-toggle="tab" data-bs-target="#form-tab-pane" type="button" role="tab" aria-controls="form-tab-pane" aria-selected="false">BIỂU MẨU</button>
          </li>
        </ul>
        {/* Tab content */}
        <div className="tab-content mt-3" id="myTabContent">
          {/* Table content */}
          <div className="tab-pane fade show active" id="table-tab-pane" role="tabpanel" aria-labelledby="table-tab">
            <h3 className='mb-4'>QUẢN LÍ HÌNH ẢNH CỦA SẢN PHẨM</h3>
            <Table columns={columns} dataSource={dataSource} />

          </div>
          {/* Form content */}
          <div className="tab-pane fade" id="form-tab-pane" role="tabpanel" aria-labelledby="form-tab">
            <form className="row mt-5" onSubmit={formik.handleSubmit}>



              <div className="col-md-6 my-2">

                <Select options={nameSP} isSearchable={true} name='name'
                  value={nameSP.find(option => option.value === formik.values.name)} // Set selected value
                  onChange={selectedOption => formik.setFieldValue('name', selectedOption ? selectedOption.value : '')} // Set selected value in Formik


                />

                {/* <select className="form-select form-select mb-4 text-primary fw-bold" name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                   aria-label="Large select example">

                <option selected >CHỌN SẢN PHẨM</option>
                <option value={1}>One</option>
                <option value={2}>Two</option>
                <option value={3}>Three</option>
              </select> */}

                {formik.touched.name && formik.errors.name && (
                  <div className="text-danger ms-1 fw-bold">{formik.errors.name}</div>
                )}




              </div>

              <div className="col-md-6 my-2">







              </div>

              <div className="col-md-3 my-2">


                {formik.values.imagemain == "" && <label gay="sad" className="custum-file-upload mt-4" htmlFor="file">

                  <div gay2="sad2" className="gay">
                    <div className="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeWidth={0} id="SVGRepo_bgCarrier" /><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" /><g id="SVGRepo_iconCarrier"> <path d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd" /> </g></svg>
                    </div>
                    <div className="text">
                      <span>Click to upload image</span>
                    </div>
                    <input type="file" id='file' name='imagemain' onChange={(event) => {
                      formik.setFieldValue('imagemain', event.currentTarget.files[0].name);



                    }} className=' mt-3' />
                  </div>



                </label>}

                {formik.values.imagemain != "" && <label gay="sad " id='cc' className="custum-file-upload mt-4" htmlFor="file">



                  <img className='img-fluid' onDoubleClick={(event) => {

                    formik.setFieldValue('imagemain', "");




                  }} style={{ height: "80px" }} src={`images/${formik.values.imagemain}`} alt="" />


                </label>}
                {formik.touched.imagemain && formik.errors.imagemain && <div className="text-danger ms-1 fw-bold">{formik.errors.imagemain}</div>}

              </div>

              <div className="col-md-3 my-2">


                {formik.values.imagephu1 == "" && <label gay1="sad" className="custum-file-upload mt-4" htmlFor="file">

                  <div gay3="sad2" className="gay">
                    <div className="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeWidth={0} id="SVGRepo_bgCarrier" /><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" /><g id="SVGRepo_iconCarrier"> <path d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd" /> </g></svg>
                    </div>
                    <div className="text">
                      <span>Click để chọn hỉnh ảnh phụ 1</span>
                    </div>
                    <input type="file" id='file' name='imagephu1' onChange={(event) => {
                      formik.setFieldValue('imagephu1', event.currentTarget.files[0].name);
                      changeImagephu1(event);


                    }} className=' mt-3' />
                  </div>



                </label>}

                {formik.values.imagephu1 != "" && <label gay="sad" className="custum-file-upload mt-4" htmlFor="file">



                  <img className='img-fluid' onDoubleClick={(event) => {

                    formik.setFieldValue('imagephu1', "");




                  }} style={{ height: "80px" }} src={`images/${formik.values.imagephu1}`} alt="" />


                </label>}





              </div>

              <div className="col-md-3 my-2">


                {formik.values.imagephu2 == "" && <label gay2="sad" className="custum-file-upload mt-4" htmlFor="file">

                  <div gay4="sad2" className="gay">
                    <div className="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeWidth={0} id="SVGRepo_bgCarrier" /><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" /><g id="SVGRepo_iconCarrier"> <path d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd" /> </g></svg>
                    </div>
                    <div className="text">
                      <span>Click để chọn hỉnh ảnh phụ 1</span>
                    </div>
                    <input type="file" id='file' name='imagephu2' onChange={(event) => {
                      formik.setFieldValue('imagephu2', event.currentTarget.files[0].name);
                      changeImagephu2(event);


                    }} className=' mt-3' />
                  </div>



                </label>}

                {formik.values.imagephu2 != "" && <label gay="sad" className="custum-file-upload mt-4" htmlFor="file">



                  <img className='img-fluid' onDoubleClick={(event) => {

                    formik.setFieldValue('imagephu2', "");




                  }} style={{ height: "80px" }} src={`images/${formik.values.imagephu2}`} alt="" />


                </label>}





              </div>

              <div className="col-md-3 my-2">


                {formik.values.imagephu3 == "" && <label gay3="sad" className="custum-file-upload mt-4" htmlFor="file">

                  <div gay5="sad2" className="gay">
                    <div className="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeWidth={0} id="SVGRepo_bgCarrier" /><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" /><g id="SVGRepo_iconCarrier"> <path d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd" /> </g></svg>
                    </div>
                    <div className="text">
                      <span>Click để chọn hỉnh ảnh phụ 1</span>
                    </div>
                    <input type="file" id='file' name='imagephu3' onChange={(event) => {
                      formik.setFieldValue('imagephu3', event.currentTarget.files[0].name);
                      changeImagephu3(event);


                    }} className=' mt-3' />
                  </div>



                </label>}

                {formik.values.imagephu3 != "" && <label gay="sad" className="custum-file-upload mt-4" htmlFor="file">



                  <img className='img-fluid' onDoubleClick={(event) => {

                    formik.setFieldValue('imagephu3', "");




                  }} style={{ height: "80px" }} src={`images/${formik.values.imagephu3}`} alt="" />


                </label>}






              </div>



              <div className="col-md-12 text-center mt-3">

                <button className='btn btn-outline-primary fw-bold ms-2 mt-2' type='submit' style={{ minWidth: 120 }} > Thêm Hình Ảnh</button>
                <button className='btn btn-outline-warning fw-bold ms-2 mt-2' type='submit' onClick={() => {
                  setupdate("cập nhật")
                }} style={{ minWidth: 120 }}> Cập nhật Hình Ảnh</button>
                <button className='btn btn-outline-success fw-bold ms-2 mt-2' onClick={()=>{
                  formik.resetForm()
                }} style={{ minWidth: 120 }}> Làm mới</button>

              </div>

            </form>
          </div>
        </div>
      </div>





    </div>
  )
}

export default CRUDAnh