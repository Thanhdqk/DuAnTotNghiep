import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Select,
  MenuItem,
  TablePagination,
} from "@mui/material";
import { Add, Restore, Edit, Delete } from "@mui/icons-material";
import "./BannerManager.css";
import Banner from './../../user/Pages/Banner';

const BannerManager = () => {
  const userid = localStorage.getItem("account_id")
  console.log("dsadasdsa",userid)
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    bannerId: "",
    hinhAnh: null,
    hoatDong: "",
    ngayTao: "",
    ngayHetHan: "",
    trangThaiXoa: "",
    accountId: "",
    hanh_dong:"",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [deletedSearchTerm, setDeletedSearchTerm] = useState("");
  const [deletedFilterStatus, setDeletedFilterStatus] = useState("Tất cả");
  const [banners, setBanners] = useState([]);
  const [deletedBanners, setDeletedBanners] = useState([]);
  const [listDataHd,setlistDataHD] = useState([])
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const apilistDataHd = async () =>{
    const res = await axios({url:"http://localhost:8080/api/users/gethanhdong",method:"GET"})
    setlistDataHD(res.data)
    console.log('sdsadsadfas',res.data)
  }

  useEffect(() => {
    fetchBanners();
    fetchDeletedBanners();
    apilistDataHd();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/banners");
      setBanners(response.data);
      console.log(response.data);
    } catch (error) {
      handleSnackbar("Có lỗi xảy ra khi lấy danh sách banner!", "error");
    }
  };

  const fetchDeletedBanners = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/banners"); // Cập nhật nếu cần
      console.log("res", response.data[0].users);
      setDeletedBanners(response.data);
    } catch (error) {
      handleSnackbar("Có lỗi xảy ra khi lấy danh sách banner đã xóa!", "error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, hinhAnh: e.target.files[0] }));
  };

  const resetForm = () => {
    setFormData({
      bannerId: "",
      hinhAnh: "",
      hoatDong: "",
      ngayTao: "",
      ngayHetHan: "",
      trangThaiXoa: "Chưa xóa",
      accountId: "",
      hanh_dong:"",
    });
    setSearchTerm("");
    setFilterStatus("Tất cả");
    setDeletedSearchTerm("");
    setDeletedFilterStatus("Tất cả");
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    resetForm();
  };

  const filteredPosts = banners.filter((post) => {
    const matchesSearch = (post.bannerId?.toLowerCase() || '')
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "Tất cả" || post.hoat_dong === filterStatus;
    return matchesSearch && matchesFilter;
});

console.log("post", filteredPosts);

const filteredDeletedBannerss = banners.filter((banner) => {
    const matchesSearch = (banner.nha_cung_capID?.toLowerCase() || '')
      .includes(searchTerm.toLowerCase());

    const isDeleted = banner.trang_thai_xoa === "Xóa";

    return matchesSearch && isDeleted; // Filtering out deleted suppliers
});

  const handleEdit = (post) => {
    setFormData({});
    setTabValue(1);
  };

  const handleDelete = async (bannerId) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa banner này?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/banners/${bannerId}`);
      fetchBanners();
      fetchDeletedBanners();
      handleSnackbar("Xóa banner thành công!", "success");
    } catch (error) {
      handleSnackbar("Có lỗi xảy ra khi xóa banner!", "error");
    }
  };

  const handleRestore = async (bannerId) => {
    try {
      await axios.get(`http://localhost:8080/api/banners/back/${bannerId}`);
      fetchBanners();
      fetchDeletedBanners();
      handleSnackbar("Khôi phục banner thành công!", "success");
      setTabValue(0);
    } catch (error) {
      handleSnackbar("Có lỗi xảy ra khi khôi phục banner!", "error");
    }
  };
  const handleChange1 = async (post) => {
    try {
      const { bannerId } = post;
      await axios.get(`http://localhost:8080/api/banners/delete/${bannerId}`);
      setBanners((prevBanners) =>
        prevBanners.filter((b) => b.bannerId !== bannerId)
      );

      handleSnackbar("Xóa banner thành công!", "success");
      setTabValue(0);
    } catch (error) {
      handleSnackbar("Có lỗi xảy ra khi xóa banner!", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("bannerId", formData.bannerId);
    formDataToSend.append("hoat_dong", formData.hoatDong);
    formDataToSend.append("ngay_tao", formData.ngayTao);
    formDataToSend.append("trang_thai_xoa", formData.trangThaiXoa);
    formDataToSend.append("ngay_het_han", formData.ngayHetHan);
    formDataToSend.append("accountId", formData.accountId);
    formDataToSend.append("hanh_dong", formData.hanh_dong);
    if (formData.hinhAnh) {
      formDataToSend.append("hinh_file", formData.hinhAnh);
    }

    if (
      !formData.bannerId ||
      !formData.hoatDong ||
      !formData.trangThaiXoa ||
      !formData.ngayHetHan
    ) {
      handleSnackbar("Vui lòng điền đầy đủ thông tin!", "warning");
      return;
    }

    try {
      if (tabValue === 1) {
        await axios.post("http://localhost:8080/api/banners", formDataToSend);
        handleSnackbar("Thêm banner thành công!", "success");
      } else {
        await axios.put(
          `http://localhost:8080/api/banners/${formData.bannerId}`,
          formDataToSend
        );
        handleSnackbar("Cập nhật banner thành công!", "success");
      }
      fetchBanners();
      resetForm();
      setTabValue(0);
    } catch (error) {
      handleSnackbar("Có lỗi xảy ra khi lưu banner!", "error");
    }
  };

  const handleSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset về trang đầu khi thay đổi số hàng trên mỗi trang
  };

  return (
    <Container maxWidth="xl">
      <Paper elevation={5} style={{ padding: "16px", color: "#1976d2" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Quản Lý Banner
        </Typography>

        <AppBar position="static" color="default">
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Danh Sách Banner" />
            <Tab label="Thêm Banner" />
            <Tab onClick={()=>{fetchBanners()}} label="Lịch Sử Xóa" />
            <Tab onClick={()=>{apilistDataHd()}} label=" Hành Động" />
          </Tabs>
        </AppBar>

        {tabValue === 0 && (
          <div>
            <Typography
              variant="h6"
              align="center"
              style={{ marginTop: "16px" }}
            >
              Danh Sách Banner
            </Typography>

            <Grid
              container
              spacing={2}
              className="search-filter-container"
              style={{ marginTop: "16px" }}
            >
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Tìm kiếm theo ID"
                  variant="outlined"
                  fullWidth
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Lọc trạng thái"
                  variant="outlined"
                  fullWidth
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  SelectProps={{ native: true }}
                >
                  <option value="Tất cả">Tất cả</option>
                  <option value="Hoạt động">Hoạt động</option>
                  <option value="Ngừng hoạt động">Ngừng hoạt động</option>
                </TextField>
              </Grid>
            </Grid>

            <TableContainer
              component={Paper}
              style={{ marginTop: "16px", color: "#1976d2" }}
            >
              <Table>
                <TableHead>
                  <TableRow className="table-row-header">
                    <TableCell>Mã Banner</TableCell>
                    <TableCell>Hình Ảnh</TableCell>
                    <TableCell>Trạng Thái Hoạt Động</TableCell>
                    <TableCell>Ngày Tạo</TableCell>
                    <TableCell>Ngày Hết Hạn</TableCell>
                    <TableCell>Trạng Thái Xóa</TableCell>
                    <TableCell>Account ID</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPosts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((post) => (
                      <TableRow key={post.bannerId}>
                        <TableCell>{post.bannerId}</TableCell>
                        <TableCell>
                          {post.hinh_anh ? (
                            <img
                              src={`/images/${post.hinh_anh}`}
                              alt="Hình ảnh"
                              style={{ width: 50, height: 50 }}
                            />
                          ) : (
                            "No Image"
                          )}
                        </TableCell>
                        <TableCell>{post.hoat_dong}</TableCell>
                        <TableCell>{post.ngay_tao}</TableCell>
                        <TableCell>{post.ngay_het_han}</TableCell>
                        <TableCell>
                          {post.trang_thai_xoa == null
                            ? "Chưa Xóa"
                            : post.trang_thai_xoa}
                        </TableCell>
                        <TableCell>
                        {post.users ? post.users.accountID : ""}
                      </TableCell>
                        <TableCell>
                          <Button onClick={() => handleEdit(post)}>
                            <Edit />
                          </Button>
                          <Button
                            onClick={() => {
                              handleChange1(post);
                              setTabValue(2); // Chuyển sang tab lịch sử
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
              count={filteredPosts.length}
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
                  name="bannerId"
                  label="Mã Banner"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.bannerId}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="ngayTao"
                  label="Ngày Tạo"
                  variant="outlined"
                  fullWidth
                  type="date"
                  required
                  value={formData.ngayTao}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="ngayHetHan"
                  label="Ngày Hết Hạn"
                  variant="outlined"
                  fullWidth
                  type="date"
                  required
                  value={formData.ngayHetHan}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="hoatDong"
                  select
                  label="Trạng Thái Hoạt Động"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.hoatDong}
                  onChange={handleInputChange}
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>Chọn trạng thái hoạt động</em>
                  </MenuItem>
                  <MenuItem value="Hoạt động">Hoạt động</MenuItem>
                  <MenuItem value="Ngừng hoạt động">Ngừng hoạt động</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <input
                  type="file"
                  accept="images/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  id="upload-button"
                />
                <label htmlFor="upload-button">
                  <Button variant="contained" component="span">
                    Tải lên Hình Ảnh
                  </Button>
                </label>
              </Grid>
              <Grid item xs={12}>
                {formData.hinhAnh && (
                  <img
                    src={URL.createObjectURL(formData.hinhAnh)}
                    alt="Hình ảnh đã chọn"
                    style={{ width: 50, height: 50 }}
                  />
                )}
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
                    {formData.banner ? "CẬP NHẬT BANNER" : "THÊM BANNER"}
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
              Lịch Sử Xóa
            </Typography>

            <Grid container spacing={2} style={{ marginTop: "16px" }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Tìm kiếm theo ID"
                  variant="outlined"
                  fullWidth
                  value={deletedSearchTerm}
                  onChange={(e) => setDeletedSearchTerm(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Lọc trạng thái"
                  variant="outlined"
                  fullWidth
                  value={deletedFilterStatus}
                  onChange={(e) => setDeletedFilterStatus(e.target.value)}
                  SelectProps={{ native: true }}
                >
                  <option value="Tất cả">Tất cả</option>
                  <option value="Hoạt động">Hoạt động</option>
                  <option value="Ngừng hoạt động">Ngừng hoạt động</option>
                </TextField>
              </Grid>
            </Grid>

            <TableContainer
              component={Paper}
              style={{ marginTop: "16px", color: "#1976d2" }}
            >
              <Table>
                <TableHead>
                  <TableRow className="table-row-header">
                    <TableCell>Mã Banner</TableCell>
                    <TableCell>Hình Ảnh</TableCell>
                    <TableCell>Trạng Thái Hoạt Động</TableCell>
                    <TableCell>Ngày Tạo</TableCell>
                    <TableCell>Ngày Hết Hạn</TableCell>
                    <TableCell>Trạng Thái Xóa</TableCell>
                    <TableCell>Account ID</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredDeletedBannerss.map((banner) => (
                    <TableRow key={banner.bannerId}>
                      <TableCell>{banner.bannerId}</TableCell>
                      <TableCell>
                        {banner.hinh_anh ? banner.hinh_anh : "Chưa có hình"}
                      </TableCell>
                      <TableCell>{banner.hoat_dong}</TableCell>
                      <TableCell>{banner.ngay_tao}</TableCell>
                      <TableCell>{banner.ngay_het_han}</TableCell>
                      <TableCell>{banner.trang_thai_xoa}</TableCell>
                      <TableCell>
                        {banner.users ? banner.users.accountID : ""}
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleRestore(banner.bannerId)}
                          sx={{ color: "primary", marginRight: 1 }}
                          startIcon={<Restore />}
                        ></Button>
                        <Button
                          onClick={() => handleDelete(banner.bannerId)}
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
              count={filteredPosts.length}
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
              Danh Sách Banner
            </Typography>

            <Grid
              container
              spacing={2}
              className="search-filter-container"
              style={{ marginTop: "16px" }}
            >
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Tìm kiếm theo ID"
                  variant="outlined"
                  fullWidth
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Lọc trạng thái"
                  variant="outlined"
                  fullWidth
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  SelectProps={{ native: true }}
                >
                  <option value="Tất cả">Tất cả</option>
                  <option value="Hoạt động">Hoạt động</option>
                  <option value="Ngừng hoạt động">Ngừng hoạt động</option>
                </TextField>
              </Grid>
            </Grid>

            <TableContainer
              component={Paper}
              style={{ marginTop: "16px", color: "#1976d2" }}
            >
              <Table>
                <TableHead>
                  <TableRow className="table-row-header">
                    <TableCell>Mã Banner</TableCell>
                    <TableCell>Hình Ảnh</TableCell>
                    <TableCell>Trạng Thái Hoạt Động</TableCell>
                    <TableCell>Ngày Tạo</TableCell>
                    <TableCell>Ngày Hết Hạn</TableCell>
                    <TableCell>Account ID</TableCell>
                    <TableCell>Nhật Kí Hành Động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listDataHd
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((post) => (
                      <TableRow key={post.bannerId}>
                        <TableCell>{post.bannerId}</TableCell>
                        <TableCell>
                          {post.hinh_anh ? (
                            <img
                              src={`/images/${post.hinh_anh}`}
                              alt="Hình ảnh"
                              style={{ width: 50, height: 50 }}
                            />
                          ) : (
                            "No Image"
                          )}
                        </TableCell>
                        <TableCell>{post.hoat_dong}</TableCell>
                        <TableCell>{post.ngay_tao}</TableCell>
                        <TableCell>{post.ngay_het_han}</TableCell>
                        <TableCell>
                        {post.users ? post.users.accountID : ""}
                      </TableCell>
                        <TableCell>{post.tenHanhDong}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={listDataHd.length}
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

export default BannerManager;
