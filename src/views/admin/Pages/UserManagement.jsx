import React, { useEffect, useState } from "react";
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  InputAdornment,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import { Add, Search, Edit, Delete, Visibility, VisibilityOff, Restore } from "@mui/icons-material"; 
import './UserForm.css';

const UserForm = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState(""); 
  const [list, setList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    accountID: '',
    hovaten: '',
    password: '',
    hinh_anh: '',
    vai_tro: '',
    so_dien_thoai: '',
    email: '',
    dia_chi: '',
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/users');
      setList(res.data || []);
    } catch (error) {
      console.error("Lỗi API:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, hinh_anh: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormErrors({});
    const { accountID, hovaten, password, email, so_dien_thoai } = formData;
    let errors = {};

    // Check for required fields
    if (!accountID) errors.accountID = "Vui lòng điền Account ID!";
    if (!hovaten) errors.hovaten = "Vui lòng điền họ và tên!";
    if (!password) errors.password = "Vui lòng điền mật khẩu!";
    if (!email) errors.email = "Vui lòng điền email!";
    if (!so_dien_thoai) errors.so_dien_thoai = "Vui lòng điền số điện thoại!";

    // Validate length
    if (accountID && accountID.length < 6) {
      errors.accountID = "Account ID phải có ít nhất 6 ký tự!";
    }
    if (password && password.length < 6) {
      errors.password = "Mật khẩu phải có ít nhất 6 ký tự!";
    }

    // Validate accountID and password match
    if (accountID && password && accountID === password) {
      errors.password = "Mật khẩu không được trùng với Account ID!";
    }

    // Check for unique accountID
    const isAccountIDTaken = list.some(user => user.accountID === accountID && user.accountID !== (currentUser?.accountID));
    if (isAccountIDTaken) {
      errors.accountID = "Account ID đã tồn tại!";
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      errors.email = "Địa chỉ email không hợp lệ!";
    }

    // Validate phone number format
    const phoneRegex = /^[0-9]{10,15}$/;
    if (so_dien_thoai && !phoneRegex.test(so_dien_thoai)) {
      errors.so_dien_thoai = "Số điện thoại không hợp lệ! (10-15 chữ số)";
    }

    // If there are errors, set them and return
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      if (currentUser) {
        await axios.put(`http://localhost:8080/api/users/${currentUser.accountID}`, formData);
        setList(list.map(user => (user.accountID === currentUser.accountID ? { ...formData } : user)));
        setSnackbarMessage("Cập nhật người dùng thành công!");
      } else {
        const res = await axios.post('http://localhost:8080/api/users', formData);
        setList([...list, { ...formData, accountID: res.data.accountID }]);
        setSnackbarMessage("Thêm người dùng thành công!");
      }
      resetForm();
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Lỗi khi thêm/cập nhật người dùng:", error);
      setSnackbarMessage("Có lỗi xảy ra, vui lòng thử lại!");
      setSnackbarOpen(true);
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setFormData({
      accountID: user.accountID,
      hovaten: user.hovaten,
      password: '',
      hinh_anh: user.hinh_anh,
      vai_tro: user.vai_tro,
      so_dien_thoai: user.so_dien_thoai,
      email: user.email,
      dia_chi: user.dia_chi,
    });
  };

  const handleDelete = async (accountID) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${accountID}`);
      setList(list.filter(user => user.accountID !== accountID));
      setSnackbarMessage("Xóa người dùng thành công!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
      setSnackbarMessage("Có lỗi xảy ra khi xóa người dùng!");
      setSnackbarOpen(true);
    }
  };

  const resetForm = () => {
    setCurrentUser(null);
    setFormData({
      accountID: '',
      hovaten: '',
      password: '',
      hinh_anh: '',
      vai_tro: '',
      so_dien_thoai: '',
      email: '',
      dia_chi: '',
    });
    setFormErrors({});
  };

  const filteredData = list.filter(user => {
    const matchesSearchTerm =
      (user.hovaten && user.hovaten.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.accountID && user.accountID.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRoleFilter = roleFilter ? user.vai_tro === roleFilter : true;

    return matchesSearchTerm && matchesRoleFilter;
  });

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="md" className="form-container">
      <Paper elevation={5} className="form-paper">
        <Typography variant="h4" align="center" gutterBottom className="form-title">
          User Management Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="accountID"
                label="Account ID"
                variant="outlined"
                fullWidth
                required
                value={formData.accountID}
                onChange={handleInputChange}
                error={!!formErrors.accountID}
                helperText={formErrors.accountID}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="hovaten"
                label="Họ và tên"
                variant="outlined"
                fullWidth
                required
                value={formData.hovaten}
                onChange={handleInputChange}
                error={!!formErrors.hovaten}
                helperText={formErrors.hovaten}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                required
                value={formData.password}
                onChange={handleInputChange}
                error={!!formErrors.password}
                helperText={formErrors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="form-file-input"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="vai_tro"
                select
                label="Vai Trò"
                variant="outlined"
                fullWidth
                required
                value={formData.vai_tro}
                onChange={handleInputChange}
              >
                <MenuItem value="nhan_vien_kho">Nhân viên kho</MenuItem>
                <MenuItem value="nhan_vien_kinh_doanh">Nhân viên kinh doanh</MenuItem>
                <MenuItem value="nhan_vien_dang_bai">Nhân viên đăng bài</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="so_dien_thoai"
                label="Số Điện Thoại"
                variant="outlined"
                fullWidth
                value={formData.so_dien_thoai}
                onChange={handleInputChange}
                error={!!formErrors.so_dien_thoai}
                helperText={formErrors.so_dien_thoai}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                required
                value={formData.email}
                onChange={handleInputChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
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
                  {currentUser ? "UPDATE USER" : "ADD USER"}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={resetForm}
                  startIcon={<Restore />} // Icon added here
                >
                  RESET
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <TableContainer component={Paper} className="table-container">
        <Typography variant="h6" align="center" className="table-title">Submitted User Data</Typography>
        
        <Grid container spacing={2} style={{ display: 'flex', alignItems: 'center' }}>
          <Grid item xs={6}>
            <TextField
              className="input-field"
              label="Search"
              variant="outlined"
              fullWidth
              margin="normal"
              style={{ marginTop: '11px' }}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              className="input-field"
              select
              label="Filter by Role"
              variant="outlined"
              fullWidth
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="nhan_vien_kho">Nhân viên kho</MenuItem>
              <MenuItem value="nhan_vien_kinh_doanh">Nhân viên kinh doanh</MenuItem>
              <MenuItem value="nhan_vien_dang_bai">Nhân viên đăng bài</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Account ID</TableCell>
              <TableCell>Họ và tên</TableCell>
              <TableCell>Hình Ảnh</TableCell>
              <TableCell>Vai Trò</TableCell>
              <TableCell>Số Điện Thoại</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Địa Chỉ</TableCell>
              <TableCell>Mật Khẩu</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.accountID}</TableCell>
                <TableCell>{user.hovaten}</TableCell>
                <TableCell>
                  {user.hinh_anh ? <img src={user.hinh_anh} alt="Hình ảnh" style={{ width: 50, height: 50 }} /> : 'No Image'}
                </TableCell>
                <TableCell>{user.vai_tro}</TableCell>
                <TableCell>{user.so_dien_thoai}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.dia_chi}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(user)}>
                    <Edit />
                  </Button>
                  <Button onClick={() => handleDelete(user.accountID)}>
                    <Delete />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserForm;