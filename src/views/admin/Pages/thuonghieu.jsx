import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Container, Row, Col } from 'react-bootstrap';

const columns = () => [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Tên Thương Hiệu',
    dataIndex: 'tenThuongHieu',
  },
  {
    title: 'Ngày Tạo',
    dataIndex: 'ngayTao',
  },
  {
    title: 'Trạng Thái HD',
    dataIndex: 'trangThaiHD',
  },
  {
    title: 'Trạng Thái Xóa',
    dataIndex: 'trangThaiXoa',
  },
  {
    title: 'Hình Ảnh',
    dataIndex: 'hinhAnh',
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

const Thuonghieu = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    thuong_hieuID: '',
    ten_thuong_hieu: '',
    ngay_tao: '',
    hoat_dong: '',
    trang_thai_xoa: '',
    hinh_anh: '',
    accountID: '' 
  });


  // Load all brands
  const dataSource = async () => {
    const response = await axios.get('http://localhost:8080/loadAll');
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
      thuong_hieuID: '',
      ten_thuong_hieu: '',
      ngay_tao: '',
      hoat_dong: '',
      trang_thai_xoa: '',
      hinh_anh: '',
      accountID: ''
    });
  };

  // Hàm thêm thương hiệu
const handleAdd = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:8080/add', formData);
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

// Hàm cập nhật thương hiệu
const handleCapNhat = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.put(`http://localhost:8080/update/${formData.thuong_hieuID}`, formData);
    if (response.status === 200) {
      alert('Cập nhật thành công!');
      handleReset();
      dataSource();
    } else {
      alert('Có lỗi xảy ra, vui lòng thử lại.');
    }
  } catch (error) {
    console.error('Lỗi khi cập nhật thương hiệu:', error);
  }
};
  // Handle delete brand
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/delete/${id}`);
      if (response.status === 200) {
        alert('Xóa thành công!');
        handleReset();
        dataSource(); // Cập nhật lại danh sách
      } else {
        alert('Có lỗi xảy ra, vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Lỗi khi xóa thương hiệu:', error);
    }
  };

  // Handle edit brand
  const handleEdit = (item) => {
    // Chuyển đổi định dạng ngày tháng
    const ngay_tao = new Date(item.ngay_tao);
    const formattedNgayTao = ngay_tao.toISOString().slice(0, 16); // Chỉ lấy phần 'yyyy-MM-ddTHH:mm'
  
    setFormData({
      thuong_hieuID: item.thuong_hieuID,
      ten_thuong_hieu: item.ten_thuong_hieu,
      ngay_tao: formattedNgayTao, // Gán giá trị đã định dạng
      hoat_dong: item.hoat_dong,
      trang_thai_xoa: item.trang_thai_xoa,
      hinh_anh: item.hinh_anh,
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
          <h3>QUẢN LÍ THƯƠNG HIỆU</h3>
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
                  <td>{item.thuong_hieuID}</td>
                  <td>{item.ten_thuong_hieu}</td>
                  <td>{item.ngay_tao}</td>
                  <td>{item.hoat_dong}</td>
                  <td>{item.trang_thai_xoa}</td>
                  <td>{item.hinh_anh}</td>
                  <td>{item.accountID}</td>
                  <td>
                    <Button className="btn btn-warning me-2" onClick={() => handleEdit(item)}>Edit</Button>
                    <Button className="btn btn-danger" onClick={() => handleDelete(item.thuong_hieuID)}>Xóa</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="tab-pane fade" id="form-tab-pane">
          <h3>THÊM MỚI THƯƠNG HIỆU</h3>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>ID Thương Hiệu</Form.Label>
              <Form.Control
                type='text'
                name="thuong_hieuID"
                value={formData.thuong_hieuID}
                onChange={handleInputChange}
                placeholder="Nhập ID thương hiệu"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tên Thương Hiệu</Form.Label>
              <Form.Control
                type='text'
                name="ten_thuong_hieu"
                value={formData.ten_thuong_hieu}
                onChange={handleInputChange}
                placeholder="Nhập tên thương hiệu"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ngày Tạo</Form.Label>
              <Form.Control
                type='datetime-local'
                name="ngay_tao"
                value={formData.ngay_tao}
                onChange={handleInputChange}
                placeholder="Chọn ngày tạo"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Trạng Thái HD</Form.Label>
              <Form.Select name="hoat_dong" value={formData.hoat_dong} onChange={handleInputChange}>
                <option>Chọn trạng thái HD</option>
                <option value="Hoạt động">Hoạt động</option>
                <option value="Không hoạt động">Không hoạt động</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Trạng Thái Xóa</Form.Label>
              <Form.Select name="trang_thai_xoa" value={formData.trang_thai_xoa} onChange={handleInputChange}>
                <option>Chọn trạng thái</option>
                <option value="Đã xóa">Đã xóa</option>
                <option value="Chưa xóa">Chưa xóa</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Hình Ảnh</Form.Label>
              <Form.Control
                type='file'
                name="hinh_anh"
                value={formData.hinh_anh}
                onChange={handleInputChange}
                placeholder="Nhập hình Ảnh"
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
              <Button variant="danger" type="button" className="me-2" onClick={() => handleDelete(formData.thuong_hieuID)}>
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

export default Thuonghieu;
