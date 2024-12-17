import { Button, Upload, Input, Form, Card } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { notification } from "antd";
import { jwtDecode } from "jwt-decode";
// import "../../styles/Thongtincanhan.css"; // Thêm file CSS tùy chỉnh

function Thongtincanhan() {
  const [selectedThongTin, setSelectedThongTin] = useState({
    hovaten: "",
    hinhAnh: "",
    accountID: "",
    sodienthoai: "",
    roles: "",
  });

  const [fileList, setFileList] = useState([]);
  const token = localStorage.getItem("jwtToken");

  const danhSachThongTinCaNhan = async (accountid) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/lietKe/thongTinCaNhan/theoId/${accountid}`
      );
      console.log("Danh sách nè: ", response.data);
      const data = response.data[0];
      setSelectedThongTin(data);
      if (data && data.hinhAnh) {
        setSelectedThongTin((prev) => ({
          ...prev,
          hinhAnh: data.hinhAnh,
        }));

        // Cập nhật fileList với URL hình ảnh từ server
        setFileList([
          {
            uid: "-1",
            name: "current-image",
            status: "done",
            url: "http://localhost:8080/images/" + data.hinhAnh,
          },
        ]);
      }
    } catch {}
  };
  useEffect(() => {
    const accountidNe = JSON.parse(localStorage.getItem("data"))?.accountID;
    console.log("AccountID nè: ", accountidNe);
    danhSachThongTinCaNhan(accountidNe);
  }, []);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0 && newFileList[0].response) {
      setSelectedThongTin({
        ...selectedThongTin,
        hinhAnh: newFileList[0].response.url,
      });
    }
  };

  const isValidPhoneNumber = (phoneNumber) => {
    // Kiểm tra số điện thoại Việt Nam (bắt đầu bằng 03, 05, 07, 08, 09 và có 10 chữ số)
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
    return phoneRegex.test(phoneNumber);
  };
  const handleSubmit = async () => {
    if (!isValidPhoneNumber(selectedThongTin.sodienthoai)) {
      notification.error({
        message: "Lỗi định dạng",
        description: "Số điện thoại không hợp lệ. Vui lòng nhập lại!",
        duration: 2, // Thời gian hiển thị
      });
      return; // Ngăn việc gửi dữ liệu nếu không hợp lệ
    }
    const formData = new FormData();
    formData.append("hovaten", selectedThongTin.hovaten);
    formData.append("sodienthoai", selectedThongTin.sodienthoai);
    formData.append("dia_chi", selectedThongTin.dia_chi);
    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("hinhAnh", fileList[0].originFileObj);
    }
    console.log("Formdata nè: ", formData);
    try {
      const response = await axios.put(
        `http://localhost:8080/api/update/thongTinCaNhan/${selectedThongTin.accountID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      notification.success({
        message: "Đăng nhập thành công",
        description: "Cập nhật thành công",
        duration: 1, // thời gian hiển thị
      }); // Lấy thông báo lỗi từ server
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  return (
    <div className="thong-tin-ca-nhan-container">
      <Card title="Thông tin cá nhân" className="thong-tin-ca-nhan-card">
        <Form layout="vertical">
          <Form.Item label="Hình ảnh">
            <Upload
              action="http://localhost:8080/images/"
              listType="picture-card"
              fileList={fileList}
              onChange={handleFileChange}
            >
              {fileList.length < 1 && "+ Upload"}
            </Upload>
          </Form.Item>

          <Form.Item label="AccountID">
            <Input
              value={selectedThongTin.accountID}
              onChange={(e) =>
                setSelectedThongTin({
                  ...selectedThongTin,
                  accountID: e.target.value,
                })
              }
              disabled
            />
          </Form.Item>

          <Form.Item label="Họ và tên">
            <Input
              value={selectedThongTin.hovaten}
              onChange={(e) =>
                setSelectedThongTin({
                  ...selectedThongTin,
                  hovaten: e.target.value,
                })
              }
            />
          </Form.Item>

          <Form.Item label="Số điện thoại">
            <Input
              value={selectedThongTin.sodienthoai}
              onChange={(e) =>
                setSelectedThongTin({
                  ...selectedThongTin,
                  sodienthoai: e.target.value,
                })
              }
            />
          </Form.Item>

          <Form.Item label="Địa chỉ">
            <Input
              value={selectedThongTin.dia_chi}
              onChange={(e) =>
                setSelectedThongTin({
                  ...selectedThongTin,
                  dia_chi: e.target.value,
                })
              }
            />
          </Form.Item>

          <Form.Item label="Vai trò">
            <Input
              value={selectedThongTin.vaitro}
              onChange={(e) =>
                setSelectedThongTin({
                  ...selectedThongTin,
                  vaitro: e.target.value,
                })
              }
              disabled
            />
          </Form.Item>

          <Button type="primary" onClick={handleSubmit}>
            Cập nhật
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Thongtincanhan;
