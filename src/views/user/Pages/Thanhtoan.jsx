import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Container, Row, Col } from 'react-bootstrap';

const columns = () =>[
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Tên Phương Thức',
    dataIndex: 'tenPhuongThuc',
  },
  {
    title: 'Tên Loại',
    dataIndex: 'tenLoai',
  },
  {
    title: 'Account ID',
    dataIndex: 'accountID',
  },
  {
    title: 'Action',
    key: 'action',
  }
];

const Thanhtoan = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    phuong_thucTTID: '',
    ten_phuong_thuc: '', 
    ten_loai: '',
    accountID: ''
  });
  


  // Load all brands
  const dataSource = async () => {
    const response = await axios.get('http://localhost:8080/loadTable');
    console.log(response.data); // Kiểm tra dữ liệu trả về
    setData(response.data);
  };
  

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      phuong_thucTTID: '',
      ten_phuong_thuc: '',
      ten_loai: '',
      accountID: ''
    });
  };

  // Hàm thêm thương hiệu
const handleAdd = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:8080/addThanhToan', formData);
    if (response.status === 200) {
      alert('Thêm thành công!');
      handleReset();
      dataSource();
    } else {
      alert('Có lỗi xảy ra, vui lòng thử lại.');
    }
  } catch (error) {
    console.error('Lỗi khi thêm thương hiệu:', error);
  }
};

// Hàm cập nhật phuong thức
const handleCapNhat = async (e) => {
  e.preventDefault();
  
  if (!formData.phuong_thucTTID) {
    alert('ID Phương thức thanh toán không được để trống!');
    return;
  }

  try {
    const response = await axios.put(`http://localhost:8080/thanhtoan/update/${formData.phuong_thucTTID}`, formData);
    if (response.status === 200) {
      alert('Cập nhật thành công!');
      handleReset();
      dataSource();
    } else {
      alert('Có lỗi xảy ra, vui lòng thử lại.');
    }
  } catch (error) {
    console.error('Lỗi khi cập nhật phương thức thanh toán:', error);
  }
};


  // Handle delete brand
  const handleDelete = async (id) => {
    if (!id) {
      alert('Vui lòng chọn một phương thức thanh toán để xóa');
      return;
    }
  
    try {
      const response = await axios.delete(`http://localhost:8080/thanhtoan/delete/${id}`);
      if (response.status === 200) {
        alert('Xóa thành công!');
        handleReset();
        dataSource();
      } else {
        alert('Có lỗi xảy ra, vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Lỗi khi xóa phương thức thanh toán:', error);
    }
  };
  
  

  // Handle edit brand
  const handleEdit = (item) => {
    setFormData({
      phuong_thucTTID: item.phuong_thucTTID,
      ten_phuong_thuc: item.ten_phuong_thuc,
      ten_loai: item.ten_loai,
      accountID: item.accountID
    });
  };
  

  

  useEffect(() => {
    dataSource();
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
              <button className="nav-link active fw-bold" id="table-tab" data-bs-toggle="tab" data-bs-target="#table-tab-pane" type="button">
                DANH SÁCH
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link fw-bold" id="form-tab" data-bs-toggle="tab" data-bs-target="#form-tab-pane" type="button">
                BIỂU MẪU
              </button>
            </li>
          </ul>
        </Col>
      </Row>

      <div className="tab-content mt-3">
        <div className="tab-pane fade show active" id="table-tab-pane">
          <h3>QUẢN LÍ PHƯƠNG THỨC THANH TOÁN</h3>
          <Table bordered hover>
            <thead>
              <tr>
                {columns().map((col, index) => (
                  <th key={index}>{col.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.phuong_thucTTID}</td>
                  <td>{item.ten_phuong_thuc}</td>
                  <td>{item.ten_loai}</td>
                  <td>{item.accountID ? item.accountID : 'N/A'}</td>
                  <td>
                    <Button className="btn btn-warning me-2" onClick={() => handleEdit(item)}>Edit</Button>
                    <Button className="btn btn-danger" onClick={() => handleDelete(item.phuong_thucTTID)}>Xóa</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="tab-pane fade" id="form-tab-pane">
          <h3>THÊM MỚI PHƯƠNG THỨC THANH TOÁN</h3>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>ID Phương Thức</Form.Label>
              <Form.Control
                type='text'
                name="phuong_thucTTID"
                value={formData.phuong_thucTTID}
                onChange={handleInputChange}
                placeholder="Nhập ID phương thức thanh toán"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tên Phương Thức</Form.Label>
              <Form.Control
                type='text'
                name="ten_phuong_thuc"
                value={formData.ten_phuong_thuc}
                onChange={handleInputChange}
                placeholder="Nhập tên phương thức"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tên Loại</Form.Label>
              <Form.Control
                type='text'
                name="ten_loai"
                value={formData.ten_loai}
                onChange={handleInputChange}
                placeholder="Nhập tên loại"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Account ID</Form.Label>
              <Form.Control
                type='text'
                name="accountID"
                value={formData.accountID}
                onChange={handleInputChange}
                placeholder="Nhập Account ID"
              />
            </Form.Group>

            <Form.Group className="mb-3 ms-3 d-flex">
              <Button variant="success" type="button" onClick={handleAdd} className="me-2">
                Thêm
              </Button>
              <Button variant="warning" type="button" onClick={handleCapNhat} className="me-2">
                Cập nhật
              </Button>
              <Button variant="danger" type="button" className="me-2" onClick={() => handleDelete(formData.phuong_thucTTID)}>
                Xóa
              </Button>
              <Button variant="info" type="button" onClick={handleReset}>
                Reset
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default Thanhtoan;
