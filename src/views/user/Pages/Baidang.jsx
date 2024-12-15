import { Tabs, Select, Table, Upload, Image, Button } from "antd"; // Thêm Table từ antd
import "./baidang.css";
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
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import { Input } from 'antd';
const { TextArea } = Input;

const onChange = (key) => {
  console.log(key);
};

// const getCurrentDate = () => {
//   const today = new Date();
//   const year = today.getFullYear();
//   const month = String(today.getMonth() + 1).padStart(2, "0");
//   const day = String(today.getDate()).padStart(2, "0");
//   return `${year}-${month}-${day}`;
// };

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Baidang = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [initialHoatDong, setInitialHoatDong] = useState(null); // Giá trị ban đầu của hoat_dong
  const [isDisabled, setIsDisabled] = useState(false); // Mặc định disable tất cả
  const [hanhdong, sethanhdong] = useState([]);
  const [baidangData, setBaidangData] = useState([]);
  const [hoatDong, setHoatDong] = useState("Hoạt động");
  const [selectedBaiDang, setSelectedBaiDang] = useState({
    hoat_dong: "On",
    hanh_dong: "Thêm",
  });
  const [activeKey, setActiveKey] = useState("1");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [searchStatus, setSearchStatus] = useState("");
  const [newBaiDangID, setNewBaiDangID] = useState("");
  const [content, setContent] = useState('');
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChangeImage = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setSelectedBaiDang((prev) => ({
      ...prev,
      hinh_anh: newFileList.map((file) =>
        file.response ? file.response.url : file.url
      ), // Lưu URL hình ảnh
    }));
  };
  const handleEditorChange = (newContent) => {
    console.log(newContent);
    setContent(newContent);

  };

  const getNewBaiDangID = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/baidang/getNewBaiDangID"
      );
      setNewBaiDangID(response.data);
      console.log("Bài Đăng ID:", response.data);
      setSelectedBaiDang((prev) => ({
        ...prev,
        bai_dangID: response.data,
      }));
    } catch (error) {
      console.error("Lỗi khi lấy bai_dangID:", error);
    }
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
  const handleEdit = async (baidang) => {
    try {
      const response = await fetch(
        `http://localhost:8080/edit/baidang/${baidang.bai_dangID}`
      );
      if (response.ok) {
        const data = await response.json();
        setSelectedBaiDang({
          ...data,
          accountID: data.users ? data.users.accountID : null
        });
        setContent(data.noi_dung);
        console.log("noi dung: ",data);
        //console.log(data);
        setActiveKey("1");
        setInitialHoatDong(data.hoat_dong); // Lưu giá trị ban đầu của hoat_dong
        setIsDisabled(data.hoat_dong === "On"?true:false); // Disable nếu hoat_dong là "On"
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin bài đăng:", error);
    }
    // Chuyển đổi 'hinh_anh' thành mảng nếu cần
    const images = Array.isArray(baidang.hinh_anh)
      ? baidang.hinh_anh
      : [baidang.hinh_anh];

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
    setIsEditMode(true);

    console.log(baidang);
  };


  const handleChange = (value) => {
    console.log("Selected option:", value); // Log để kiểm tra
    setSelectedBaiDang((prev) => ({
      ...prev,
      hoat_dong: value, // Cập nhật trạng thái hoat_dong
    }));
  };

  const fetchBaiDangData = async () => {
    try {
      const response = await fetch("http://localhost:8080/loadBaiDang");
      const data = await response.json();
      console.log("Dữ liệu là: ", data);
      const formattedData = data.map((item) => ({
        key: item.bai_dangID,
        bai_dangID: item.bai_dangID,
        tieu_de_phu: item.tieu_de_phu,
        tieu_de_chinh: item.tieu_de_chinh,
        noi_dung: item.noi_dung,
        ngay_tao: item.ngay_tao,
        hoat_dong: item.hoat_dong,
        trang_thai_xoa: item.trang_thai_xoa,
        hinh_anh: item.hinh_anh,
        hanh_dong: item.hanh_dong,
        accountID: item.users.accountID,
      }));
      setBaidangData(formattedData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu bài đăng:", error);
    }
    getNewBaiDangID();
  };

  const fetchHanhDongData = async () => {
    try {
      const response = await fetch("http://localhost:8080/baidang/gethanhdong");
      const data = await response.json();
      console.log("Dữ liệu là:", data);
      const formattedData = data.map((item) => ({
        key: item.baidang.bai_dangID,
        bai_dangID: item.baidang.bai_dangID,
        tieu_de_phu: item.baidang.tieu_de_phu,
        tieu_de_chinh: item.baidang.tieu_de_chinh,
        noi_dung: item.baidang.noi_dung,
        ngay_tao: item.baidang.ngay_tao,
        hoat_dong: item.baidang.hoat_dong,
        trang_thai_xoa: item.baidang.trang_thai_xoa,
        hinh_anh: item.baidang.hinh_anh,
        hanh_dong: item.ten_HanhDong,
        ngay_hanh_dong: item.ngay_HanhDong, // Thêm trường này
        accountID: item.baidang.users.accountID,
      }));
      sethanhdong(formattedData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu bài đăng:", error);
    }
  };

  useEffect(() => {
    fetchHanhDongData()
    fetchBaiDangData();
    const accountID = JSON.parse(localStorage.getItem("accountID"));
    if (accountID) {
      setSelectedBaiDang((prev) => ({
        ...prev,
        accountID,
      }));
    }
  }, []);

  let baidang = {};
  const baidangChung = () => {
    baidang = {
      bai_dangID: document.getElementById("bai_dangID").value,
      tieu_de_phu: document.getElementById("tieu_de_phu").value,
      tieu_de_chinh: document.getElementById("tieu_de_chinh").value,
      noi_dung: content != null ? content : '',
      ngay_tao: document.getElementById("ngay_tao").value,
      hoat_dong: selectedBaiDang.hoat_dong,
      accountID: document.getElementById("accountID").value,
    };
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Kiểm tra các trường bắt buộc
    if (document.getElementById("tieu_de_chinh").value === "") {
      alert("Vui lòng nhập tiêu đề chính");
      return;
    } else if (document.getElementById("tieu_de_phu").value === "") {
      alert("Vui lòng nhập tiêu đề phụ");
      return;
    } else if (document.getElementById("accountID").value === "") {
      alert("Vui lòng nhập tài khoản ID");
      return;
    } else if (document.getElementById("ngay_tao").value === "") {
      alert("Vui lòng chọn ngày tạo");
      return;
    } else if (content.length == 0) {
      alert("Vui lòng nhập nội dung");
      return;
    }
    else if (fileList.length === 0) {
      alert("Vui lòng chọn hình ảnh");
      return;
    }
    baidangChung();

    const formData = new FormData();
    for (const key in baidang) {
      formData.append(key, baidang[key]);
    }

    formData.append("noi_dung", content);

    // Sử dụng ref để lấy file
    fileList.forEach((file) => {
      formData.append("hinh_anh", file.originFileObj); // Sử dụng originFileObj để lấy file thực tế
    });
    try {
      // const response = await fetch("http://localhost:8080/baidang/add", {
      //   method: "POST",
      //   body: formData,
      // });
      const response = await fetch("https://thanhnehihi.as.r.appspot.com/baidang/add", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Bài đăng đã được thêm thành công:", data);
        alert("Thêm bài đăng thành công!");
        fetchBaiDangData();
        fetchHanhDongData()
        clear();
        console.log("URL ảnh:", data.imageUrl);
        console.log(selectedBaiDang);
      } else {
        const errorData = await response.json();
        console.error("Lỗi khi thêm bài đăng:", response.statusText, errorData);
        alert("Thêm bài đăng thất bại!");
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const handleUpdate = async () => {
    // Kiểm tra các trường bắt buộc
    if (document.getElementById("tieu_de_chinh").value === "") {
      alert("Vui lòng nhập tiêu đề chính");
      return;
    } else if (document.getElementById("tieu_de_phu").value === "") {
      alert("Vui lòng nhập tiêu đề phụ");
      return;
    } else if (document.getElementById("accountID").value === "") {
      alert("Vui lòng nhập tài khoản ID");
      return;
    } else if (document.getElementById("ngay_tao").value === "") {
      alert("Vui lòng chọn ngày tạo");
      return;
    } else if (content.length == 0) {
      alert("Vui lòng nhập nội dung");
      return;
    }
    else if (fileList.length === 0) {
      alert("Vui lòng chọn hình ảnh");
      return;
    }
    baidangChung();

    const formData = new FormData();
    for (const key in baidang) {
      formData.append(key, baidang[key]);
    }

    // Nếu có hình ảnh mới, thêm vào formData
    fileList.forEach((file) => {
      formData.append("hinh_anh", file.originFileObj);
    });
    try {
      const response = await fetch(
        `http://localhost:8080/baidang/update/${baidang.bai_dangID}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        // Kiểm tra nếu trạng thái hoat_dong được thay đổi từ "On" sang "Off"
        if (initialHoatDong === "On" && selectedBaiDang.hoat_dong === "Off") {
          setIsDisabled(false); // Tắt disable khi chuyển sang "Off"
        }
        const data = await response.json();
        console.log("Bài đăng đã được cập nhật thành công:", data);
        alert("Cập nhật bài đăng thành công!");
        fetchBaiDangData(); // Tải lại dữ liệu
        fetchHanhDongData()
        clear();
        setIsEditMode(false);
      } else {
        const errorData = await response.json();
        console.error(
          "Lỗi khi cập nhật bài đăng:",
          response.statusText,
          errorData
        );
        alert("Cập nhật bài đăng thất bại!");
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const clear = () => {
    getNewBaiDangID();
    document.getElementById("tieu_de_phu").value = "";
    document.getElementById("tieu_de_chinh").value = "";
    setContent('');
    document.getElementById("ngay_tao").value = "";

    setSelectedBaiDang({
      hoat_dong: "On",
      trang_thai_xoa: "Chưa xoá",
      accountID: JSON.parse(localStorage.getItem("accountID"))
    });

    setFileList([]);
  }
  const handelClear = () => {
    clear();
    setIsEditMode(false);
    setIsDisabled(false);
  };


  const handleReload = async (bai_dangID) => {
    try {
      const response = await fetch(
        `http://localhost:8080/baidang/reloadFromGarbage/${bai_dangID}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        alert("Phục hồi bài đăng thành công!");
        fetchBaiDangData(); // Tải lại dữ liệu thương hiệu
        fetchHanhDongData()
      } else {
        alert("Lỗi khi phục hồi bài đăng");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  const handleDeleteBaiDangToGarbage = async (bai_dangID) => {
    try {
      const response = await fetch(
        `http://localhost:8080/baidang/deleteToGarbage/${bai_dangID}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        alert("Bài đăng đã được xóa thành công!");
        fetchBaiDangData(); // Tải lại dữ liệu thương hiệu
        fetchHanhDongData()
      } else {
        alert("Lỗi khi xóa bài đăng");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  const handleDeleteBaiDangToGarbageInput = (bai_dangID) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài đăng này?")) {
      // Gọi API xóa voucher
      deleteBaiDangToGarbageInput(bai_dangID);
    }
  };

  const handleDeleteBaiDangToGarbageTable = (bai_dangID) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài đăng này?")) {
      // Gọi API xóa voucher
      handleDeleteBaiDangToGarbage(bai_dangID);
    }
  };

  const deleteBaiDangToGarbageInput = async () => {
    baidangChung();
    try {
      const response = await fetch(
        `http://localhost:8080/baidang/deleteToGarbage/${baidang.bai_dangID}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        alert("Bài đăng đã được xóa thành công!");
        fetchBaiDangData(); // Tải lại dữ liệu thương hiệu
        fetchHanhDongData()
        clear();
      } else {
        alert("Lỗi khi xóa bài đăng");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  // Cấu hình cột cho bảng
  const columns = [
    {
      title: "Mã bài đăng",
      dataIndex: "bai_dangID",
      key: "bai_dangID",
    },
    {
      title: "Tiêu đề phụ",
      dataIndex: "tieu_de_phu",
      key: "tieu_de_phu",
    },
    {
      title: "Tiêu đề chính",
      dataIndex: "tieu_de_chinh",
      key: "tieu_de_chinh",
    },
    {
      title: "Nội dung",
      dataIndex: "noi_dung",
      key: "noi_dung",
      render: (text) => {
        // Loại bỏ tất cả các thẻ HTML bằng regex
        const plainText = text.replace(/<\/?[^>]+(>|$)/g, "");
    
        // Giải mã các ký tự HTML (HTML entities) thành ký tự thuần
        const decodedText = new DOMParser().parseFromString(plainText, "text/html").body.textContent || "";
    
        return (
          <div
            style={{
              maxWidth: 200,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={decodedText} // Hiển thị toàn bộ văn bản khi hover
          >
            {decodedText}
          </div>
        );
      },
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
          //src={`http://localhost:8080/uploads/${text}`}
          src = {text}
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
            onClick={() => handleDeleteBaiDangToGarbageTable(record.bai_dangID)}
          />
        </div>
      ),
    },
  ];

  // Cấu hình cột cho bảng đã xóa
  const columns2 = [
    {
      title: "Mã bài đăng",
      dataIndex: "bai_dangID",
      key: "bai_dangID",
    },
    {
      title: "Tiêu đề phụ",
      dataIndex: "tieu_de_phu",
      key: "tieu_de_phu",
    },
    {
      title: "Tiêu đề chính",
      dataIndex: "tieu_de_chinh",
      key: "tieu_de_chinh",
    },
    {
      title: "Nội dung",
      dataIndex: "noi_dung",
      key: "noi_dung",
      render: (text) => {
        // Loại bỏ tất cả các thẻ HTML bằng regex
        const plainText = text.replace(/<\/?[^>]+(>|$)/g, "");
    
        // Giải mã các ký tự HTML (HTML entities) thành ký tự thuần
        const decodedText = new DOMParser().parseFromString(plainText, "text/html").body.textContent || "";
    
        return (
          <div
            style={{
              maxWidth: 200,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={decodedText} // Hiển thị toàn bộ văn bản khi hover
          >
            {decodedText}
          </div>
        );
      },
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
      title: "Hành động",
      dataIndex: "hanhdong",
      key: "hanhdong",
      render: (text, record) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <ReloadOutlined
            style={{ cursor: "pointer", color: "#1890ff" }}
            onClick={() => handleReload(record.bai_dangID)}
          />
        </div>
      ),
    },
  ];
  // nhatj ki
  const columns3 = [
    {
      title: "Mã bài đăng",
      dataIndex: "bai_dangID",
      key: "bai_dangID",
    },
    {
      title: "Tiêu đề phụ",
      dataIndex: "tieu_de_phu",
      key: "tieu_de_phu",
    },
    {
      title: "Tiêu đề chính",
      dataIndex: "tieu_de_chinh",
      key: "tieu_de_chinh",
    },
    {
      title: "Nội dung",
      dataIndex: "noi_dung",
      key: "noi_dung",
      render: (text) => {
        // Loại bỏ tất cả các thẻ HTML bằng regex
        const plainText = text.replace(/<\/?[^>]+(>|$)/g, "");
    
        // Giải mã các ký tự HTML (HTML entities) thành ký tự thuần
        const decodedText = new DOMParser().parseFromString(plainText, "text/html").body.textContent || "";
    
        return (
          <div
            style={{
              maxWidth: 100,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={decodedText} // Hiển thị toàn bộ văn bản khi hover
          >
            {decodedText}
          </div>
        );
      },
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
          //src={`http://localhost:8080/uploads/${text}`}
          src = {text}
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
      dataIndex: "hanh_dong",
      key: "hanh_dong",
    },
    {
      title: "Ngày Hành Động", // Tiêu đề cột mới
      dataIndex: "ngay_hanh_dong", // Trường dữ liệu
      key: "ngay_hanh_dong", // Khóa của cột
    },
  ];

  const filteredBaiDangData = baidangData.filter((baidang) => {
    return (
      baidang.trang_thai_xoa === null &&
      (!searchStatus || baidang.hoat_dong === searchStatus)
    );
  });

  console.log("Danh sách bài đăng", filteredBaiDangData);


  const filteredBaiDangDataGarbage = baidangData.filter((baidang) => {
    console.log(`trang_thai_xoa: ${baidang.trang_thai_xoa}`);
    return baidang.trang_thai_xoa === "Xóa";
  });
  console.log("Thùng rác", filteredBaiDangDataGarbage);

  const filteredNhatKyBaiDangData = baidangData;

  // Xuất file Excel
  const exportToExcel = () => {
    const filteredData = searchStatus
      ? baidangData.filter((baidang) => baidang.hoat_dong === searchStatus)
      : baidangData;

    // Chuyển đổi dữ liệu thành bảng
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "BaiDang");

    // Xuất file Excel
    XLSX.writeFile(workbook, "BaiDangData.xlsx");
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
                  <label htmlFor="productCode">Bài Đăng ID</label>
                  <input
                    type="text"
                    id="bai_dangID"
                    disabled
                    className="form-control"
                    value={selectedBaiDang?.bai_dangID || ""}
                    onChange={(e) =>
                      setSelectedBaiDang({
                        ...selectedBaiDang,
                        bai_dangID: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="productName">Tiêu Đề Chính</label>
                  <input
                    type="text"
                    id="tieu_de_chinh"
                    disabled={isDisabled} // Disable nếu hoat_dong là "On"
                    className="form-control"
                    value={selectedBaiDang?.tieu_de_chinh || ""}
                    onChange={(e) =>
                      setSelectedBaiDang({
                        ...selectedBaiDang,
                        tieu_de_chinh: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="input-container">
                <div className="form-group">
                  <label htmlFor="productName">Tiêu Đề Phụ</label>
                  <input
                    type="text"
                    id="tieu_de_phu"
                    disabled={isDisabled} // Disable nếu hoat_dong là "On"
                    className="form-control"
                    value={selectedBaiDang?.tieu_de_phu || ""}
                    onChange={(e) =>
                      setSelectedBaiDang({
                        ...selectedBaiDang,
                        tieu_de_phu: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="productName">Account ID</label>
                  <input
                    type="text"
                    id="accountID"
                    disabled
                    className="form-control"
                    value={selectedBaiDang?.accountID || ""}
                    onChange={(e) =>
                      setSelectedBaiDang({
                        ...selectedBaiDang,
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
                    disabled={isDisabled} // Disable nếu hoat_dong là "On"
                    className="form-control"
                    value={selectedBaiDang?.ngay_tao || ""}
                    onChange={(e) =>
                      setSelectedBaiDang({
                        ...selectedBaiDang,
                        ngay_tao: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="warehouseStatus">Hoạt động</label>
                  <Select
                    value={selectedBaiDang.hoat_dong || "Hoạt động"}
                    onChange={(value) =>
                      setSelectedBaiDang({
                        ...selectedBaiDang,
                        hoat_dong: value,
                      })
                    }
                    options={[
                      { value: "On", label: "Hoạt động" },
                      { value: "Off", label: "Ngừng hoạt động" },
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
              <div className='inputtext mt-2'>
                <div className='h4'>Nội dung </div>
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
                  disabled={isDisabled}
                
                  // Disable nếu hoat_dong là "On"
                  value={content}
                  onEditorChange={handleEditorChange}

                />
              </div>
              <Upload
                action="http://localhost:8080/images/"
                listType="picture-card"
                fileList={fileList}
                disabled={isDisabled} // Disable nếu hoat_dong là "On"
                value={selectedBaiDang?.hinh_anh || ""}
                onPreview={handlePreview}
                onChange={handleChangeImage}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>

              <div className="input-container">
                <div className="form-group">
                  <button className="button" onClick={handleSave} disabled={isEditMode}>
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
                    onClick={() => handleDeleteBaiDangToGarbageInput(baidang.bai_dangID)}
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
          label: `Danh sách bài đăng`,
          key: "2",
          children: (
            <div className="tab-content">
              <h1>Danh sách bài đăng</h1>
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
                dataSource={filteredBaiDangData}
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
                dataSource={filteredBaiDangDataGarbage}
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

export default Baidang;