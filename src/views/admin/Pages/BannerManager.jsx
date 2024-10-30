import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
} from "@mui/material";
import { Add, Restore, Edit, Delete } from "@mui/icons-material"; 
import './BannerManager.css';

const BannerManager = () => {
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    bannerId: '',
    hinhAnh: null,
    hoatDong: '',
    ngayTao: '',
    ngayHetHan: '',
    trangThaiXoa: 'Chưa xóa',
    accountId: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tất cả');
  const [deletedSearchTerm, setDeletedSearchTerm] = useState('');
  const [deletedFilterStatus, setDeletedFilterStatus] = useState('Tất cả');
  const [banners, setBanners] = useState([]);
  const [deletedBanners, setDeletedBanners] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchBanners();
    fetchDeletedBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/banners');
      setBanners(response.data);
    } catch (error) {
      handleSnackbar("Có lỗi xảy ra khi lấy danh sách banner!", 'error');
    }
  };

  const fetchDeletedBanners = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/banners'); // Cập nhật nếu cần
      setDeletedBanners(response.data);
    } catch (error) {
      handleSnackbar("Có lỗi xảy ra khi lấy danh sách banner đã xóa!", 'error');
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
      bannerId: '',
      hinhAnh: null,
      hoatDong: '',
      ngayTao: '',
      ngayHetHan: '',
      trangThaiXoa: 'Chưa xóa',
      accountId: '',
    });
    setSearchTerm('');
    setFilterStatus('Tất cả');
    setDeletedSearchTerm('');
    setDeletedFilterStatus('Tất cả');
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    resetForm();
  };

  const filteredPosts = banners.filter(post => {
    const matchesSearch = post.bannerId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'Tất cả' || post.hoat_dong === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredDeletedBanners = deletedBanners.filter(banner => {
    const matchesSearch = banner.bannerId.toLowerCase().includes(deletedSearchTerm.toLowerCase());
    const matchesFilter = deletedFilterStatus === 'Tất cả' || banner.hoat_dong === deletedFilterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleEdit = (post) => {
    setFormData({ ...post, trangThaiXoa: 'Đã xóa' });
    setTabValue(1);
  };

  const handleDelete = async (bannerId) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa banner này?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/banners/${bannerId}`);
      fetchBanners();
      fetchDeletedBanners();
      handleSnackbar("Xóa banner thành công!", 'success');
    } catch (error) {
      handleSnackbar("Có lỗi xảy ra khi xóa banner!", 'error');
    }
  };

  const handleRestore = async (bannerId) => {
    try {
      await axios.put(`http://localhost:8080/api/banners/${bannerId}`);
      fetchBanners();
      fetchDeletedBanners();
      handleSnackbar("Khôi phục banner thành công!", 'success');
    } catch (error) {
      handleSnackbar("Có lỗi xảy ra khi khôi phục banner!", 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('bannerId', formData.bannerId);
    formDataToSend.append('hoat_dong', formData.hoatDong);
    formDataToSend.append('ngay_tao', formData.ngayTao);
    formDataToSend.append('trang_thai_xoa', formData.trangThaiXoa);
    formDataToSend.append('ngay_het_han', formData.ngayHetHan);
    if (formData.hinhAnh) {
      formDataToSend.append('hinh_file', formData.hinhAnh);
    }

    if (!formData.bannerId || !formData.hoatDong || !formData.trangThaiXoa || !formData.ngayHetHan) {
      handleSnackbar("Vui lòng điền đầy đủ thông tin!", 'warning');
      return;
    }

    try {
      if (tabValue === 1) {
        await axios.post('http://localhost:8080/api/banners', formDataToSend);
        handleSnackbar("Thêm banner thành công!", 'success');
      } else {
        await axios.put(`http://localhost:8080/api/banners/${formData.bannerId}`, formDataToSend);
        handleSnackbar("Cập nhật banner thành công!", 'success');
      }
      fetchBanners();
      resetForm();
      setTabValue(0);
    } catch (error) {
      handleSnackbar("Có lỗi xảy ra khi lưu banner!", 'error');
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
      <Paper elevation={5} style={{ padding: '16px', color:'#1976d2' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Quản Lý Banner
        </Typography>

        <AppBar position="static" color="default">
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Danh Sách Banner" />
            <Tab label="Thêm Banner" />
            <Tab label="Lịch Sử Xóa" />
          </Tabs>
        </AppBar>

        {tabValue === 0 && (
          <div>
            <Typography variant="h6" align="center" style={{ marginTop: '16px' }}>
              Danh Sách Banner
            </Typography>

            <Grid container spacing={2} className="search-filter-container" style={{ marginTop: '16px' }}>
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

            <TableContainer component={Paper} style={{ marginTop: '16px', color:'#1976d2' }}>
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
                  {filteredPosts.map((post) => (
                    <TableRow key={post.bannerId}>
                      <TableCell>{post.bannerId}</TableCell>
                      <TableCell>{post.hinh_anh ? post.hinh_anh : 'Chưa có hình'}</TableCell>
                      <TableCell>{post.hoat_dong}</TableCell>
                      <TableCell>{post.ngay_tao}</TableCell>
                      <TableCell>{post.ngay_het_han}</TableCell>
                      <TableCell>{post.trang_thai_xoa}</TableCell>
                      <TableCell>{post.users ? post.users.accountID : ""}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleEdit(post)}>
                          <Edit />
                        </Button>
                        <Button
                          onClick={() => {
                            handleEdit({ ...post, hoatDong: 'Ngừng hoạt động' });
                            setTabValue(2); // Chuyển sang tab lịch sử
                          }}
                          sx={{ color: "secondary" }}
                        >
                          <Edit />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
                  name="accountId"
                  label="Account ID"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.accountId}
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
                <Select
                  name="hoatDong"
                  label="Trạng Thái Hoạt Động"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.hoatDong}
                  onChange={handleInputChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Trạng Thái Hoạt Động' }}
                >
                  <MenuItem value="">
                    <em>Chọn trạng thái hoạt động</em>
                  </MenuItem>
                  <MenuItem value="Hoạt động">Hoạt động</MenuItem>
                  <MenuItem value="Ngừng hoạt động">Ngừng hoạt động</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="trangThaiXoa"
                  label="Trạng Thái Xóa"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.trangThaiXoa}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  type="file"
                  accept="image/*"
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
                    {formData.bannerId ? "THÊM BANNER" : "CẬP NHẬT BANNER"}
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
            <Typography variant="h6" align="center" style={{ marginTop: '16px' }}>
              Lịch Sử Xóa
            </Typography>

            <Grid container spacing={2} style={{ marginTop: '16px' }}>
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

            <TableContainer component={Paper} style={{ marginTop: '16px', color:'#1976d2' }}>
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
                  {filteredDeletedBanners.map((banner) => (
                    <TableRow key={banner.bannerId}>
                      <TableCell>{banner.bannerId}</TableCell>
                      <TableCell>{banner.hinh_anh ? banner.hinh_anh : 'Chưa có hình'}</TableCell>
                      <TableCell>{banner.hoat_dong}</TableCell>
                      <TableCell>{banner.ngay_tao}</TableCell>
                      <TableCell>{banner.ngay_het_han}</TableCell>
                      <TableCell>{banner.trang_thai_xoa}</TableCell>
                      <TableCell>{banner.users ? banner.users.accountID : ""}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleRestore(banner.bannerId)}
                          sx={{ color: "primary", marginRight: 1 }}
                          startIcon={<Restore />}
                        >
                          
                        </Button>
                        <Button
                          onClick={() => handleDelete(banner.bannerId)}
                          sx={{ color: "error" }}
                          startIcon={<Delete />}
                        >
                         
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}

        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default BannerManager;