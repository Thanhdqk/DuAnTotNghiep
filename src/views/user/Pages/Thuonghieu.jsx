import { Tabs, Select, Table, Upload, Image, Button } from "antd"; // Thêm Table từ antd
import "./thuonghieu.css";
import {
  ExportOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined
} from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import { data } from "jquery";
import * as XLSX from "xlsx";
//import "../../assets/images"

const onChange = (key) => {
  console.log(key);
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
  const [hanhdong,sethanhdong] = useState([]);
  const [thuonghieuData, setThuonghieuData] = useState([]);
  const [hoatDong, setHoatDong] = useState("Hoạt động");
  const [selectedThuongHieu, setSelectedThuongHieu] = useState({
    hoat_dong: "Hoạt động",
    hanh_dong: "Thêm",
  });
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
  const handleEdit = async (thuonghieu) => {
    try {
      const response = await fetch(
        `http://localhost:8080/edit/thuonghieu/${thuonghieu.thuong_hieuID}`
      );
      if (response.ok) {
        const data = await response.json();
        setSelectedThuongHieu({
          ...data,
          accountID: data.users ? data.users.accountID : null,
          nha_cung_capID: data.nhacungcap ? data.nhacungcap.nha_cung_capID : null
        });
        //console.log(data);
        setActiveKey("1");
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin bài đăng:", error);
    }
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
        : `http://localhost:8080/uploads/${image}`, // URL đầy đủ
    }));

    setFileList(initialFileList);
    
    console.log(thuonghieu);
  };

  const handleChange = (value) => {
    console.log("Selected option:", value); // Log để kiểm tra
    setSelectedThuongHieu((prev) => ({
      ...prev,
      hoat_dong: value, // Cập nhật trạng thái hoat_dong
    }));
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
        hanh_dong: item.hanh_dong,
        accountID: item.users.accountID,
        nha_cung_capID: item.nhacungcap.nha_cung_capID
      }));
      setThuonghieuData(formattedData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu thương hiệu:", error);
    }
  };

  const fetchHanhDongData = async () => {
    try {
      const response = await fetch("http://localhost:8080/thuonghieu/gethanhdong");
      const data = await response.json();
      console.log("Dữ liệu là: ", data);
      const formattedData = data.map((item) => ({
        key: item.thuonghieu.thuong_hieuID,
        thuong_hieuID: item.thuonghieu.thuong_hieuID,
        ten_thuong_hieu: item.thuonghieu.ten_thuong_hieu,
        ngay_tao: item.thuonghieu.ngay_tao,
        hoat_dong: item.thuonghieu.hoat_dong,
        trang_thai_xoa: item.thuonghieu.trang_thai_xoa,
        hinh_anh: item.thuonghieu.hinh_anh,
        hanh_dong: item.ten_HanhDong,
        accountID: item.thuonghieu.users.accountID,
        nha_cung_capID: item.thuonghieu.nhacungcap.nha_cung_capID
      }));
      sethanhdong(formattedData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu thương hiệu:", error);
    }
  };

  useEffect(() => {
    fetchThuongHieuData();
    fetchHanhDongData();
  }, []);

  let thuonghieu = {};
  const thuonghieuChung = () => {
    thuonghieu = {
      thuong_hieuID: document.getElementById("thuong_hieuID").value,
      ten_thuong_hieu: document.getElementById("ten_thuong_hieu").value,
      ngay_tao: document.getElementById("ngay_tao").value,
      hoat_dong: selectedThuongHieu.hoat_dong,
      accountID: document.getElementById("accountID").value,
      nha_cung_capID: document.getElementById("nha_cung_capID").value,
    };
  };

  const handleSave = async (e) => {
    e.preventDefault();
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
        fetchHanhDongData()
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
        fetchHanhDongData()
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

    setSelectedThuongHieu({
      hoat_dong: "Hoạt động",
      trang_thai_xoa: "Chưa xoá",
    });

    setFileList([]);
    document.getElementById("accountID").value = "";
    document.getElementById("nha_cung_capID").value = "";
  }
  const handelClear = () => {
    clear();
  };

  // const handleDeleteInput = (thuong_hieuID) => {
  //   if (window.confirm("Bạn có chắc chắn muốn xóa voucher này?")) {
  //     // Gọi API xóa voucher
  //     deleteThuongHieuInput(thuong_hieuID);
  //   }
  // };

  // const handleDeleteTable = (thuong_hieuID) => {
  //   if (window.confirm("Bạn có chắc chắn muốn xóa thương hiệu này?")) {
  //     // Gọi API xóa voucher
  //     deleteThuongHieuTable(thuong_hieuID);
  //   }
  // };

  // const deleteThuongHieuInput = async () => {
  //   thuonghieuChung();
  //   try {
  //     const response = await fetch(
  //       `http://localhost:8080/thuonghieu/delete/${thuonghieu.thuong_hieuID}`,
  //       {
  //         method: "DELETE",
  //       }
  //     );

  //     if (response.ok) {
  //       alert("Thương hiệu đã được xóa thành công!");
  //       fetchThuongHieuData();
  //       clear();
  //       // Cập nhật lại danh sách vouchers nếu cần
  //     } else {
  //       alert("Lỗi khi xóa thương hiệu.");
  //     }
  //   } catch (error) {
  //     console.error("Lỗi khi gọi API:", error);
  //   }
  // };
  // const deleteThuongHieuTable = async (thuong_hieuID) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:8080/thuonghieu/delete/${thuong_hieuID}`,
  //       {
  //         method: "DELETE",
  //       }
  //     );

  //     if (response.ok) {
  //       alert("Thương hiệu đã được xóa thành công!");
  //       fetchThuongHieuData();
  //       // Cập nhật lại danh sách vouchers nếu cần
  //     } else {
  //       alert("Lỗi khi xóa thương hiệu.");
  //     }
  //   } catch (error) {
  //     console.error("Lỗi khi gọi API:", error);
  //   }
  // };

  const handleReload = async (thuong_hieuID) => {
    try {
      const response = await fetch(
        `http://localhost:8080/thuonghieu/reloadFromGarbage/${thuong_hieuID}`,
        {
          method: "PUT",
        }
      );
  
      if (response.ok) {
        alert("Phục hồi thương hiệu thành công!");
        fetchThuongHieuData(); // Tải lại dữ liệu thương hiệu
        fetchHanhDongData()
      } else {
        alert("Lỗi khi phục hồi thương hiệu.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  const handleDeleteThuongHieuToGarbage = async (thuong_hieuID) => {
    try {
      const response = await fetch(
        `http://localhost:8080/thuonghieu/deleteToGarbage/${thuong_hieuID}`,
        {
          method: "PUT",
        }
      );
  
      if (response.ok) {
        alert("Thương hiệu đã được xóa thành công!");
        fetchThuongHieuData(); // Tải lại dữ liệu thương hiệu
        fetchHanhDongData()
      } else {
        alert("Lỗi khi xóa thương hiệu.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  const handleDeleteThuongHieuToGarbageInput = (thuong_hieuID) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thương hiệu này?")) {
      // Gọi API xóa voucher
      deleteThuongHieuToGarbageInput(thuong_hieuID);
    }
  };

  const handleDeleteThuongHieuToGarbageTable = (thuong_hieuID) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thương hiệu này?")) {
      // Gọi API xóa voucher
      handleDeleteThuongHieuToGarbage(thuong_hieuID);
    }
  };

  const deleteThuongHieuToGarbageInput = async () => {
    thuonghieuChung();
    try {
      const response = await fetch(
        `http://localhost:8080/thuonghieu/deleteToGarbage/${thuonghieu.thuong_hieuID}`,
        {
          method: "PUT",
        }
      );
  
      if (response.ok) {
        alert("Thương hiệu đã được xóa thành công!");
        fetchThuongHieuData(); // Tải lại dữ liệu thương hiệu
        fetchHanhDongData()
        clear();
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
      title: "Tên thương hiệu",
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
      title: "Trạng thái xóa",
      dataIndex: "trang_thai_xoa",
      key: "trang_thai_xoa",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinh_anh",
      key: "hinh_anh",
      render: (text) => (
        <img
          src={`http://localhost:8080/uploads/${text}`}
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
      title: "Nhà cung cấp ID",
      dataIndex: "nha_cung_capID",
      key: "nha_cung_capID",
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
            onClick={() => handleDeleteThuongHieuToGarbageTable(record.thuong_hieuID)}
          />
        </div>
      ),
    },
  ];

  // Cấu hình cột cho bảng đã xóa
  const columns2 = [
    {
      title: "Mã thương hiệu",
      dataIndex: "thuong_hieuID",
      key: "thuong_hieuID",
    },
    {
      title: "Tên thương hiệu",
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
      title: "Trạng thái xóa",
      dataIndex: "trang_thai_xoa",
      key: "trang_thai_xoa",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinh_anh",
      key: "hinh_anh",
      render: (text) => (
        <img
          src={`http://localhost:8080/uploads/${text}`}
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
      title: "Nhà cung cấp ID",
      dataIndex: "nha_cung_capID",
      key: "nha_cung_capID",
    },
    {
      title: "Hành động",
      dataIndex: "hanhdong",
      key: "hanhdong",
      render: (text, record) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <ReloadOutlined
            style={{ cursor: "pointer", color: "#1890ff" }}
            onClick={() => handleReload(record.thuong_hieuID)}
          />
        </div>
      ),
    },
  ];

  const columns3 = [
    {
      title: "Mã thương hiệu",
      dataIndex: "thuong_hieuID",
      key: "thuong_hieuID",
    },
    {
      title: "Tên thương hiệu",
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
      title: "Trạng thái xóa",
      dataIndex: "trang_thai_xoa",
      key: "trang_thai_xoa",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinh_anh",
      key: "hinh_anh",
      render: (text) => (
        <img
          src={`http://localhost:8080/uploads/${text}`}
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
      title: "Nhà cung cấp ID",
      dataIndex: "nha_cung_capID",
      key: "nha_cung_capID",
    },
    {
      title: "Hành động",
      dataIndex: "hanh_dong",
      key: "hanh_dong",
    },
  ];

  const filteredThuongHieuData = thuonghieuData.filter((thuonghieu) => {
    return (
      thuonghieu.trang_thai_xoa === null && 
      (!searchStatus || thuonghieu.hoat_dong === searchStatus)
    );
  });
  
  console.log("Danh sách thương hiệu", filteredThuongHieuData);  

      
  const filteredThuongHieuDataGarbage = thuonghieuData.filter((thuonghieu) => {
    console.log(`trang_thai_xoa: ${thuonghieu.trang_thai_xoa}`);
      return thuonghieu.trang_thai_xoa === "Xóa";
    });
  console.log("Thùng rác", filteredThuongHieuDataGarbage); 
  
  const filteredNhatKyThuongHieuData = thuonghieuData; 

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
                <div className="form-group">
                  <label htmlFor="productName">Nhà cung cấp ID</label>
                  <input
                    type="text"
                    id="nha_cung_capID"
                    className="form-control"
                    value={selectedThuongHieu?.nha_cung_capID || ""}
                    onChange={(e) =>
                      setSelectedThuongHieu({
                        ...selectedThuongHieu,
                        nha_cung_capID: e.target.value,
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
                    value={selectedThuongHieu.hoat_dong || "Hoạt động"} // Đồng bộ với state selectedVoucher
                    onChange={(value) =>
                      setSelectedThuongHieu({
                        ...selectedThuongHieu,
                        hoat_dong: value, // Cập nhật đúng giá trị vào state
                      })
                    }
                    options={[
                      { value: "Hoạt động", label: "Hoạt động" },
                      { value: "Ngừng hoạt động", label: "Ngừng hoạt động" },
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
                    onClick={() => handleDeleteThuongHieuToGarbageInput(thuonghieu.thuong_hieuID)}
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
              <h1>Danh sách thương hiệu</h1>
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
        {
          label: `Lịch sử xóa`,
          key: "3",
          children: (
            <div className="tab-content">
              <h1>Danh Sách Đã Xóa</h1>
              <Table
                dataSource={filteredThuongHieuDataGarbage}
                columns={columns2}
                pagination={false}
              />
            </div>
              ),
        },
        {
          label: `Nhật ký hoạt động`,
          key: "4",
          children: (
            <div className="tab-content">
              <Table
                dataSource={hanhdong}
                columns={columns3}
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