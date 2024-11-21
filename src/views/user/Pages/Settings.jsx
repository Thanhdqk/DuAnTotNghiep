import React, { useState, useEffect } from "react";
import axios from "axios";


const Settings = () => {
  const [formData, setFormData] = useState({
    ten_cua_hang: "",
    so_dien_thoai: "",
    dia_chi_cua_hang: "",
    accountID: "",
    faviicon: null,
    logo: null,
  });

  const [settingid, setSettingid] = useState(1); // ID setting cần cập nhật
  const [message, setMessage] = useState("");
  const [previewFaviicon, setPreviewFaviicon] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);

  // Lấy dữ liệu settings từ backend
  useEffect(() => {
    axios.get("http://localhost:8080/loadSettings")
        .then((response) => {
            if (response.data.length > 0) {
                const setting = response.data[0];
                setSettingid(setting.settingid); // Gán ID cho cập nhật (đổi settingsID thành settingid)
                setFormData({
                    ten_cua_hang: setting.ten_cua_hang,
                    so_dien_thoai: setting.so_dien_thoai,
                    dia_chi_cua_hang: setting.dia_chi_cua_hang,
                    accountID: setting.users?.accountID || "",
                    faviicon: setting.faviicon,
                    logo: setting.logo,
                });
                // Kiểm tra URL của logo và faviicon
                console.log('Faviicon URL:', `http://localhost:8080/uploads/images/${setting.faviicon}`);
                console.log('Logo URL:', `http://localhost:8080/uploads/images/${setting.logo}`);
                setPreviewFaviicon(`http://localhost:8080/uploads/images/${setting.faviicon}`);
                setPreviewLogo(`http://localhost:8080/uploads/images/${setting.logo}`);
            }
        })
        .catch((error) => {
            console.error("Lỗi khi tải settings:", error);
        });
}, []);

  // Xử lý khi thay đổi dữ liệu form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Xử lý upload file
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });

    // Cập nhật ảnh xem trước
    if (name === "faviicon" && files.length > 0) {
      setPreviewFaviicon(URL.createObjectURL(files[0]));
    }
    if (name === "logo" && files.length > 0) {
      setPreviewLogo(URL.createObjectURL(files[0]));
    }
  };

  // Gửi form lên backend
  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("ten_cua_hang", formData.ten_cua_hang);
    formDataToSend.append("so_dien_thoai", formData.so_dien_thoai);
    formDataToSend.append("dia_chi_cua_hang", formData.dia_chi_cua_hang);
    formDataToSend.append("accountID", formData.accountID);
    if (formData.faviicon) {
      formDataToSend.append("faviicon", formData.faviicon);
    }
    if (formData.logo) {
      formDataToSend.append("logo", formData.logo);
    }

    axios
    .put(`http://localhost:8080/setting/update/1`, formDataToSend) // Chú ý thay settingsId thành settingid
    .then((response) => {
        setMessage("Cập nhật thành công!");
    })
    .catch((error) => {
        console.error("Lỗi khi cập nhật settings:", error);
        setMessage("Có lỗi xảy ra, vui lòng thử lại.");
    });

  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Cập nhật thông tin cửa hàng</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="ten_cua_hang" className="form-label">
            Tên cửa hàng
          </label>
          <input
            type="text"
            id="ten_cua_hang"
            name="ten_cua_hang"
            className="form-control"
            value={formData.ten_cua_hang}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="so_dien_thoai" className="form-label">
            Số điện thoại
          </label>
          <input
            type="text"
            id="so_dien_thoai"
            name="so_dien_thoai"
            className="form-control"
            value={formData.so_dien_thoai}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dia_chi_cua_hang" className="form-label">
            Địa chỉ cửa hàng
          </label>
          <input
            type="text"
            id="dia_chi_cua_hang"
            name="dia_chi_cua_hang"
            className="form-control"
            value={formData.dia_chi_cua_hang}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="accountID" className="form-label">
            Account ID
          </label>
          <input
            type="text"
            id="accountID"
            name="accountID"
            className="form-control"
            value={formData.accountID}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
        <label htmlFor="faviicon" className="form-label">
            Favicon
        </label>
        <input
            type="file"
            id="faviicon"
            name="faviicon"
            className="form-control"
            onChange={handleFileChange}
        />
        {previewFaviicon && (
            <img
            src={previewFaviicon}
            alt="Preview Favicon"
            className="img-thumbnail mt-2"
            style={{ width: "100px" }}
            />
        )}
        </div>

        <div className="mb-3">
        <label htmlFor="logo" className="form-label">
            Logo
        </label>
        <input
            type="file"
            id="logo"
            name="logo"
            className="form-control"
            onChange={handleFileChange}
        />
        {previewLogo && (
            <img
            src={previewLogo}
            alt="Preview Logo"
            className="img-thumbnail mt-2"
            style={{ width: "100px" }}
            />
        )}
        </div>

        <button type="submit" className="btn btn-primary">
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default Settings;
