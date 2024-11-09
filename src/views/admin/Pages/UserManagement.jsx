import React, { useEffect, useState } from "react";
import axios from "axios";
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
  Tabs,
  Tab,
  AppBar,
} from "@mui/material";
import { Add, Search, Edit, Delete, Restore } from "@mui/icons-material";
import "./UserForm.css";

const UserForm = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [list, setList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    accountID: "",
    hovaten: "",
    password: "",
    hinh_anh: "",
    vai_tro: "",
    so_dien_thoai: "",
    dia_chi: "",
    trang_thai_xoa: "",
    previewUrl: "",
    hanh_dong:"",
  });

  const [formErrors, setFormErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/users");
      console.log(res.data); // Kiểm tra dữ liệu trả về từ API
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
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);

    setFormData((prevData) => ({
      ...prevData,
      hinh_anh: file,
      previewUrl: imageUrl,
    }));
  };

  const validateForm = () => {
    const { accountID, hovaten, password, so_dien_thoai, dia_chi,trang_thai_xoa } =
      formData;
    let errors = {};

    if (!accountID) errors.accountID = "Account ID không được để trống!";
    else if (!/\S+@\S+\.\S+/.test(accountID))
      errors.accountID = "Account ID không hợp lệ!";

    if (!hovaten) errors.hovaten = "Họ và tên không được để trống!";
    if (!password) errors.password = "Mật khẩu không được để trống!";
    else if (password.length < 5 || password.length > 9)
      errors.password = "Mật khẩu phải từ 5 đến 9 ký tự!";

    if (!so_dien_thoai)
      errors.so_dien_thoai = "Số điện thoại không được để trống!";
    else if (!/^0\d{9,13}$/.test(so_dien_thoai))
      errors.so_dien_thoai = "Số điện thoại phải có từ 10 đến 15 ký tự số";
    else if (/[^0-9]/.test(so_dien_thoai))
      errors.so_dien_thoai =
        "Số điện thoại không được chứa ký tự chữ cái hoặc ký tự đặc biệt!";

    if (!dia_chi) errors.dia_chi = "Địa chỉ không được để trống!";
    else if (dia_chi.length < 10 || dia_chi.length > 50)
      errors.dia_chi = "Địa chỉ phải từ 10 đến 50 ký tự!";
    if (!trang_thai_xoa) errors.trang_thai_xoa = "Trạng thái xóa không được để trống!";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "previewUrl") formDataToSend.append(key, value);
    });

    try {
      const isUpdating = Boolean(currentUser);
      const url = isUpdating
        ? `http://localhost:8080/api/users/${currentUser.accountID}`
        : "http://localhost:8080/api/users";
      const method = isUpdating ? "PUT" : "POST";

      const response = await axios({
        method,
        url,
        data: formDataToSend,
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });

      if (response.status === 200 || response.status === 201) {
        const successMessage = isUpdating
          ? "Cập nhật người dùng thành công!"
          : "Thêm người dùng thành công!";
        setSnackbarMessage(successMessage);

        setList((prevList) =>
          isUpdating
            ? prevList.map((user) =>
                user.accountID === currentUser.accountID
                  ? { ...formData, accountID: currentUser.accountID }
                  : user
              )
            : [
                ...prevList,
                {
                  ...formData,
                  accountID: response.data.accountID,
                  hinh_anh: response.data.hinh_anh,
                },
              ]
        );

        setSnackbarOpen(true);
        fetchUsers();
        resetForm();
        setTabValue(0);
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi gửi yêu cầu:", error);
      const errorMessage =
        error.response?.data?.message || "Có lỗi không xác định.";
      setSnackbarMessage(`Lỗi: ${errorMessage}`);
      setSnackbarOpen(true);
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    console.log('cc',user);
    setFormData({
      accountID: user.accountID,
      hovaten: user.hovaten,
      password: user.password,
      hinh_anh: user.hinh_anh,
      vai_tro: user.roles[0].ten_vai_tro,
      so_dien_thoai: user.so_dien_thoai,
      trang_thai_xoa:user.trang_thai_xoa,
      dia_chi: user.diachi[0].dia_chi,
      previewUrl: user.hinh_anh, // Giả định có URL hình ảnh
      hanh_dong: user.hanh_dong,
    });
    setTabValue(1);
  };
  const handleRestore = async (user) => {
    const {accountID} = user;
    console.log('id',accountID)
    try {
        // Giả định API khôi phục người dùng
        await axios.get(`http://localhost:8080/api/users/back/${accountID}`);
        setSnackbarMessage("Khôi phục người dùng thành công!");
        setSnackbarOpen(true);
        fetchUsers(); // Cập nhật danh sách người dùng sau khi khôi phục
        setTabValue(0);
    } catch (error) {
        console.error("Lỗi khi khôi phục người dùng:", error);
        setSnackbarMessage("Có lỗi xảy ra khi khôi phục người dùng!");
        setSnackbarOpen(true);
    }
};


const handlechange1 = async (user) => {
  try {
    setCurrentUser(user);
  console.log('cc',user);
 const {accountID} = user;
 console.log('ccccc',accountID)
 const res = await axios({url:`http://localhost:8080/api/users/delete/${accountID}`,method:'GET'})
 setList((prevList) => prevList.filter((user) => user.accountID !== accountID));

    setSnackbarMessage("Xóa người dùng thành công!");
    setSnackbarOpen(true);
    
    // Chuyển sang tab thứ ba nếu cần
    setTabValue(0);
  } catch (error) {
    console.error("Lỗi khi xóa người dùng:", error);
    setSnackbarMessage("Có lỗi xảy ra khi xóa người dùng!");
    setSnackbarOpen(true);
  }
  
};



const handleDelete = async (accountID) => {
  try {
    await axios.delete(`http://localhost:8080/api/users/${accountID}`);
    
    // Cập nhật danh sách người dùng trong state
    setList((prevList) => prevList.filter((user) => user.accountID !== accountID));

    setSnackbarMessage("Xóa người dùng thành công!");
    setSnackbarOpen(true);
    
    // Chuyển sang tab thứ ba nếu cần
  } catch (error) {
    console.error("Lỗi khi xóa người dùng:", error);
    setSnackbarMessage("Có lỗi xảy ra khi xóa người dùng!");
    setSnackbarOpen(true);
  }
};

  const resetForm = async () => {
    
    setCurrentUser(null);
    setFormData({
      accountID: "",
      hovaten: "",
      password: "",
      hinh_anh: "",
      vai_tro: "",
      so_dien_thoai: "",
      dia_chi: "",
      trang_thai_xoa:"",
      previewUrl: "",
    });
    setFormErrors({});
    
  };
  console.log(formData)

  const filteredData = list.filter((user) => {
    const matchesSearchTerm =
      (user.hovaten &&
        user.hovaten.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.accountID &&
        user.accountID.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesRoleFilter = roleFilter 
        ? user.roles?.some(role => role.ten_vai_tro === roleFilter) 
        : true;
      const setTrangThaiXoa = user.trang_thai_xoa === null



    return matchesSearchTerm && matchesRoleFilter && setTrangThaiXoa;
  });

  const filteredDataXoa = list.filter((user) => {
    const matchesSearchTerm =
      (user.hovaten &&
        user.hovaten.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.accountID &&
        user.accountID.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesRoleFilter = roleFilter 
        ? user.roles?.some(role => role.ten_vai_tro === roleFilter) 
        : true;
      const setTrangThaiXoa = user.trang_thai_xoa === "Xóa"



    return matchesSearchTerm && matchesRoleFilter && setTrangThaiXoa;
  });

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  

  return (
    <Container maxWidth="xl" className="form-container">
      <Paper elevation={5} className="form-paper">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          className="form-title"
        >
          User Management
        </Typography>

        <AppBar position="static" color="default">
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Danh Sách Người Dùng" />
            <Tab label="Thêm Người Dùng" />
            <Tab label="Lịch Sử Xóa" />
            <Tab label="Trạng Thái Hành Động" />
          </Tabs>
        </AppBar>

        {tabValue === 0 && (
          <TableContainer component={Paper} className="table-container">
            <Typography variant="h6" align="center" className="table-title">
              Submitted User Data
            </Typography>
            <Grid container spacing={2} style={{ alignItems: "center" }}>
              <Grid item xs={6}>
                <TextField
                  className="input-field"
                  label="Search"
                  variant="outlined"
                  fullWidth
                  margin="normal"
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
                  margin="normal"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Nhân Viên Kho">Nhân viên kho</MenuItem>
                  <MenuItem value="Nhân Viên Kinh Doanh">
                    Nhân viên kinh doanh
                  </MenuItem>
                  <MenuItem value="Nhân Viên Đăng Bài">
                    Nhân viên đăng bài
                  </MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <Table>
              <TableHead>
                <TableRow className="table-row-header">
                  <TableCell>Account ID</TableCell>
                  <TableCell>Họ và tên</TableCell>
                  <TableCell>Hình Ảnh</TableCell>
                  <TableCell>Vai Trò</TableCell>
                  <TableCell>Số Điện Thoại</TableCell>
                  <TableCell>Địa Chỉ</TableCell>
                  <TableCell>Mật Khẩu</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user, index) => (
                    <TableRow key={index}>
                      <TableCell>{user.accountID}</TableCell>
                      <TableCell>{user.hovaten}</TableCell>
                      <TableCell>
                        {user.hinh_anh ? (
                          <img
                            src={`/images/${user.hinh_anh}`}
                            alt="Hình ảnh"
                            style={{ width: 50, height: 50 }}
                          />
                        ) : (
                          "No Image"
                        )}
                      </TableCell>
                      <TableCell>{user?.roles[0]?.ten_vai_tro}</TableCell>
                      {/* Hiển thị vai trò */}
                      <TableCell>{user.so_dien_thoai}</TableCell>
                      <TableCell>{user?.diachi[0]?.dia_chi}</TableCell>
                      {/* Hiển thị địa chỉ */}
                      
                      <TableCell>{user.password}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleEdit(user)}>
                          <Edit />
                        </Button>
                        <Button
                    onClick={() => {
                        handlechange1(user); // Call the edit function
                        setTabValue(2); // Switch to tab 2
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
        )}

        {tabValue === 1 && (
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
                  label="Mật Khẩu"
                  type="password"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  error={!!formErrors.password}
                  helperText={formErrors.password}
                />
              </Grid>
                          <Grid item xs={12}>
              <TextField
                name="trang_thai_xoa"
                select
                label="Trang Thái Xóa"
                variant="outlined"
                fullWidth
                required
                value={formData.trang_thai_xoa}
                error={!!formErrors.trang_thai_xoa}
                onChange={handleInputChange}
              >
                <MenuItem value="Chưa Xóa">Chưa Xóa</MenuItem>
              </TextField>
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
                  <MenuItem value="">Chọn vai trò</MenuItem>
                  <MenuItem value="Nhân Viên Kho">Nhân viên kho</MenuItem>
                  <MenuItem value="Nhân Viên Kinh Doanh">
                    Nhân viên kinh doanh
                  </MenuItem>
                  <MenuItem value="Nhân Viên Đăng Bài">
                    Nhân viên đăng bài
                  </MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                </TextField>
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
                  error={!!formErrors.so_dien_thoai}
                  helperText={formErrors.so_dien_thoai}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="dia_chi"
                  label="Địa Chỉ"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.dia_chi}
                  onChange={handleInputChange}
                  error={!!formErrors.dia_chi}
                  helperText={formErrors.dia_chi}
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
                {formData.previewUrl ? (
                  <img
                    src={formData.previewUrl}
                    alt="Hình ảnh đã chọn"
                    style={{ width: 50, height: 50 }}
                  />
                ) : (
                  "No Image"
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
                    {currentUser ? "CẬP NHẬT NGƯỜI DÙNG" : "THÊM NGƯỜI DÙNG"}
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
      {tabValue === 2 && (
  <TableContainer component={Paper} className="table-container">
    <Typography variant="h6" align="center" className="table-title">
      Lịch Sử Xóa
    </Typography>
    <Grid container spacing={2} style={{ alignItems: "center" }}>
      <Grid item xs={6}>
        <TextField
          className="input-field"
          label="Search"
          variant="outlined"
          fullWidth
          margin="normal"
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
          margin="normal"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Nhân Viên Kho">Nhân viên kho</MenuItem>
          <MenuItem value="Nhân Viên Kinh Doanh">Nhân viên kinh doanh</MenuItem>
          <MenuItem value="Nhân Viên Đăng Bài">Nhân viên đăng bài</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
        </TextField>
      </Grid>
    </Grid>

    <Table>
      <TableHead>
        <TableRow className="table-row-header">
          <TableCell>Account ID</TableCell>
          <TableCell>Họ và tên</TableCell>
          <TableCell>Hình Ảnh</TableCell>
          <TableCell>Vai Trò</TableCell>
          <TableCell>Số Điện Thoại</TableCell>
          <TableCell>Địa Chỉ</TableCell>
          <TableCell>Mật Khẩu</TableCell>
          <TableCell>Trạng Thái Xóa</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredDataXoa
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.accountID}</TableCell>
              <TableCell>{user.hovaten}</TableCell>
              <TableCell>
                {user.hinh_anh ? (
                  <img
                    src={`/images/${user.hinh_anh}`}
                    alt="Hình ảnh"
                    style={{ width: 50, height: 50 }}
                  />
                ) : (
                  "No Image"
                )}
              </TableCell>
              <TableCell>{user?.roles[0]?.ten_vai_tro}</TableCell>
              <TableCell>{user.so_dien_thoai}</TableCell>
              <TableCell>{user?.diachi[0]?.dia_chi}</TableCell>
              <TableCell>{user.password}</TableCell>
              <TableCell>{user.trang_thai_xoa}</TableCell>
              <TableCell>
                <Button onClick={() => handleRestore(user)}>
                  <Restore />
                </Button>
                <Button
                  onClick={() => handleDelete(user.accountID)}
                  sx={{ color: "secondary" }}
                >
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
)}
  {tabValue === 3 && (
          <TableContainer component={Paper} className="table-container">
            <Typography variant="h6" align="center" className="table-title">
              Submitted User Data
            </Typography>
            <Grid container spacing={2} style={{ alignItems: "center" }}>
              <Grid item xs={6}>
                <TextField
                  className="input-field"
                  label="Search"
                  variant="outlined"
                  fullWidth
                  margin="normal"
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
                  margin="normal"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Nhân Viên Kho">Nhân viên kho</MenuItem>
                  <MenuItem value="Nhân Viên Kinh Doanh">
                    Nhân viên kinh doanh
                  </MenuItem>
                  <MenuItem value="Nhân Viên Đăng Bài">
                    Nhân viên đăng bài
                  </MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <Table>
              <TableHead>
                <TableRow className="table-row-header">
                  <TableCell>Account ID</TableCell>
                  <TableCell>Họ và tên</TableCell>
                  <TableCell>Hình Ảnh</TableCell>
                  <TableCell>Vai Trò</TableCell>
                  <TableCell>Số Điện Thoại</TableCell>
                  <TableCell>Địa Chỉ</TableCell>
                  <TableCell>Mật Khẩu</TableCell>
                  <TableCell>Trạng Thái Xóa</TableCell>
                  <TableCell>Hành Động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user, index) => (
                    <TableRow key={index}>
                      <TableCell>{user.accountID}</TableCell>
                      <TableCell>{user.hovaten}</TableCell>
                      <TableCell>
                        {user.hinh_anh ? (
                          <img
                            src={`/images/${user.hinh_anh}`}
                            alt="Hình ảnh"
                            style={{ width: 50, height: 50 }}
                          />
                        ) : (
                          "No Image"
                        )}
                      </TableCell>
                      <TableCell>{user?.roles[0]?.ten_vai_tro}</TableCell>
                      {/* Hiển thị vai trò */}
                      <TableCell>{user.so_dien_thoai}</TableCell>
                      <TableCell>{user?.diachi[0]?.dia_chi}</TableCell>
                      {/* Hiển thị địa chỉ */}
                      
                      <TableCell>{user.password}</TableCell>
                      <TableCell>{user.trang_thai_xoa == null ? 'Chưa Xóa' : user.trang_thai_xoa}</TableCell>
                      <TableCell>{user.hanh_dong}</TableCell>
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
        )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserForm;