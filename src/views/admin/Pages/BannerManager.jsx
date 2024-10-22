import React, { useState } from 'react';
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
} from "@mui/material";
import { Add, Restore, Edit, Delete } from "@mui/icons-material"; 
import './BannerManager.css';

const BannerManager = () => {
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    maBaiDang: '',
    tieuDe: '',
    noiDung: '',
    trangThaiPheDuyet: 'Chưa phê duyệt',
    trangThaiHoatDong: 'Ngừng hoạt động',
    ghiChu: '',
    hinhAnh: null,
    ngayTao: '', // Ngày tạo
    ngayHetHan: '', // Ngày hết hạn
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tất cả');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, hinhAnh: e.target.files[0] });
  };

  const resetForm = () => {
    setFormData({
      maBaiDang: '',
      tieuDe: '',
      noiDung: '',
      trangThaiPheDuyet: 'Chưa phê duyệt',
      trangThaiHoatDong: 'Ngừng hoạt động',
      ghiChu: '',
      hinhAnh: null,
      ngayTao: '',
      ngayHetHan: '',
    });
    setSearchTerm('');
    setFilterStatus('Tất cả');
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    resetForm();
  };

  const posts = [
    { maBaiDang: '001', tieuDe: 'Tiêu đề 1', noiDung: 'Nội dung 1', trangThaiPheDuyet: 'Đã phê duyệt', trangThaiHoatDong: 'Hoạt động', ghiChu: 'Ghi chú 1', ngayTao: '01/01/2023', ngayHetHan: '01/01/2024' },
    { maBaiDang: '002', tieuDe: 'Tiêu đề 2', noiDung: 'Nội dung 2', trangThaiPheDuyet: 'Chưa phê duyệt', trangThaiHoatDong: 'Ngừng hoạt động', ghiChu: 'Ghi chú 2', ngayTao: '02/01/2023', ngayHetHan: '02/01/2024' },
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.tieuDe.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'Tất cả' || post.trangThaiPheDuyet === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleEdit = (post) => {
    setFormData(post);
    setTabValue(1);
  };

  const handleDelete = (maBaiDang) => {
    alert(`Xóa bài đăng với mã: ${maBaiDang}`);
  };

  return (
    <Container maxWidth="xl">
      <Paper elevation={5} style={{ padding: '16px', color:'#1976d2'}}>
        <Typography variant="h4" align="center" gutterBottom>
          Quản Lý Banner
        </Typography>

        <AppBar position="static" color="default">
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Danh Sách Bài Đăng" />
            <Tab label="Thêm Bài Đăng" />
          </Tabs>
        </AppBar>

        {tabValue === 0 && ( // Tab "Danh Sách Bài Đăng"
          <div>
            <Typography variant="h6" align="center" style={{ marginTop: '16px' }}>
              Danh Sách Bài Đăng
            </Typography>

            <Grid container spacing={2} className="search-filter-container" style={{ marginTop: '16px' }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Tìm kiếm theo tiêu đề"
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
                  <option value="Đã phê duyệt">Đã phê duyệt</option>
                  <option value="Chưa phê duyệt">Chưa phê duyệt</option>
                </TextField>
              </Grid>
            </Grid>

            <TableContainer component={Paper} style={{ marginTop: '16px', color:'#1976d2' }}>
              <Table>
                <TableHead>
                  <TableRow className="table-row-header">
                    <TableCell>Mã Bài Đăng</TableCell>
                    <TableCell>Tiêu Đề</TableCell>
                    <TableCell>Nội Dung</TableCell>
                    <TableCell>Hình Ảnh</TableCell>
                    <TableCell>Trạng Thái Phê Duyệt</TableCell>
                    <TableCell>Trạng Thái Hoạt Động</TableCell>
                    <TableCell>Ghi Chú</TableCell>
                    <TableCell>Ngày Tạo</TableCell>
                    <TableCell>Ngày Hết Hạn</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow key={post.maBaiDang}>
                      <TableCell>{post.maBaiDang}</TableCell>
                      <TableCell>{post.tieuDe}</TableCell>
                      <TableCell>{post.noiDung}</TableCell>
                      <TableCell>{post.hinhAnh ? post.hinhAnh.name : 'Chưa có hình'}</TableCell>
                      <TableCell>{post.trangThaiPheDuyet}</TableCell>
                      <TableCell>{post.trangThaiHoatDong}</TableCell>
                      <TableCell>{post.ghiChu}</TableCell>
                      <TableCell>{post.ngayTao}</TableCell>
                      <TableCell>{post.ngayHetHan}</TableCell>
                      <TableCell>
  <Button
    variant="outlined"
    color="primary"
    onClick={() => handleEdit(post)}
    startIcon={<Edit />}
    style={{ border: 'none' }} // Remove border if needed
  /> 
  <Button
    variant="outlined"
    color="secondary"
    onClick={() => handleDelete(post.maBaiDang)}
    startIcon={<Delete />}
    style={{border: 'none' }} // Remove border if needed
  />
</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}

        {tabValue === 1 && ( // Tab "Thêm Bài Đăng"
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="maBaiDang"
                  label="Mã Bài Đăng"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.maBaiDang}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="tieuDe"
                  label="Tiêu Đề"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.tieuDe}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="noiDung"
                  label="Nội Dung"
                  variant="outlined"
                  fullWidth
                  required
                  multiline
                  rows={4}
                  value={formData.noiDung}
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
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="trangThaiPheDuyet"
                  label="Trạng Thái Phê Duyệt"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.trangThaiPheDuyet}
                  onChange={handleInputChange}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="trangThaiHoatDong"
                  label="Trạng Thái Hoạt Động"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.trangThaiHoatDong}
                  onChange={handleInputChange}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="ghiChu"
                  label="Ghi Chú"
                  variant="outlined"
                  fullWidth
                  value={formData.ghiChu}
                  onChange={handleInputChange}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  id="upload-button"
                />
                <label htmlFor="upload-button">
                  <Button variant="contained" component="span">
                    Tải lên Hình Ảnh
                  </Button>
                </label>
              </Grid>
              <Grid item xs={12} container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<Add />}
                  >
                    THÊM BÀI ĐĂNG
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
      </Paper>
    </Container>
  );
};

export default BannerManager;