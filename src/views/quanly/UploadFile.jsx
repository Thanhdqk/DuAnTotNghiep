import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const UploadFile = () => {
  const [testdeploys, setTestdeploys] = useState([]);
  const [formData, setFormData] = useState({ name: "", file: null });
  const [editId, setEditId] = useState(null);

  //const API_URL = "http://localhost:8080"; // Đổi URL nếu cần
  const API_URL = "https://thanhnehihi.as.r.appspot.com";
  // Lấy danh sách Testdeploy
  const fetchTestdeploys = async () => {
    try {
      const response = await axios.get(API_URL);
      setTestdeploys(response.data);
      console.log("Dữ liệu nè: ", testdeploys);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Thêm hoặc cập nhật Testdeploy
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("file", formData.file);

    try {
      if (editId) {
        // Cập nhật không hỗ trợ file upload, chỉ cập nhật name
        await axios.put(`${API_URL}/${editId}`, { name: formData.name });
        setEditId(null);
      } else {
        // Thêm mới
        await axios.post(API_URL, formDataObj, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setFormData({ name: "", file: null });
      fetchTestdeploys();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  // Xóa Testdeploy
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTestdeploys();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  // Chỉnh sửa Testdeploy
  const handleEdit = (testdeploy) => {
    setFormData({ name: testdeploy.name, hinhanh: testdeploy.hinhanh });
    setEditId(testdeploy.id);
  };

  useEffect(() => {
    fetchTestdeploys();
  }, []);

  return (
    <div>
      <h1>Quản lý Testdeploy</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFormData({ ...formData, file: e.target.files[0] })
          }
          required
        />
        <button type="submit">{editId ? "Cập nhật" : "Thêm mới"}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Hình ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {testdeploys.map((testdeploy) => (
            <tr key={testdeploy.id}>
              <td>{testdeploy.id}</td>
              <td>{testdeploy.name}</td>
              <td>
                <img
                  src={testdeploy.hinhanh}
                  alt={testdeploy.name}
                  width="50"
                />
              </td>
              <td>
                <button onClick={() => handleEdit(testdeploy)}>Sửa</button>
                <button onClick={() => handleDelete(testdeploy.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UploadFile;
