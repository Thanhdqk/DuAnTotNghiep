import { Tabs, Select, Table } from "antd"; // Thêm Table từ antd
import "../../styles/Quanlykho.css";
import { ExportOutlined } from "@ant-design/icons";

const onChange = (key) => {
  console.log(key);
};

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Dữ liệu cho bảng
const dataSource = [
  {
    key: "1",
    productCode: "SP001",
    productName: "Sản phẩm 1",
    quantity: 50,
    status: "Hoạt động",
    action: (
      <div>
        <button className="buttonedit">Edit</button>
        <button className="buttondelete">Delete</button>
      </div>
    ),
  },
  {
    key: "2",
    productCode: "SP002",
    productName: "Sản phẩm 2",
    quantity: 30,
    status: "Ngừng hoạt động",
    action: (
      <div>
        <button className="buttonedit">Edit</button>
        <button className="buttondelete">Delete</button>
      </div>
    ),
  },
  {
    key: "3",
    productCode: "SP003",
    productName: "Sản phẩm 3",
    quantity: 20,
    status: "Hoạt động",
    action: (
      <div>
        <button className="buttonedit">Edit</button>
        <button className="buttondelete">Delete</button>
      </div>
    ),
  },
];

// Cấu hình cột cho bảng
const columns = [
  {
    title: "Mã sản phẩm",
    dataIndex: "productCode",
    key: "productCode",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "productName",
    key: "productName",
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Hành động",
    dataIndex: "action",
    key: "action",
  },
];

const Kho = () => (
  <Tabs
    className="mx-auto"
    style={{ width: "700px", margin: "auto" }}
    onChange={onChange}
    type="card"
    items={[
      {
        label: `Thông tin chung`,
        key: "1",
        children: (
          <div className="tab-content">
            <h1>Thông tin chung</h1>
            <div className="input-container">
              <div className="form-group">
                <label htmlFor="productCode">Mã sản phẩm</label>
                <input type="text" id="productCode" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="productName">Tên sản phẩm</label>
                <input type="text" id="productName" className="form-control" />
              </div>
            </div>

            <div className="input-container">
              <div className="form-group">
                <label htmlFor="createDate">Ngày tạo</label>
                <input
                  type="date"
                  id="createDate"
                  className="form-control"
                  value={getCurrentDate()}
                />
              </div>
              <div className="form-group">
                <label htmlFor="productQuantity">Số lượng</label>
                <input
                  type="number"
                  id="productQuantity"
                  className="form-control"
                />
              </div>
            </div>

            <div className="input-container">
              <div className="form-group">
                <label htmlFor="warehouseStatus">Trạng thái kho</label>
                <Select
                  defaultValue="active"
                  style={{ width: "100%", borderRadius: "8px" }}
                  onChange={handleChange}
                  options={[
                    { value: "active", label: "Hoạt động" },
                    { value: "inactive", label: "Ngừng hoạt động" },
                  ]}
                />
              </div>
              <div className="form-group">
                <button className="button">Cập nhật</button>
              </div>
            </div>
          </div>
        ),
      },
      {
        label: `Danh sách kho`,
        key: "2",
        children: (
          <div className="tab-content">
            <h1>Danh sách kho</h1>
            <button
              style={{
                marginBottom: "20px",
                float: "right", 
                display: "flex", 
                alignItems: "center", 
              }}
              className="buttonexcel"
            >
              <ExportOutlined style={{ marginRight: "8px" }} />{" "}
              Xuất file excel
            </button>
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
            />
          </div>
        ),
      },
    ]}
  />
);

export default Kho;
