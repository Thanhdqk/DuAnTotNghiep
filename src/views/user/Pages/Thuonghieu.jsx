import React from 'react';
import { Table, Button, Form, Container, Row, Col } from 'react-bootstrap';

const columns = (onEdit, onDelete) => [
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
    title: 'Trạng Thái PD',
    dataIndex: 'trangThaiPD',
  },
  {
    title: 'Trạng Thái HD',
    dataIndex: 'trangThaiHD',
  },
  {
    title: 'Ghi Chú',
    dataIndex: 'ghiChu',
  },
  {
    title: 'Account ID',
    dataIndex: 'accountID',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <>
        <Button variant="warning" onClick={() => onEdit(record)} className="me-2">Edit</Button>
        <Button variant="danger" onClick={() => onDelete(record.key)}>Delete</Button>
      </>
    ),
  },
];

const dataSource = Array.from({ length: 10 }).map((_, i) => ({
  key: i,
  id: i + 1,
  tenThuongHieu: `Thương Hiệu ${i + 1}`,
  ngayTao: `2024-10-${10 + i}`,
  trangThaiPD: i % 2 === 0 ? 'Chấp nhận' : 'Từ chối',
  trangThaiHD: i % 2 === 0 ? 'Hoạt động' : 'Không hoạt động',
  ghiChu: `Ghi chú cho thương hiệu ${i + 1}`,
  accountID: `A00${i + 1}`,
}));

const Thuonghieu = () => {
  const onEdit = (record) => {
    // Xử lý khi nhấn nút Edit
    console.log('Edit', record);
  };

  const onDelete = (key) => {
    // Xử lý khi nhấn nút Delete
    console.log('Delete', key);
  };

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
                {columns(onEdit, onDelete).map((col, index) => (
                  <th key={index}>{col.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataSource.map((data) => (
                <tr key={data.key}>
                  {columns(onEdit, onDelete).map((col, index) => (
                    <td key={index}>{col.render ? col.render(null, data) : data[col.dataIndex]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="tab-pane fade" id="form-tab-pane">
          <h3>THÊM MỚI THƯƠNG HIỆU</h3>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên Thương Hiệu</Form.Label>
              <Form.Control placeholder="Nhập tên thương hiệu" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Trạng Thái PD</Form.Label>
              <Form.Select placeholder="Chọn trạng thái PD" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Trạng Thái HD</Form.Label>
              <Form.Select placeholder="Nhập trạng thái HD" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ghi Chú</Form.Label>
              <Form.Control placeholder="Nhập ghi chú" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Account ID</Form.Label>
              <Form.Control placeholder="Nhập Account ID" />
            </Form.Group>
            <Form.Group className='mb-3 ms-3 d-flex'>
              <Button variant="success" type="submit" className="me-2">
                Thêm
              </Button>
              <Button variant="warning" type="button" className="me-2">
                Sửa
              </Button>
              <Button variant="danger" type="button" className="me-2">
                Xóa
              </Button>
              <Button variant="info" type="button">
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
