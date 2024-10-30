import { Tabs, Select, Table, Upload, Image, Button } from "antd"; // Thêm Table từ antd
import "./thuonghieu.css";
import {
  ExportOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import { data } from "jquery";
import * as XLSX from "xlsx";
//import "../../assets/images"

const onChange = (key) => {
  console.log(key);
};

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const handleTrangThaiXoaChange = (value2) => {
  console.log(`selected ${value2}`);
};

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Thuonghieu = () => {
  const [thuonghieuData, setThuonghieuData] = useState([]);
  const [hoatDong, setHoatDong] = useState("Hoạt động");
  const [trangThaiXoa, setTrangThaiXoa] = useState("Chưa xóa");
  const [selectedThuongHieu, setSelectedThuongHieu] = useState(null);
  const [activeKey, setActiveKey] = useState("1");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [searchStatus, setSearchStatus] = useState("");
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChangeImage = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setSelectedThuongHieu((prev) => ({
      ...prev,
      hinh_anh: newFileList.map((file) =>
        file.response ? file.response.url : file.url
      ), // Lưu URL hình ảnh
    }));
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  const handleEdit = (thuonghieu) => {
    setSelectedThuongHieu(thuonghieu);
    setActiveKey("1");

    // Chuyển đổi 'hinh_anh' thành mảng nếu cần
    const images = Array.isArray(thuonghieu.hinh_anh)
      ? thuonghieu.hinh_anh
      : [thuonghieu.hinh_anh];

    // Tạo fileList từ danh sách hình ảnh
    const initialFileList = images.map((image) => ({
      uid: image, // ID duy nhất
      name: image ? image.split("/").pop() : "unknown.png", // Tên file
      status: "done", // Đã tải xong
      url: image.startsWith("http")
        ? image // Nếu là URL tuyệt đối, dùng luôn
        : `http://localhost:8080/images/${image}`, // URL đầy đủ
    }));

    setFileList(initialFileList);
    console.log(thuonghieu);
  };

  const handleChange = (value) => {
    setHoatDong(value); // Cập nhật trạng thái hoạt động
  };

  const handleTrangThaiXoaChange = (value2) => {
    setTrangThaiXoa(value2);
  };

  const fetchThuongHieuData = async () => {
    try {
      const response = await fetch("http://localhost:8080/loadAll");
      const data = await response.json();
      console.log("Dữ liệu là: ", data);
      const formattedData = data.map((item) => ({
        key: item.thuong_hieuID,
        thuong_hieuID: item.thuong_hieuID,
        ten_thuong_hieu: item.ten_thuong_hieu,
        ngay_tao: item.ngay_tao,
        hoat_dong: item.hoat_dong,
        trang_thai_xoa: item.trang_thai_xoa,
        hinh_anh: item.hinh_anh,
        accountID: item.users.accountID,
      }));
      setThuonghieuData(formattedData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu thương hiệu:", error);
    }
  };

  useEffect(() => {
    fetchThuongHieuData();
  }, []);

  let thuonghieu = {};
  const thuonghieuChung = () => {
    thuonghieu = {
      thuong_hieuID: document.getElementById("thuong_hieuID").value,
      ten_thuong_hieu: document.getElementById("ten_thuong_hieu").value,
      ngay_tao: document.getElementById("ngay_tao").value,
      hoat_dong: hoatDong,
      trang_thai_xoa: trangThaiXoa,
      accountID: document.getElementById("accountID").value,
    };
  };

  const handleSave = async () => {
    thuonghieuChung();

    const formData = new FormData();
    for (const key in thuonghieu) {
      formData.append(key, thuonghieu[key]);
    }

    // Sử dụng ref để lấy file
    fileList.forEach((file) => {
      formData.append("hinh_anh", file.originFileObj); // Sử dụng originFileObj để lấy file thực tế
    });
    try {
      const response = await fetch("http://localhost:8080/thuonghieu/add", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Thương hiệu đã được thêm thành công:", data);
        alert("Thêm thương hiệu thành công!");
        fetchThuongHieuData();
        clear();
        console.log("URL ảnh:", data.imageUrl);
        console.log(selectedThuongHieu);
      } else {
        const errorData = await response.json();
        console.error("Lỗi khi thêm thương hiệu:", response.statusText, errorData);
        alert("Thêm thương hiệu thất bại!");
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const handleUpdate = async () => {
    thuonghieuChung();

    const formData = new FormData();
    for (const key in thuonghieu) {
      formData.append(key, thuonghieu[key]);
    }

    // Nếu có hình ảnh mới, thêm vào formData
    fileList.forEach((file) => {
      formData.append("hinh_anh", file.originFileObj);
    });
    try {
      const response = await fetch(
        `http://localhost:8080/thuonghieu/update/${thuonghieu.thuong_hieuID}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Thương hiệu đã được cập nhật thành công:", data);
        alert("Cập nhật thương hiệu thành công!");
        fetchThuongHieuData(); // Tải lại dữ liệu
        clear();
      } else {
        const errorData = await response.json();
        console.error(
          "Lỗi khi cập nhật voucher:",
          response.statusText,
          errorData
        );
        alert("Cập nhật voucher thất bại!");
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const clear = () => {
    document.getElementById("thuong_hieuID").value = "";
    document.getElementById("ten_thuong_hieu").value = "";
    document.getElementById("ngay_tao").value = "";

    setSelectedThuongHieu(null);

    setFileList([]);
    setHoatDong("Hoạt động");
    setTrangThaiXoa("Chưa xóa");
    document.getElementById("accountID").value = "";
  }
  const handelClear = () => {
    clear();
  };

  const handleDeleteInput = (thuong_hieuID) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa voucher này?")) {
      // Gọi API xóa voucher
      deleteThuongHieuInput(thuong_hieuID);
    }
  };

  const handleDeleteTable = (thuong_hieuID) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thương hiệu này?")) {
      // Gọi API xóa voucher
      deleteThuongHieuTable(thuong_hieuID);
    }
  };

  const deleteThuongHieuInput = async () => {
    thuonghieuChung();
    try {
      const response = await fetch(
        `http://localhost:8080/thuonghieu/delete/${thuonghieu.thuong_hieuID}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Thương hiệu đã được xóa thành công!");
        fetchThuongHieuData();
        clear();
        // Cập nhật lại danh sách vouchers nếu cần
      } else {
        alert("Lỗi khi xóa thương hiệu.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };
  const deleteThuongHieuTable = async (thuong_hieuID) => {
    try {
      const response = await fetch(
        `http://localhost:8080/thuonghieu/delete/${thuong_hieuID}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Thương hiệu đã được xóa thành công!");
        fetchThuongHieuData();
        // Cập nhật lại danh sách vouchers nếu cần
      } else {
        alert("Lỗi khi xóa thương hiệu.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };
  // Cấu hình cột cho bảng
  const columns = [
    {
      title: "Mã thương hiệu",
      dataIndex: "thuong_hieuID",
      key: "thuong_hieuID",
    },
    {
      title: "Tên thuong hiệu",
      dataIndex: "ten_thuong_hieu",
      key: "ten_thuong_hieu",
    },
    {
      title: "Ngày tạo",
      dataIndex: "ngay_tao",
      key: "ngay_tao",
    },
    {
      title: "Hoạt động",
      dataIndex: "hoat_dong",
      key: "hoat_dong",
    },
    {
      title: "Trạng thái xoa",
      dataIndex: "trang_thai_xoa",
      key: "trang_thai_xoa",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinh_anh",
      key: "hinh_anh",
      render: (text) => (
        <img
          src={`http://localhost:8080/images/${text}`}
          alt="Thương hiệu"
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    {
      title: "Account ID",
      dataIndex: "accountID",
      key: "accountID",
    },
    {
      title: "Hành động",
      dataIndex: "hanhdong",
      key: "hanhdong",
      render: (text, record) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <EditOutlined
            style={{ cursor: "pointer", color: "#1890ff" }}
            onClick={() => handleEdit(record)}
          />
          <DeleteOutlined
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => handleDeleteTable(record.thuong_hieuID)}
          />
        </div>
      ),
    },
  ];

  // Lọc trạng thái
  const filteredThuongHieuData = searchStatus
    ? thuonghieuData.filter((thuonghieu) => thuonghieu.hoat_dong === searchStatus)
    : thuonghieuData; // Nếu không có trạng thái tìm kiếm, hiển thị tất cả

  // Xuất file Excel
  const exportToExcel = () => {
    const filteredData = searchStatus
      ? thuonghieuData.filter((thuonghieu) => thuonghieu.hoat_dong === searchStatus)
      : thuonghieuData;

    // Chuyển đổi dữ liệu thành bảng
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ThuongHieu");

    // Xuất file Excel
    XLSX.writeFile(workbook, "ThuongHieuData.xlsx");
  };
  return (
    <Tabs
      className="mx-auto"
      style={{ width: "1100px", margin: "auto" }}
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
                  <label htmlFor="productCode">Thương Hiệu ID</label>
                  <input
                    type="text"
                    id="thuong_hieuID"
                    className="form-control"
                    value={selectedThuongHieu?.thuong_hieuID || ""}
                    onChange={(e) =>
                      setSelectedThuongHieu({
                        ...selectedThuongHieu,
                        thuong_hieuID: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="productName">Tên Thương Hiệu</label>
                  <input
                    type="text"
                    id="ten_thuong_hieu"
                    className="form-control"
                    value={selectedThuongHieu?.ten_thuong_hieu || ""}
                    onChange={(e) =>
                      setSelectedThuongHieu({
                        ...selectedThuongHieu,
                        ten_thuong_hieu: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="productName">Account ID</label>
                  <input
                    type="text"
                    id="accountID"
                    className="form-control"
                    value={selectedThuongHieu?.accountID || ""}
                    onChange={(e) =>
                      setSelectedThuongHieu({
                        ...selectedThuongHieu,
                        accountID: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="input-container">
                <div className="form-group">
                  <label htmlFor="createDate">Ngày tạo</label>
                  <input
                    type="date"
                    id="ngay_tao"
                    className="form-control"
                    value={selectedThuongHieu?.ngay_tao || ""}
                    onChange={(e) =>
                      setSelectedThuongHieu({
                        ...selectedThuongHieu,
                        ngay_tao: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="warehouseStatus">Hoạt động</label>
                  <Select
                    value={hoatDong}
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      height: "40px",
                    }}
                    onChange={handleChange}
                    options={[
                      { value: "Hoạt động", label: "Hoạt động" },
                      { value: "Ngừng hoạt động", label: "Ngừng hoạt động" },
                    ]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="warehouseStatus">Trạng thái xóa</label>
                  <Select
                    value={trangThaiXoa}
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      height: "40px",
                    }}
                    onChange={handleTrangThaiXoaChange}
                    options={[
                      { value: "Chưa xóa", label: "Chưa xóa" },
                      { value: "Đã xóa", label: "Đã xóa" },
                    ]}
                  />
                </div>
              </div>
              <Upload
                action="http://localhost:8080/images/"
                listType="picture-card"
                fileList={fileList}
                value={selectedThuongHieu?.hinh_anh || ""}
                onPreview={handlePreview}
                onChange={handleChangeImage}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>

              <div className="input-container">
                <div className="form-group">
                  <button className="button" onClick={handleSave}>
                    Thêm
                  </button>
                </div>
                <div className="form-group">
                  <button className="button" onClick={handleUpdate}>
                    Cập nhật
                  </button>
                </div>
                <div className="form-group">
                  <button
                    className="button"
                    onClick={() => handleDeleteInput(thuonghieu.thuong_hieuID)}
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
        },
        {
          label: `Danh sách thương hiệu`,
          key: "2",
          children: (
            <div className="tab-content">
              <h1>Danh sách voucher</h1>
              <button
                style={{
                  marginBottom: "20px",
                  float: "right",
                  display: "flex",
                  alignItems: "center",
                }}
                className="buttonexcel"
                onClick={exportToExcel}
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
                dataSource={filteredThuongHieuData}
                columns={columns}
                pagination={false}
              />
            </div>
          ),
        },
      ]}
    />
  );
};

export default Thuonghieu;