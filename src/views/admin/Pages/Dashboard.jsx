import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  AppBar,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  Alert,
  TablePagination,
} from "@mui/material";
import { Add, Restore, Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import { param } from "jquery";

const SupplierManagement = () => {
  const userid = localStorage.getItem("account_id")
  console.log("dsadasdsa",userid)
  const [tabValue, setTabValue] = useState(0);
  
  const [formData, setFormData] = useState({
    nha_cung_capID: "",
    ten_nhaCC: "",
    ten_mat_hang: "",
    so_dien_thoai: "",
    dia_chi: "",
    // hanh_dong: '',
    trang_thai_xoa: "",
    accountID: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [banners, setBanners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [listDatahd,setlistDataHD] = useState([])
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const apilistDatahd = async () =>{
    const res = await axios({url:"http://localhost:8080/api/nhacungcap/ncchanhdong",method:"GET"})
    setlistDataHD(res.data)
    console.log('sdsadsadfas',res.data)
  }


  useEffect(() => {
    fetchSuppliers();
    apilistDatahd();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/nhacungcap");
      setSuppliers(response.data);
    } catch (error) {
      handleSnackbar("Có lỗi xảy ra khi lấy danh sách nhà cung cấp!", "error");
    }
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset về trang đầu khi thay đổi số hàng trên mỗi trang
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Cập nhật đúng trường tương ứng
    }));
  };

  const resetForm = () => {
    setFormData({
      nha_cung_capID: "",
      ten_nhaCC: "",
      ten_mat_hang: "",
      so_dien_thoai: "",
      dia_chi: "",
      trang_thai_xoa: "",
      //hanh_dong: '',
      accountID: "",
    });
    setSearchTerm("");
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    resetForm();
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const filteredSuppliers = suppliers.filter((supplier) =>{
    const matchesSearch  = supplier.ten_nhaCC.toLowerCase().includes(searchTerm.toLowerCase());
    const isDeleted = supplier.trang_thai_xoa === "Xóa";
    return matchesSearch && !isDeleted;
});
  const filteredSupplierss = suppliers.filter((supplier) => {
    const matchesSearch = supplier.nha_cung_capID
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const isDeleted = supplier.trang_thai_xoa === "Xóa";

    return matchesSearch && isDeleted; // Filtering out deleted suppliers
  });

  const handleEdit = (supplier) => {
    setFormData({
      nha_cung_capID: supplier.nha_cung_capID,
      ten_nhaCC: supplier.ten_nhaCC,
      ten_mat_hang: supplier.ten_mat_hang,
      so_dien_thoai: supplier.so_dien_thoai,
      dia_chi: supplier.dia_chi,
      trang_thai_xoa: supplier.trang_thai_xoa,
      hanh_dong: supplier.hanh_dong,
      accountID: supplier.users.accountID,
    });
    setTabValue(1);
    console.log("Dữ liệu khi nhấn edit: ", supplier);
  };
  const handleChange1 = async (post) => {
    try {
      const { nha_cung_capID } = post;
      await axios.get(
        `http://localhost:8080/api/nhacungcap/delete/${nha_cung_capID}`
      );
      setBanners((prevNcc) =>
        prevNcc.filter((b) => b.bannerId !== nha_cung_capID)
      );

      handleSnackbar("Xóa banner thành công!", "success");
      setTabValue(0);
      // filteredSuppliers();
      fetchSuppliers()
    } catch (error) {
      handleSnackbar("Có lỗi xảy ra khi xóa nhà cung cấp!", "error");
    }
  };

  const handleDelete = async (nha_cung_capID) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhà cung cấp này?")) {
      try {
        await axios.delete(
          `http://localhost:8080/api/nhacungcap/${nha_cung_capID}`
        );
        handleSnackbar("Xóa nhà cung cấp thành công!", "success");
        setTabValue(2);
        //filteredSuppliers();
        
      } catch (error) {
        //handleSnackbar("Có lỗi xảy ra khi xóa nhà cung cấp!", "error");
      }
    }
  };

  const handleRestore = async (nha_cung_capID) => {
    try {
      await axios.get(
        `http://localhost:8080/api/nhacungcap/back/${nha_cung_capID}`
      );
      fetchSuppliers();
      handleSnackbar("Khôi phục banner thành công!", "success");
      setTabValue(0);
    } catch (error) {
      handleSnackbar("Có lỗi xảy ra khi khôi phục banner!", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Dữ liệu khi nhấn save: ", formData);
    console.log('da',formData.nha_cung_capID)
    try {
      await axios.post(
        `http://localhost:8080/api/nhacungcap/save?id=${userid}&nha_cung_capID=${formData.nha_cung_capID}&ten_nhaCC=${formData.ten_nhaCC}&ten_mat_hang=${formData.ten_mat_hang}
        &dia_chi=${formData.dia_chi}&so_dien_thoai=${formData.so_dien_thoai}&trang_thai_xoa=${formData.trang_thai_xoa}`,
       
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      fetchSuppliers();
      resetForm();
      setTabValue(0);
      handleSnackbar("Thêm nhà cung cấp thành công!", "success");
    } catch (error) {
      //handleSnackbar("Có lỗi xảy ra khi lưu nhà cung cấp!", error);
      console.error(
        "Có lỗi xảy ra khi lưu nhà cung cấp:",
        error.response || error.message || error
      );
    }
  };

  const handleSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="xl">
      <Paper elevation={5} style={{ padding: "16px", color: "#1976d2" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Quản Lý Nhà Cung Cấp
        </Typography>

        <AppBar position="static" color="default">
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Danh Sách Nhà Cung Cấp" />
            <Tab label="Thêm Nhà Cung Cấp" />
            <Tab label="Lịch Sử Xóa" />
            <Tab label="Nhật Kí Hoạt Động" />
          </Tabs>
        </AppBar>

        {tabValue === 0 && (
          <div>
            <Typography
              variant="h6"
              align="center"
              style={{ marginTop: "16px" }}
            >
              Danh Sách Nhà Cung Cấp
            </Typography>

            <Grid
              container
              spacing={2}
              className="search-filter-container"
              style={{ marginTop: "16px" }}
            >
              <Grid item xs={12}>
                <TextField
                  label="Tìm kiếm theo tên nhà cung cấp"
                  variant="outlined"
                  fullWidth
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Grid>
            </Grid>

            <TableContainer
              component={Paper}
              style={{ marginTop: "16px", color: "#1976d2" }}
            >
              <Table>
                <TableHead>
                  <TableRow className="table-row-header">
                    <TableCell>Mã Nhà Cung Cấp</TableCell>
                    <TableCell>Tên Nhà Cung Cấp</TableCell>
                    <TableCell>Tên Mặt Hàng</TableCell>
                    <TableCell>Số Điện Thoại</TableCell>
                    <TableCell>Địa Chỉ</TableCell>
                    {/* <TableCell>Trạng Thái Xóa</TableCell> */}
                    <TableCell>Account ID</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredSuppliers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((supplier) => (
                    <TableRow key={supplier.nha_cung_capID}>
                      <TableCell>{supplier.nha_cung_capID}</TableCell>
                      <TableCell>{supplier.ten_nhaCC}</TableCell>
                      <TableCell>{supplier.ten_mat_hang}</TableCell>
                      <TableCell>{supplier.so_dien_thoai}</TableCell>
                      <TableCell>{supplier.dia_chi}</TableCell>
                      {/* <TableCell>
                        {supplier.trang_thai_xoa == null
                          ? "Chưa Xóa"
                          : supplier.trang_thai_xoa}
                      </TableCell> */}
                      <TableCell>
                        {supplier.users ? supplier.users.accountID : ""}
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => handleEdit(supplier)}>
                          <Edit />
                        </Button>
                        <Button
                          onClick={() => {
                            handleChange1(supplier);
                             // Chuyển sang tab lịch sử
                          }}
                          sx={{ color: "secondary" }}
                        >
                          <Delete />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredSuppliers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        )}

        {tabValue === 1 && (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="nha_cung_capID"
                  label="Mã Nhà Cung Cấp"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.nha_cung_capID}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="ten_nhaCC"
                  label="Tên Nhà Cung Cấp"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.ten_nhaCC}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="ten_mat_hang"
                  label="Tên Mặt Hàng"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.ten_mat_hang}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="so_dien_thoai"
                  label="Số Điện Thoại"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.so_dien_thoai}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="dia_chi"
                  label="Địa Chỉ"
                  variant="outlined"
                  fullWidth
                  value={formData.dia_chi}
                  onChange={handleInputChange}
                />
              </Grid>
            
              <Grid item xs={12} container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<Add />}
                  >
                    {formData.nha_cung_capID ? "CẬP NHẬT BANNER" : "THÊM BANNER"}
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={resetForm}
                    startIcon={<Restore />}
                  >
                    ĐẶT LẠI
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
        {tabValue === 2 && (
          <div>
            <Typography
              variant="h6"
              align="center"
              style={{ marginTop: "16px" }}
            >
              Danh Sách Nhà Cung Cấp
            </Typography>

            <Grid
              container
              spacing={2}
              className="search-filter-container"
              style={{ marginTop: "16px" }}
            >
              <Grid item xs={12}>
                <TextField
                  label="Tìm kiếm theo tên nhà cung cấp"
                  variant="outlined"
                  fullWidth
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Grid>
            </Grid>

            <TableContainer
              component={Paper}
              style={{ marginTop: "16px", color: "#1976d2" }}
            >
              <Table>
                <TableHead>
                  <TableRow className="table-row-header">
                    <TableCell>Mã Nhà Cung Cấp</TableCell>
                    <TableCell>Tên Nhà Cung Cấp</TableCell>
                    <TableCell>Tên Mặt Hàng</TableCell>
                    <TableCell>Số Điện Thoại</TableCell>
                    <TableCell>Địa Chỉ</TableCell>
                    <TableCell>Trạng Thái Xóa</TableCell>
                    <TableCell>Account ID</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredSupplierss.map((supplier) => (
                    <TableRow key={supplier.nha_cung_capID}>
                      <TableCell>{supplier.nha_cung_capID}</TableCell>
                      <TableCell>{supplier.ten_nhaCC}</TableCell>
                      <TableCell>{supplier.ten_mat_hang}</TableCell>
                      <TableCell>{supplier.so_dien_thoai}</TableCell>
                      <TableCell>{supplier.dia_chi}</TableCell>
                      <TableCell>{supplier.trang_thai_xoa}</TableCell>
                      <TableCell>
                        {supplier.users ? supplier.users.accountID : ""}
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleRestore(supplier.nha_cung_capID)}
                          sx={{ color: "primary", marginRight: 1 }}
                          startIcon={<Restore />}
                        ></Button>
                        <Button
                          onClick={() => handleDelete(supplier.nha_cung_capID)}
                          sx={{ color: "error" }}
                          startIcon={<Delete />}
                        ></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredSuppliers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        )}
        {tabValue === 3 && (
          <div>
            <Typography
              variant="h6"
              align="center"
              style={{ marginTop: "16px" }}
            >
              Danh Sách Nhà Cung Cấp
            </Typography>

            <Grid
              container
              spacing={2}
              className="search-filter-container"
              style={{ marginTop: "16px" }}
            >
              <Grid item xs={12}>
                <TextField
                  label="Tìm kiếm theo tên nhà cung cấp"
                  variant="outlined"
                  fullWidth
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Grid>
            </Grid>

            <TableContainer
              component={Paper}
              style={{ marginTop: "16px", color: "#1976d2" }}
            >
              <Table>
                <TableHead>
                  <TableRow className="table-row-header">
                    <TableCell>Mã Nhà Cung Cấp</TableCell>
                    <TableCell>Tên Nhà Cung Cấp</TableCell>
                    <TableCell>Tên Mặt Hàng</TableCell>
                    <TableCell>Số Điện Thoại</TableCell>
                    <TableCell>Địa Chỉ</TableCell>
                    <TableCell>Trạng Thái Xóa</TableCell>
                    <TableCell>Account ID</TableCell>
                    <TableCell>Hành Động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listDatahd
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((supplier) => (
                    <TableRow key={supplier.nhacungcap.nha_cung_capID}>
                      <TableCell>{supplier.nhacungcap.nha_cung_capID}</TableCell>
                      <TableCell>{supplier.nhacungcap.ten_nhaCC}</TableCell>
                      <TableCell>{supplier.nhacungcap.ten_mat_hang}</TableCell>
                      <TableCell>{supplier.nhacungcap.so_dien_thoai}</TableCell>
                      <TableCell>{supplier.nhacungcap.dia_chi}</TableCell>
                      <TableCell>
                        {supplier.trang_thai_xoa == null
                          ? "Chưa Xóa"
                          : supplier.trang_thai_xoa}
                      </TableCell>
                      <TableCell>
                        { supplier.nhacungcap.users.accountID}
                      </TableCell>
                      <TableCell>{supplier.tenHanhDong}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={listDatahd.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        )}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default SupplierManagement;
