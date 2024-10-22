
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
import './SupplierManagement.css'; // Ensure the CSS file name is correct

const SupplierManagement = () => {
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    maNhaCungCap: '',
    tenNhaCungCap: '',
    tenMatHang: '',
    soDienThoai: '',
    ghiChu: '',
    ngayTao: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tất cả');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      maNhaCungCap: '',
      tenNhaCungCap: '',
      tenMatHang: '',
      soDienThoai: '',
      ghiChu: '',
      ngayTao: '',
    });
    setSearchTerm('');
    setFilterStatus('Tất cả');
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    resetForm();
  };

  const suppliers = [
    { maNhaCungCap: '001', tenNhaCungCap: 'Nhà Cung Cấp 1', tenMatHang: 'Mặt hàng 1', soDienThoai: '0901234567', ghiChu: 'Ghi chú 1', ngayTao: '01/01/2024' },
    { maNhaCungCap: '002', tenNhaCungCap: 'Nhà Cung Cấp 2', tenMatHang: 'Mặt hàng 2', soDienThoai: '0987654321', ghiChu: 'Ghi chú 2', ngayTao: '02/01/2024' },
  ];

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.tenNhaCungCap.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'Tất cả';
    return matchesSearch && matchesFilter;
  });

  const handleEdit = (supplier) => {
    setFormData(supplier);
    setTabValue(1);
  };

  const handleDelete = (maNhaCungCap) => {
    alert(`Xóa nhà cung cấp với mã: ${maNhaCungCap}`);
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

        {tabValue === 0 && ( // Tab "Danh Sách Nhà Cung Cấp"
          <div>
            <Typography variant="h6" align="center" style={{ marginTop: '16px' }}>
              Danh Sách Nhà Cung Cấp
            </Typography>

            {/* Search and filter fields above the table */}
            <Grid container spacing={2} className="search-filter-container" style={{ marginTop: '16px' }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Tìm kiếm theo tên nhà cung cấp"
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
                  {/* Additional filter options can be added here */}
                </TextField>
              </Grid>
            </Grid>

            {/* Display the supplier list below the search and filter fields */}
            <TableContainer component={Paper} style={{ marginTop: '16px', color: '#1976d2' }}>
              <Table>
                <TableHead>
                  <TableRow className="table-row-header">
                    <TableCell>Mã Nhà Cung Cấp</TableCell>
                    <TableCell>Tên Nhà Cung Cấp</TableCell>
                    <TableCell>Tên Mặt Hàng</TableCell>
                    <TableCell>Số Điện Thoại</TableCell>
                    <TableCell>Ghi Chú</TableCell>
                    <TableCell>Ngày Tạo</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredSuppliers.map((supplier) => (
                    <TableRow key={supplier.maNhaCungCap}>
                      <TableCell>{supplier.maNhaCungCap}</TableCell>
                      <TableCell>{supplier.tenNhaCungCap}</TableCell>
                      <TableCell>{supplier.tenMatHang}</TableCell>
                      <TableCell>{supplier.soDienThoai}</TableCell>
                      <TableCell>{supplier.ghiChu}</TableCell>
                      <TableCell>{supplier.ngayTao}</TableCell>
                      <TableCell>
  <Button
    variant="outlined"
    color="primary"
    onClick={() => handleEdit(supplier)}
    startIcon={<Edit />}
    style={{
      border: 'none', // Remove border
      boxShadow: 'none', // Remove shadow
    }}
  />
  <Button
    variant="outlined"
    color="secondary"
    onClick={() => handleDelete(supplier.maNhaCungCap)}
    startIcon={<Delete />}
    style={{
      border: 'none', // Remove border
      boxShadow: 'none', // Remove shadow
    }}
  />
</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}

        {tabValue === 1 && ( // Tab "Thêm Nhà Cung Cấp"
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="maNhaCungCap"
                  label="Mã Nhà Cung Cấp"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.maNhaCungCap}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="tenNhaCungCap"
                  label="Tên Nhà Cung Cấp"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.tenNhaCungCap}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="tenMatHang"
                  label="Tên Mặt Hàng"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.tenMatHang}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="soDienThoai"
                  label="Số Điện Thoại"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.soDienThoai}
                  onChange={handleInputChange}
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
              <Grid item xs={12} container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    type="button"
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
      </Paper>
    </Container>
  );
};

export default SupplierManagement;
