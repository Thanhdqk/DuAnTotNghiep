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
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@mui/material";
import { Add, Restore, Edit, Delete } from "@mui/icons-material";
import './SupplierManagement.css';

const SupplierManagement = () => {
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    id: '',
    tenThuongHieu: '',
    ngayTao: '',
    trangThaiHD: '',
    trangThaiXoa: '',
    hinhAnh: '',
    accountID: '',
    imageFile: null,  // State to hold the uploaded image file
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/loadAll');
      setSuppliers(response.data);
    } catch (error) {
      console.error('Error fetching suppliers', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, imageFile: file });
  };

  const resetForm = () => {
    setFormData({
      id: '',
      tenThuongHieu: '',
      ngayTao: '',
      trangThaiHD: '',
      trangThaiXoa: '',
      hinhAnh: '',
      accountID: '',
      imageFile: null,  // Reset image file state
    });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    resetForm();
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    const name = supplier.tenThuongHieu || ''; // Nếu tên là null hoặc undefined, gán là chuỗi rỗng
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  

  const handleEdit = (supplier) => {
    setFormData(supplier);
    setTabValue(1);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/delete/${id}`);
      setSuppliers(suppliers.filter(supplier => supplier.id !== id));
      alert(`Xóa nhà cung cấp với ID: ${id}`);
    } catch (error) {
      console.error('Error deleting supplier', error);
    }
  };

  const handleAdd = async () => {
    const formDataToSend = new FormData();
    // Append fields to FormData
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://localhost:8080/add', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Set content type for file upload
        },
      });
      setSuppliers([...suppliers, response.data]);
      resetForm();
      setTabValue(0);
    } catch (error) {
      console.error('Error adding supplier', error);
    }
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

            <Grid container spacing={2} style={{ marginTop: '16px' }}>
              <Grid item xs={12}>
                <TextField
                  label="Tìm kiếm theo tên thương hiệu"
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
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Tên Thương Hiệu</TableCell>
                    <TableCell>Ngày Tạo</TableCell>
                    <TableCell>Trạng Thái HD</TableCell>
                    <TableCell>Trạng Thái Xóa</TableCell>
                    <TableCell>Hình Ảnh</TableCell>
                    <TableCell>Account ID</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredSuppliers.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell>{supplier.id}</TableCell>
                      <TableCell>{supplier.tenThuongHieu}</TableCell>
                      <TableCell>{supplier.ngayTao}</TableCell>
                      <TableCell>{supplier.trangThaiHD}</TableCell>
                      <TableCell>{supplier.trangThaiXoa}</TableCell>
                      <TableCell>{supplier.hinhAnh}</TableCell>
                      <TableCell>{supplier.accountID}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleEdit(supplier)}
                          startIcon={<Edit />}
                        />
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => handleDelete(supplier.id)}
                          startIcon={<Delete />}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}

        {tabValue === 1 && (
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="id"
                  label="ID"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.id}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="tenThuongHieu"
                  label="Tên Thương Hiệu"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.tenThuongHieu}
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
                <FormControl fullWidth required>
                  <InputLabel>Trạng Thái Hoạt Động</InputLabel>
                  <Select
                    name="trangThaiHD"
                    value={formData.trangThaiHD}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="">
                      <em>Chọn trạng thái HD</em>
                    </MenuItem>
                    <MenuItem value="Hoạt động">Hoạt động</MenuItem>
                    <MenuItem value="Không hoạt động">Không hoạt động</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Trạng Thái Xóa</InputLabel>
                  <Select
                    name="trangThaiXoa"
                    value={formData.trangThaiXoa}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="">
                      <em>Chọn trạng thái</em>
                    </MenuItem>
                    <MenuItem value="Đã xóa">Đã xóa</MenuItem>
                    <MenuItem value="Chưa xóa">Chưa xóa</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="accountID"
                  label="Account ID"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.accountID}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  id="upload-button"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
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
                    onClick={handleAdd}
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