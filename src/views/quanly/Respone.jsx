import React, { useEffect, useState } from "react";
import { Table, Space } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { render } from "@testing-library/react";
import { FormikConsumer, useFormik } from "formik";
import * as Yup from "yup";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ColumnGroup from "antd/es/table/ColumnGroup";
import Swal from "sweetalert2";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, Modal } from "antd";
import { jwtDecode } from "jwt-decode";
const containerStyle = {
  display: "flex",
  height: "100vh",
  fontFamily: "Arial, sans-serif",
};

const sidebarStyle = {
  width: "250px",
  backgroundColor: "#2c3e50",
  color: "#fff",
  padding: "20px",
  boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
};

const linkStyle = {
  textDecoration: "none",
  color: "white",
};

const menuStyle = {
  listStyleType: "none",
  padding: "0",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#34495e",
  color: "white",
  border: "none",
  textAlign: "left",
  cursor: "pointer",
  fontSize: "16px",
  borderRadius: "4px",
  marginBottom: "10px",
};

const mainContentStyle = {
  flex: 1,
  padding: "20px",
  backgroundColor: "#ecf0f1",
};

const tabContainerStyle = {
  display: "flex",
  marginBottom: "20px",
};

const tabButtonStyle = {
  flex: 1,
  padding: "10px",
  backgroundColor: "#3498db",
  color: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "4px",
  fontSize: "16px",
};

const activeTabStyle = {
  backgroundColor: "#2980b9",
};

const formStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "4px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
};

const inputGroupStyle = {
  marginBottom: "15px",
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  fontWeight: "bold",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #bdc3c7",
  borderRadius: "4px",
};

const textareaStyle = {
  width: "100%",
  height: "80px",
  padding: "10px",
  border: "1px solid #bdc3c7",
  borderRadius: "4px",
};

const gridItemStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const imagePreviewStyle = {
  maxWidth: "200px",
  maxHeight: "200px",
  cursor: "pointer",
};

const verticalImageUploadContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "200px",
  height: "200px",
  border: "2px dashed #bdc3c7",
  borderRadius: "4px",
  cursor: "pointer",
};

const placeholderStyle = {
  color: "#bdc3c7",
};

const submitButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#2ecc71",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const historyListStyle = {
  listStyleType: "none",
  padding: "0",
};

const historyItemStyle = {
  backgroundColor: "#fff",
  padding: "15px",
  marginBottom: "10px",
  borderRadius: "4px",
  boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
};

const fileList = [];

function Respone() {
  const [image, setImage] = useState(null);
  const userId = localStorage.getItem("account_id");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [change, setchange] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataSource, setdataSource] = useState([]);
  const [dataSource2, setdataSource2] = useState([]);
  const [datahanhdong, setdatahanhdong] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [hinhAnh, setHinhAnh] = useState(null);

  const [yeucau, setyeucau] = useState("");
  const [noidung, setnoidung] = useState("");

  const formik = useFormik({
    initialValues: {
      ngay_tao: "",
      loai_yeu_cau: "",
      hoat_dong: "Đang hoạt động",
      noi_dung: "",
      feedback: "",
      hinh_anh: "",
      users: "",
    },
    validationSchema: Yup.object({
      noi_dung: Yup.date().required("Nhập nội dung phản hồi"),
    }),
    onSubmit: (values) => {
      dorespone(values);
    },
  });
  const alertSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "Cập nhật thành công",
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "feedbackID",
      key: "feedbackID",
    },
    {
      title: "Loại yêu cầu",
      dataIndex: "loai_yeu_cau",
      key: "loai_yeu_cau",
    },
    {
      title: "Nội dung",
      dataIndex: "noi_dung",
      key: "noi_dung",
    },
    {
      title: "Ngày tạo",
      dataIndex: "ngay_tao",
      key: "ngay_tao",
    },
    {
      title: "Hình ảnh ",
      dataIndex: "hinh_anh",
      key: "hinh_anh",
      render: (_, record) => (
        <div>
          <img
            src={record.hinh_anh}
            alt="Image"
            style={{ maxWidth: "100px", maxHeight: "100px" }}
          />
        </div>
      ),
    },
    {
      title: "Từ người dùng",
      dataIndex: "users",
      key: "users",
    },
    {
      title: "Nút",
      key: "nut",
      render: (_, record) => (
        <div>
          {/* <button
            className="btn btn-danger me-2"
            data-bs-toggle="modal"
            data-bs-target="#phanhoimodal"
            onClick={() => {
              delete record.key;
              formik.setValues({
                feedback: record,
                users: record.users,
              });
            }}
          >
            Phản hồi{" "}
          </button> */}
          <Button
            type="primary"
            onClick={() => {
              delete record.key;
              formik.setValues({
                feedback: record,
                users: record.users,
              });
              showModal();
              console.log(formik.values);
            }}
          >
            Phản hồi
          </Button>
        </div>
      ),
    },
  ];

  const columnHanhdongs = [
    {
      title: "ID",
      dataIndex: "ResponeID",
      key: "ResponeID",
    },
    {
      title: "Loại yêu cầu",
      dataIndex: "loai_yeu_cau",
      key: "loai_yeu_cau",
    },
    {
      title: "Nội dung phan hoi",
      dataIndex: "noi_dung",
      key: "noi_dung",
    },
    {
      title: "Ngày phản hồi",
      dataIndex: "ngay_tao",
      key: "ngay_tao",
    },

    {
      title: "Từ người dùng",
      dataIndex: "users",
      key: "users",
    },
    {
      title: "Người phản hồi",
      dataIndex: "respone_person",
      key: "respone_person",
    },

    {
      title: "hanhdong",
      dataIndex: "hanhdong",
      key: "hanhdong",
    },
  ];
  const columnrespone = [
    {
      title: "ID",
      dataIndex: "responseID",
      key: "responseID",
    },
    {
      title: "Loại yêu cầu",
      dataIndex: "loai_yeu_cau",
      key: "loai_yeu_cau",
    },
    {
      title: "Nội dung feedback",
      dataIndex: "noi_dung_feedback",
      key: "noi_dung_feedback",
    },
    {
      title: "Nội dung phan hoi",
      dataIndex: "noi_dung",
      key: "noi_dung",
    },
    {
      title: "Ngày phản hồi",
      dataIndex: "ngay_tao",
      key: "ngay_tao",
    },

    {
      title: "Từ người dùng",
      dataIndex: "users",
      key: "users",
    },
    {
      title: "Ngày phản hồi",
      dataIndex: "feedback",
      key: "feedback",
      hidden: true,
    },
    {
      title: "Người phản hồi",
      dataIndex: "respone_person",
      key: "respone_person",
    },
    {
      title: "Nút",
      key: "nut",
      render: (_, record) => (
        <div>
          {/* <button
            className="btn btn-danger me-2"
            data-bs-toggle="modal"
            data-bs-target="#chitietmodal"
            onClick={() => {
              formik2.setValues({
                responseID: record.responseID,
                han_su_dung: record.hansudung,
                ngay_tao: record.ngay_tao,
                loai_yeu_cau: record.loai_yeu_cau,
                noi_dung: record.noi_dung,
                users: record.users,
                hinh_anh: record.hinh_anh,
                feedback: record.feedback,
                noi_dung_feedback: record.noi_dung_feedback,
              });
            }}
          >
            Xem chi tiết{" "}
          </button> */}

          <Button
            type="primary"
            onClick={() => {
              formik2.setValues({
                responseID: record.responseID,
                han_su_dung: record.hansudung,
                ngay_tao: record.ngay_tao,
                loai_yeu_cau: record.loai_yeu_cau,
                noi_dung: record.noi_dung,
                users: record.users,
                hinh_anh: record.hinh_anh,
                feedback: record.feedback,
                noi_dung_feedback: record.noi_dung_feedback,
              });
              showModal2();
            }}
          >
            Xem chi tiết
          </Button>
        </div>
      ),
    },
  ];
  const formik2 = useFormik({
    initialValues: {
      responseID: "",
      ngay_tao: "",
      noi_dung_feedback: "",
      loai_yeu_cau: "",
      noi_dung: "",
      feedback: "",
      hinh_anh: "",
      users: "",
    },
    onSubmit: (values) => {},
  });
  const [reason, setReason] = useState([]);
  const fetchReason = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/respone/feedbackreason"
      );

      setReason(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchDataHanhDong = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/respone/FindAllWithDTO"
      ); // Replace with actual API endpoint
      const formattedData = response.data.map((item, index) => ({
        key: index,
        ResponeID: item.res.responseID,
        loai_yeu_cau: item.res.feedback.loai_yeu_cau,
        noi_dung: item.res.noi_dung,
        ngay_tao: item.res.ngay_tao,
        users: item?.res.feedback?.users?.accountID,
        respone_person: item?.res.user?.accountID,
        hanhdong: item?.tenHanhDong,
      }));
      setdatahanhdong(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    formik.submitForm();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal2 = () => {
    setIsModalOpen2(true);
  };
  const handleOk2 = () => {
    formik.submitForm();
    setIsModalOpen2(false);
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  const changeImage = (event) => {
    const value = event.currentTarget.files[0];
    const parent = document.querySelector("[gay]");
    const parent2 = document.querySelector("[gay2]");
    console.log(value.name);
    parent.removeChild(parent2);
    console.log(parent);
    const img = document.createElement("img");
    const srcimg = URL.createObjectURL(value);

    img.setAttribute("src", srcimg);
    img.className = "img-fluid";
    img.style.height = "80px";
    parent.appendChild(img);

    img.addEventListener("dblclick", () => {
      parent.removeChild(img);
      parent.appendChild(parent2);
    });
  };
  const onSelectChange = (value) => {
    console.log(`selected ${value}`);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const getallresponse = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/feedback/findall"
    );
    const formattedData = response.data.map((item, index) => ({
      key: index,
      feedbackID: item.feedbackID,
      loai_yeu_cau: item.loai_yeu_cau,
      noi_dung: item.noi_dung,
      hinh_anh: item.hinh_anh,
      ngay_tao: item.ngay_tao,
      users: item?.users?.accountID,
    }));
    setdataSource(formattedData);
  };

  const getallresponse2 = async () => {
    const response = await axios.get(
      "http://localhost:8080/respone/findallfeedbackshavebeenresponed"
    );
    const formattedData = response.data.map((item, index) => ({
      key: index,
      responseID: item.responseID,
      loai_yeu_cau: item.loai_yeu_cau,
      noi_dung: item.noi_dung,
      noi_dung_feedback: item.feedback.noi_dung,
      ngay_tao: item.ngay_tao,
      users: item?.feedback.users?.accountID,
      feedback: item?.feedback,
      respone_person: item?.user?.accountID,
    }));
    setdataSource2(formattedData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setHinhAnh(file);
    setImagePreview(URL.createObjectURL(file)); // Display preview of the selected image
  };

  const dorespone = async (values) => {
    const res = await axios({
      url: `http://localhost:8080/respone/do?accountId=${userId}&feedbackID=${values.feedback.feedbackID}`,
      method: "POST",
      data: {
        feedbackID: values.feedbackID,
        loai_yeu_cau: values.loai_yeu_cau,
        noi_dung: values.noi_dung,
        hinh_anh: values.hinh_anh,
        ngay_tao: values.ngay_tao,
      },
      headers: { "Content-Type": "application/json" },
    });

    formik.resetForm();
    console.log(formik.values);
    if (res.status === 200) {
      alertSuccess();
    }
    setchange(change + 1);
  };

  useEffect(() => {
    fetchReason();
    getallresponse();
    getallresponse2();
    fetchDataHanhDong();
  }, [fileList, change]);

  return (
    <div className="container">
      <div>
        <ul className="nav nav-pills nav-fill" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active fw-bold"
              id="table-tab"
              data-bs-toggle="tab"
              data-bs-target="#table-tab-pane"
              type="button"
              role="tab"
              aria-controls="table-tab-pane"
              aria-selected="true"
            >
              DANH SÁCH
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link  fw-bold"
              id="table-tab2"
              data-bs-toggle="tab"
              data-bs-target="#table-tab-pane2"
              type="button"
              role="tab"
              aria-controls="table-tab-pane"
              aria-selected="true"
            >
              DANH SÁCH ĐÃ PHẢN HỒI
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link fw-bold"
              id="form-tab"
              data-bs-toggle="tab"
              data-bs-target="#table-tab-pane3"
              type="button"
              role="tab"
              aria-controls="form-tab-pane"
              aria-selected="false"
            >
              Hành động
            </button>
          </li>
        </ul>
        {/* Tab content */}
        <div className="tab-content mt-3" id="myTabContent">
          {/* Table content */}
          <div
            className="tab-pane fade show active"
            id="table-tab-pane"
            role="tabpanel"
            aria-labelledby="table-tab"
          >
            <h3>QUẢN LÍ Phản hồi</h3>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={dataSource}
            />
          </div>
          <div
            className="tab-pane fade "
            id="table-tab-pane2"
            role="tabpanel"
            aria-labelledby="table-tab"
          >
            <h3>Danh sách feedback đã phản hồi</h3>
            <Table
              rowSelection={rowSelection}
              columns={columnrespone}
              dataSource={dataSource2}
            />
          </div>
          {/* Form content */}
          <div
            className="tab-pane fade "
            id="table-tab-pane3"
            role="tabpanel"
            aria-labelledby="table-tab"
          >
            <h3>QUẢN LÍ POPUP4</h3>
            <Table
              rowSelection={rowSelection}
              columns={columnHanhdongs}
              dataSource={datahanhdong}
            />
          </div>
        </div>
      </div>
      {/* modal cho nút phản hồi */}

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Phản hồi"
        cancelText="Đóng"
      >
        <form onSubmit={formik.handleSubmit} style={formStyle}>
          {/* <div className="input-group mb-3">
            
            <input
              type="text"
              className="form-control"
              name="loai_yeu_cau"
              onChange={formik.handleChange}
              value={formik.values.loai_yeu_cau}
              placeholder="Loại Yêu Cầu"
            />
          </div> */}
          <select
            value={formik.values.loai_yeu_cau}
            onChange={formik.handleChange}
            name="loai_yeu_cau"
            className="form-select mb-2"
          >
            {reason.map((item, index) => (
              <option
                selected={item === formik.values.feedback.loai_yeu_cau}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
          <div class="input-group">
            <textarea
              class="form-control"
              name="noi_dung"
              onChange={formik.handleChange}
              value={formik.values.noi_dung}
              placeholder="Nội dung"
            ></textarea>
          </div>
        </form>
      </Modal>

      <Modal
        title="Basic Modal"
        open={isModalOpen2}
        onCancel={handleCancel2}
        cancelText="Đóng"
      >
        <div className="row">
          <div className="col-6">
            <form onSubmit={formik2.handleSubmit} style={formStyle}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="loai_yeu_cau"
                  onChange={formik2.handleChange}
                  value={formik2.values.loai_yeu_cau}
                  placeholder="Loại Yêu Cầu"
                />
              </div>
              <div class="input-group">
                <textarea
                  class="form-control"
                  name="noi_dung"
                  onChange={formik2.handleChange}
                  value={formik2.values.noi_dung}
                  placeholder="Nội dung"
                ></textarea>
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Hình Ảnh:</label>
                <img
                  className="img-thumbnail"
                  src={`http://localhost:3000/images/${formik2.values.hinh_anh}`}
                  alt=""
                />
              </div>
            </form>
          </div>
          <div className="col-6">
            {" "}
            <form onSubmit={formik2.handleSubmit} style={formStyle}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="loai_yeu_cau"
                  onChange={formik2.handleChange}
                  value={formik2.values.feedback.loai_yeu_cau}
                  placeholder="Loại Yêu Cầu"
                />
              </div>
              <div class="input-group">
                <textarea
                  class="form-control"
                  name="noi_dung"
                  onChange={formik2.handleChange}
                  value={formik2.values.feedback.noi_dung}
                  placeholder="Nội dung"
                ></textarea>
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Hình Ảnh:</label>
                <img
                  className="img-thumbnail"
                  src={`http://localhost:3000/images/${formik2.values.feedback.hinh_anh}`}
                  alt=""
                />
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Respone;
