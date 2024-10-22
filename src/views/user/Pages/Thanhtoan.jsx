import React, { useState } from 'react';
import { Table, Button, Space } from 'antd';

const columns = (onEdit, onDelete) => [
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
    title: 'Ghi Chú',
    dataIndex: 'ghiChu',
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary" onClick={() => onEdit(record)}>Sửa</Button>
        <Button type="danger" onClick={() => onDelete(record.key)}>Xóa</Button>
      </Space>
    ),
  },
];

// Dữ liệu mẫu
const dataSource = Array.from({ length: 10 }).map((_, i) => ({
  key: i,
  id: i + 1,
  tenPhuongThuc: `Phương Thức ${i + 1}`,
  tenLoai: `Loại ${i + 1}`,
  ghiChu: `Ghi chú cho phương thức ${i + 1}`,
}));

const ThanhToan = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [formState, setFormState] = useState({
    id: '',
    tenPhuongThuc: '',
    tenLoai: '',
    ghiChu: '',
  });

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onAdd = () => {
    console.log('Thêm mới:', formState);
    // Logic thêm mới
  };

  const onEdit = (record) => {
    console.log('Chỉnh sửa:', record);
    setFormState({
      id: record.id,
      tenPhuongThuc: record.tenPhuongThuc,
      tenLoai: record.tenLoai,
      ghiChu: record.ghiChu,
    });
  };

  const onDelete = (key) => {
    console.log('Xóa ID:', key);
    // Logic xóa
  };

  const onFormReset = () => {
    setFormState({
      id: '',
      tenPhuongThuc: '',
      tenLoai: '',
      ghiChu: '',
    });
  };

  return (
    <div className='container'>
      <div>
        <ul className="nav nav-pills nav-fill" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active fw-bold" id="table-tab" data-bs-toggle="tab" data-bs-target="#table-tab-pane" type="button" role="tab" aria-controls="table-tab-pane" aria-selected="true">DANH SÁCH</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link fw-bold" id="form-tab" data-bs-toggle="tab" data-bs-target="#form-tab-pane" type="button" role="tab" aria-controls="form-tab-pane" aria-selected="false">BIỂU MẪU</button>
          </li>
        </ul>

        {/* Nội dung các tab */}
        <div className="tab-content mt-3" id="myTabContent">
          {/* Nội dung bảng */}
          <div className="tab-pane fade show active" id="table-tab-pane" role="tabpanel" aria-labelledby="table-tab">
            <h3>QUẢN LÍ PHƯƠNG THỨC THANH TOÁN</h3>
            <Table rowSelection={rowSelection} columns={columns(onEdit, onDelete)} dataSource={dataSource} />
          </div>

          {/* Nội dung form */}
          <div className="tab-pane fade" id="form-tab-pane" role="tabpanel" aria-labelledby="form-tab">
            <h3>QUẢN LÍ PHƯƠNG THỨC THANH TOÁN</h3>
            <form>
              <div className="mb-3">
                <label className="form-label">TÊN PHƯƠNG THỨC</label>
                <input
                  type="text"
                  className="form-control"
                  value={formState.tenPhuongThuc}
                  onChange={(e) => setFormState({ ...formState, tenPhuongThuc: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">TÊN LOẠI</label>
                <input
                  type="text"
                  className="form-control"
                  value={formState.tenLoai}
                  onChange={(e) => setFormState({ ...formState, tenLoai: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">GHI CHÚ</label>
                <input
                  type="text"
                  className="form-control"
                  value={formState.ghiChu}
                  onChange={(e) => setFormState({ ...formState, ghiChu: e.target.value })}
                />
              </div>
              <Space>
                <Button type="primary" onClick={onAdd}>Thêm Mới</Button>
                <Button onClick={onFormReset}>Reset</Button>
              </Space>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThanhToan;
