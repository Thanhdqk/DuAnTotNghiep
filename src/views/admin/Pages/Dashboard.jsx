import React, { useState, useEffect } from 'react';
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
} from "@mui/material";
import { Add, Restore, Edit, Delete } from "@mui/icons-material";
import axios from 'axios';

const SupplierManagement = () => {
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    nha_cung_capID: '',
    ten_nhaCC: '',
    ten_mat_hang: '',
    so_dien_thoai: '',
    dia_chi: '',
    accountID: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/nhacungcap');
      setSuppliers(response.data);
    } catch (error) {
      handleSnackbar("Có lỗi xảy ra khi lấy danh sách nhà cung cấp!", 'error');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      nha_cung_capID: '',
      ten_nhaCC: '',
      ten_mat_hang: '',
      so_dien_thoai: '',
      dia_chi: '',
      accountID: '',
    });
    setSearchTerm('');
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    resetForm();
  };

  const filteredSuppliers = suppliers.filter(supplier => 
    supplier.ten_nhaCC.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (supplier) => {
    setFormData({
      nha_cung_capID: supplier.nha_cung_capID,
      ten_nhaCC: supplier.ten_nhaCC,
      ten_mat_hang: supplier.ten_mat_hang,
      so_dien_thoai: supplier.so_dien_thoai,
      dia_chi: supplier.dia_chi,
      accountID: supplier.accountID,
    });
    setTabValue(1);
  };

  const handleDelete = async (nha_cung_capID) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhà cung cấp này?")) {
      try {
        await axios.delete(`http://localhost:8080/api/nhacungcap/${nha_cung_capID}`);
        fetchSuppliers();
        handleSnackbar("Xóa nhà cung cấp thành công!", 'success');
      } catch (error) {
        handleSnackbar("Có lỗi xảy ra khi xóa nhà cung cấp!", 'error');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/nhacungcap', formData);
      fetchSuppliers();
      resetForm();
      setTabValue(0);
      handleSnackbar("Thêm nhà cung cấp thành công!", 'success');
    } catch (error) {
      handleSnackbar("Có lỗi xảy ra khi lưu nhà cung cấp!", 'error');
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
      <Paper elevation={5} style={{ padding: '16px', color: '#1976d2' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Quản Lý Nhà Cung Cấp
        </Typography>

        <AppBar position="static" color="default">
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Danh Sách Nhà Cung Cấp" />
            <Tab label="Thêm Nhà Cung Cấp" />
          </Tabs>
        </AppBar>

        {tabValue === 0 && (
          <div>
            <Typography variant="h6" align="center" style={{ marginTop: '16px' }}>
              Danh Sách Nhà Cung Cấp
            </Typography>

            <Grid container spacing={2} className="search-filter-container" style={{ marginTop: '16px' }}>
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

            <TableContainer component={Paper} style={{ marginTop: '16px', color: '#1976d2' }}>
              <Table>
                <TableHead>
                  <TableRow className="table-row-header">
                    <TableCell>Mã Nhà Cung Cấp</TableCell>
                    <TableCell>Tên Nhà Cung Cấp</TableCell>
                    <TableCell>Tên Mặt Hàng</TableCell>
                    <TableCell>Số Điện Thoại</TableCell>
                    <TableCell>Địa Chỉ</TableCell>
                    <TableCell>Account ID</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredSuppliers.map((supplier) => (
                    <TableRow key={supplier.nha_cung_capID}>
                      <TableCell>{supplier.nha_cung_capID}</TableCell>
                      <TableCell>{supplier.ten_nhaCC}</TableCell>
                      <TableCell>{supplier.ten_mat_hang}</TableCell>
                      <TableCell>{supplier.so_dien_thoai}</TableCell>
                      <TableCell>{supplier.dia_chi}</TableCell>
                      <TableCell>{supplier.accountID}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleEdit(supplier)}>
                          <Edit />
                        </Button>
                        <Button
                          onClick={() => handleDelete(supplier.nha_cung_capID)}
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
              <Grid item xs={12}>
                <TextField
                  name="accountID"
                  label="Account ID"
                  variant="outlined"
                  fullWidth
                  value={formData.accountID}
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
                    THÊM NHÀ CUNG CẤP
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

        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default SupplierManagement;