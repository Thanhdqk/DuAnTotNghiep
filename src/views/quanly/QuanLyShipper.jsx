import { Tabs, Select, Table, Upload, Image, Button } from "antd"; // Thêm Table từ antd
import "../../styles/QuanLyVoucher.css";
import {
  ExportOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import { data, get, param } from "jquery";
import * as XLSX from "xlsx";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { notification } from "antd";
//import "../../assets/images"

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const QuanLyShipper = () => {
  const [voucherData, setVoucherData] = useState([]);
  const [selectedShipper, setSelectedShipper] = useState({
    shipperID: "",
    hoat_dong: "On",
    password: "",
    hovaten: "",
  });
  const [activeKey, setActiveKey] = useState("1");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [searchStatus, setSearchStatus] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [isAddDisabled, setIsAddDisabled] = useState(false);
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(false);
  const [listShipper, setListShipper] = useState([]);
  const [listShipperDaGiao, setListShipperDaGiao] = useState([]);
  const [listNhatKy, setListNhatKy] = useState([]);

  // Kiểm tra quyền admin
  const isAdmin = userData && userData.roles.includes("Admin");
  // Hàm lấy ngày hiện tại theo định dạng YYYY-MM-DD
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const sendEmail = async (email, subject, text) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/send", // Đảm bảo đường dẫn là chính xác
        null,
        {
          params: {
            to: email,
            subject: subject,
            text: text, // Nội dung HTML sẽ được truyền ở đây
          },
        }
      );
      console.log("Email gửi thành công:", response.data);
    } catch (error) {
      console.error("Lỗi khi gửi email:", error);
    }
  };

  const handleChange = (value) => {
    console.log("Selected option:", value); // Log để kiểm tra
    setSelectedShipper((prev) => ({
      ...prev,
      hoat_dong: value, // Cập nhật trạng thái hoat_dong
    }));
  };

  const danhSachShipperDaGiao = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/shipper/listShipper/daGiao"
      );
      console.log("Dữ liệu đã giao: ", response.data);
      setListShipperDaGiao(response.data);
    } catch {}
  };
  const fetchVoucherData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/shipper/listShipper"
      );
      console.log("List shipper nè: ", response.data);
      setListShipper(response.data);
    } catch {}
  };

  useEffect(() => {
    fetchVoucherData();
    const data = JSON.parse(localStorage.getItem("data"));
    setUserData(data);

    // Nếu người dùng không phải admin, tự động chuyển sang tab 1
    if (data && !data.roles.includes("Admin")) {
      setActiveKey("1");
    }
    danhSachShipperDaGiao();
    danhSachNhatKy();
  }, []);

  let voucher = {};
  const voucherChung = () => {
    console.log("ShipperID nè: ", selectedShipper.shipperID);
    console.log("Hoạt động nè: ", selectedShipper.hoat_dong);
    console.log("Họ và tên nè: ", selectedShipper.hovaten);
    console.log("Password nè: ", selectedShipper.password);
    voucher = {
      shipperID: selectedShipper.shipperID,
      hoat_dong: selectedShipper.hoat_dong,
      hovaten: selectedShipper.hovaten,
      password: selectedShipper.password,
      accountID: jwtDecode(localStorage.getItem("jwtToken")).sub,
    };
    return voucher;
  };

  const chiTietShipper = async (shipperID) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/shipper/chiTiet/${shipperID}`
      );
      console.log("Chi tiết shipper: ", response.data);
      setSelectedShipper(response.data[0]);
      setActiveKey("1");
      setIsDisabled(true);
    } catch {}
  };
  const handleSaveShipper = async () => {
    const shipperChung = voucherChung();
    console.log("Khi nhấn lưu nè: ", shipperChung);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/shipper/addShipper",
        shipperChung,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      alert("Thêm shipper thành công.");
      sendEmail(
        shipperChung.shipperID,
        "Cung cấp tài khoản",
        "Tài khoản: " +
          shipperChung.shipperID +
          " Mật khẩu: " +
          shipperChung.password
      );
      fetchVoucherData();
      handelClear();
      console.log("Lưu thành công: ", response.data);
    } catch {}
  };

  const danhSachNhatKy = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/shipper/listNhatKy"
      );
      console.log("Dữ liệu nhật ký nè: ", response.data);
      setListNhatKy(response.data);
    } catch {
      console.error("Lỗi khi lấy dữ liệu voucher:");
    }
  };
  const handleUpdateShipper = async () => {
    const shipperChung = voucherChung();
    console.log("Khi nhấn lưu nè: ", shipperChung);
    try {
      const response = await axios.put(
        `http://localhost:8080/api/shipper/updateShipper`,
        shipperChung,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      notification.success({
        message: "Thêm thành công !",
        description: `Cập nhật shipper thành công !`,
        duration: 3, // thời gian hiển thị
      });
      setSelectedShipper("");
      fetchVoucherData();
      console.log("Lưu thành công: ", response.data);
    } catch {}
  };

  const updateKhoiPhucShipper = async (record) => {
    const shipperChung = voucherChung();
    try {
      const response = await axios.put(
        `http://localhost:8080/api/shipper/update/khoiphuc/${record}`,
        {
          params: shipperChung.accountID,
        }
      );
      fetchVoucherData();
      console.log("Dữ liệu xóa nè: ", response.data);
      alert("Khôi phục shipper thành cong");
    } catch {}
  };

  const updateShipperXoaTable = async (record) => {
    const shipperChung = voucherChung();
    try {
      const response = await axios.put(
        `http://localhost:8080/api/shipper/update/trangThaiXoa/${record}`,
        shipperChung
      );
      fetchVoucherData();
      setSelectedShipper("");
      console.log("Dữ liệu xóa nè: ", response.data);
      alert("Xóa shipper thành cong");
    } catch {}
  };

  const updateShipperXoaInput = async () => {
    const shipperChung = voucherChung();
    try {
      const response = await axios.put(
        `http://localhost:8080/api/shipper/update/trangThaiXoa/${shipperChung.shipperID}`,
        shipperChung
      );
      fetchVoucherData();
      setSelectedShipper("");
      console.log("Dữ liệu xóa nè: ", response.data);
      alert("Xóa shipper thành cong");
    } catch {}
  };

  const handelClear = () => {
    setSelectedShipper("");
    setIsDisabled(false);
  };

  // Cấu hình cột cho bảng
  let columnsDaGiao = [
    {
      title: "Shipper ID",
      dataIndex: "shipperID",
      key: "voucherID",
    },
    {
      title: "Họ và tên",
      dataIndex: "hovaten",
      key: "hovaten",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinh_anh",
      key: "hinh_anh",
      render: (text) =>
        text ? (
          <img
            src={`http://localhost:8080/images/${text}`}
            alt="Voucher"
            style={{ width: 50, height: 50 }}
          />
        ) : (
          <UserOutlined style={{ fontSize: 50, color: "#ccc" }} />
        ),
    },
    {
      title: "Ngày",
      dataIndex: "thoi_gianxn",
      key: "thoi_gianxn",
    },
    {
      title: "Hoạt động",
      dataIndex: "hoat_dong",
      key: "hoat_dong",
    },
    {
      title: "Vai trò",
      dataIndex: "vai_tro",
      key: "vai_tro",
    },
    {
      title: "Đơn hàng đã giao",
      dataIndex: "don_hangID",
      key: "don_hangID",
    },
  ];
  if (isAdmin) {
    columnsDaGiao = columnsDaGiao.filter((col) => col.key !== "hanhdong"); // Lọc cột "hanhdong" nếu là admin
  }

  let columns = [
    {
      title: "Shipper ID",
      dataIndex: "shipperID",
      key: "voucherID",
    },
    {
      title: "Họ và tên",
      dataIndex: "hovaten",
      key: "hovaten",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinh_anh",
      key: "hinh_anh",
      render: (text) =>
        text ? (
          <img
            src={`http://localhost:8080/images/${text}`}
            alt="Voucher"
            style={{ width: 50, height: 50 }}
          />
        ) : (
          <UserOutlined style={{ fontSize: 50, color: "#ccc" }} />
        ),
    },
    {
      title: "Hoạt động",
      dataIndex: "hoat_dong",
      key: "hoat_dong",
    },
    {
      title: "Vai trò",
      dataIndex: "vai_tro",
      key: "vai_tro",
    },
    {
      title: "Hành động",
      dataIndex: "hanhdong",
      key: "hanhdong",
      render: (text, record) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <EditOutlined
            style={{ cursor: "pointer", color: "#1890ff" }}
            onClick={() => chiTietShipper(record.shipperID)}
          />
          {record.hoat_dong !== "Hoạt động" &&
            record.trang_thai_xoa !== "Đã xóa" && (
              <DeleteOutlined
                style={{ cursor: "pointer", color: "red" }}
                onClick={() => updateShipperXoaTable(record.shipperID)}
              />
            )}
          {record.trang_thai_xoa === "Đã xóa" && (
            <ReloadOutlined
              style={{ cursor: "pointer", color: "green" }}
              onClick={() => updateKhoiPhucShipper(record.shipperID)}
            />
          )}
        </div>
      ),
    },
  ];
  if (isAdmin) {
    columns = columns.filter((col) => col.key !== "hanhdong"); // Lọc cột "hanhdong" nếu là admin
  }
  const columnsNhatKyHoatDong = [
    {
      title: "Người thực hiện",
      dataIndex: "accountID",
      key: "accountID",
    },
    {
      title: "Ngày hành động",
      dataIndex: "ngay_hanh_dong",
      key: "ngay_hanh_dong",
    },
    {
      title: "Tên hành động",
      dataIndex: "ten_hanh_dong",
      key: "ten_hanh_dong",
    },
    {
      title: "ShipperID được thêm",
      dataIndex: "shipperID",
      key: "shipperID",
    },
  ];

  const filteredShipperBangNULL = listShipper.filter((shipper) => {
    return shipper.trang_thai_xoa === null;
  });

  const filteredShipperKhacNull = listShipper.filter((shipper) => {
    return shipper.trang_thai_xoa !== null;
  });

  // Xuất file Excel
  const exportToExcel = () => {
    const filteredData = searchStatus
      ? voucherData.filter((voucher) => voucher.hoat_dong === searchStatus)
      : voucherData;

    // Chuyển đổi dữ liệu thành bảng
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Voucher");

    // Xuất file Excel
    XLSX.writeFile(workbook, "VoucherData.xlsx");
  };

  return (
    <Tabs
      className="mx-auto"
      style={{ width: "1180px", margin: "auto" }}
      //onChange={onChange}
      activeKey={activeKey} // Điều khiển tab hiện tại
      onChange={(key) => setActiveKey(key)}
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
                  <label htmlFor="productCode">ShipperID</label>
                  <input
                    type="text"
                    id="shipperID"
                    className="form-control"
                    disabled={isDisabled}
                    value={selectedShipper.shipperID}
                    onChange={(e) =>
                      setSelectedShipper({
                        ...selectedShipper,
                        shipperID: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="productCode">Họ và tên</label>
                  <input
                    type="text"
                    id="hovaten"
                    className="form-control"
                    disabled={isDisabled}
                    value={selectedShipper.hovaten}
                    onChange={(e) =>
                      setSelectedShipper({
                        ...selectedShipper,
                        hovaten: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="productName">Mật khẩu</label>
                  <input
                    type="text"
                    id="password"
                    className="form-control"
                    disabled={isDisabled}
                    value={selectedShipper.password}
                    onChange={(e) =>
                      setSelectedShipper({
                        ...selectedShipper,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="warehouseStatus">Hoạt động</label>
                  <Select
                    value={selectedShipper.hoat_dong} // Đồng bộ với state selectedVoucher
                    onChange={(value) =>
                      setSelectedShipper({
                        ...selectedShipper,
                        hoat_dong: value, // Cập nhật đúng giá trị vào state
                      })
                    }
                    options={[
                      { value: "On", label: "On" },
                      { value: "Off", label: "Off" },
                    ]}
                    styles={{
                      control: (base) => ({
                        ...base,
                        width: "100%",
                        borderRadius: "8px",
                        height: "40px",
                      }),
                    }}
                  />
                </div>
              </div>

              <div className="input-container">
                <div className="form-group">
                  <button
                    className="button"
                    id="themvoucher"
                    disabled={isAddDisabled}
                    onClick={handleSaveShipper}
                  >
                    Thêm
                  </button>
                </div>
                <div className="form-group">
                  <button className="button" onClick={handleUpdateShipper}>
                    Cập nhật
                  </button>
                </div>
                <div className="form-group">
                  <button
                    className="button"
                    id="xoavoucher"
                    disabled={isDeleteDisabled}
                    onClick={updateShipperXoaInput}
                  >
                    Xóa
                  </button>
                </div>
                <div className="form-group">
                  <button className="button" onClick={handelClear}>
                    Làm mới
                  </button>
                </div>
              </div>
            </div>
          ),
          disabled: isAdmin,
        },
        {
          label: `Danh sách shipper`,
          key: "2",
          children: (
            <div className="tab-content">
              <h1>Danh sách shipper</h1>
              <button
                style={{
                  marginBottom: "20px",
                  float: "right",
                  display: "flex",
                  alignItems: "center",
                }}
                className="buttonexcel"
                onClick={exportToExcel}
                disabled={isAdmin}
              >
                <ExportOutlined style={{ marginRight: "8px" }} /> Xuất file
                excel
              </button>
              <label htmlFor="searchStatus">Tìm kiếm theo trạng thái</label>
              <Select
                defaultValue="Tất cả"
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  height: "40px",
                }}
                onChange={setSearchStatus} // Cập nhật trạng thái tìm kiếm
                options={[
                  { value: "", label: "Tất cả" }, // Không lọc
                  { value: "Hoạt động", label: "Hoạt động" },
                  { value: "Ngừng hoạt động", label: "Ngừng hoạt động" },
                ]}
              />
              <Table
                dataSource={filteredShipperBangNULL}
                columns={columns}
                pagination={true}
              />
            </div>
          ),
        },
        {
          label: `Danh sách shipper đã giao hàng`,
          key: "3",
          children: (
            <div className="tab-content">
              <h1>Danh sách shipper</h1>
              <button
                style={{
                  marginBottom: "20px",
                  float: "right",
                  display: "flex",
                  alignItems: "center",
                }}
                className="buttonexcel"
                onClick={exportToExcel}
                disabled={isAdmin}
              >
                <ExportOutlined style={{ marginRight: "8px" }} /> Xuất file
                excel
              </button>
              <label htmlFor="searchStatus">Tìm kiếm theo trạng thái</label>
              <Select
                defaultValue="Tất cả"
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  height: "40px",
                }}
                onChange={setSearchStatus} // Cập nhật trạng thái tìm kiếm
                options={[
                  { value: "", label: "Tất cả" }, // Không lọc
                  { value: "Hoạt động", label: "Hoạt động" },
                  { value: "Ngừng hoạt động", label: "Ngừng hoạt động" },
                ]}
              />
              <Table
                dataSource={listShipperDaGiao}
                columns={columnsDaGiao}
                pagination={true}
              />
            </div>
          ),
        },
        {
          label: "Lịch sử xóa",
          key: "4",
          children: (
            <div className="tab-content">
              <h1>Lịch sử xóa</h1>
              <Table
                dataSource={filteredShipperKhacNull}
                columns={columns}
                pagination={false}
              />
            </div>
          ),
        },
        {
          label: "Nhật ký hoạt động",
          key: "5",
          children: (
            <div className="tab-content">
              <h1>Nhật kí hoạt động</h1>
              <Table
                dataSource={listNhatKy}
                columns={columnsNhatKyHoatDong}
                pagination={false}
              />
            </div>
          ),
        },
      ]}
    />
  );
};

export default QuanLyShipper;
