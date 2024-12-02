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
  ListItemText,
  Checkbox,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';

import FormControl from '@mui/material/FormControl';

import Chip from '@mui/material/Chip';
import { Add, Restore, Edit, Delete } from "@mui/icons-material";
import "./BannerManager.css";


const BannerManager = () => {
  const userid = localStorage.getItem("account_id");
  const [personName, setPersonName] = React.useState([]);
  const [product_discount2, setproduct_discount2] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [addorupdate, setaddorupdate] = useState("");
  const [formData, setFormData] = useState({
    bannerId: "",
    hinhAnh: null,
    hoatDong: "",
    ngayTao: "",
    ngayHetHan: "",
    trangThaiXoa: "",
    accountId: "",
    hanh_dong: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [deletedSearchTerm, setDeletedSearchTerm] = useState("");
  const [deletedFilterStatus, setDeletedFilterStatus] = useState("Tất cả");
  const [banners, setBanners] = useState([]);
  const [deletedBanners, setDeletedBanners] = useState([]);
  const [listDataHd, setlistDataHD] = useState([]);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    var temparray = [];
    temparray.push({ 'san_phamId': value });
    
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );


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

const [product_discount, setproduct_discount] = useState([]);
const fetchProductHasDiscount = async () => {
    try {
      const res = await axios({ url: 'http://localhost:8080/api/banners/findalldanhmuc', method: 'GET' })
      setproduct_discount(res.data);
      console.log('fetch data', res.data);
    } catch (error) {
      console.error(error);
    }

  }
  const options = product_discount.map((item) => ({
    value: item.danh_mucId,
    label: item.ten_loaiDM
  }))
  let options2 = product_discount2.map((item) => ({
    value: item.danh_mucId,
    label: item.ten_loaiDM
  }))
  const apilistDataHd = async () => {
    const res = await axios({
      url: "http://localhost:8080/api/banners/bannerhanhdong",
      method: "GET",
    });
    setlistDataHD(res.data);
    console.log("sdsadsadfas", res.data);
  };
  const getnewID = async() =>{
    const res = await axios({url:"http://localhost:8080/api/banners/generateNewBannerId",method:"GET"})
    if(formData.bannerId == "")
      {
        formData.bannerId = res.data
      }
    
    console.log("ress",res.data)
  }
  const fetchBanners = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/banners/findall");
      setBanners(response.data);
      console.log(response.data);
    } catch (error) {
      handleSnackbar("Có lỗi xảy ra khi lấy danh sách banner!", "error");
    }
  };


  useEffect(() => {
    fetchBanners();
    fetchDeletedBanners();
    fetchProductHasDiscount()
    
    if(formData.bannerId == "")
    {

      getnewID()


    }
  }, [formData.bannerId]);

 
  const fetchDeletedBanners = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/banners/findall"); // Cập nhật nếu cần
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
      hanh_dong: "",
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
    const matchesSearch = (post.bannerId?.toLowerCase() || "").includes(
      searchTerm.toLowerCase()
    );
    const matchesFilter =
      filterStatus === "Tất cả" || post.hoat_dong === filterStatus;
    const trangThaiXoa = post.trang_thai_xoa === null
    return matchesSearch && matchesFilter && trangThaiXoa;
  });

  console.log("post chưa xóa nè: ", filteredPosts);

  // const filteredDeletedBannerss = banners.filter((banner) => {
  //   const matchesSearch = (banner.nha_cung_capID?.toLowerCase() || "").includes(
  //     searchTerm.toLowerCase()
  //   );

  //   const isDeleted = banner.trang_thai_xoa === "Đã Xóa";

  //   return  isDeleted && matchesSearch; // Filtering out deleted suppliers
  // });

  const filteredDeletedBannerss = banners.filter((post) => {
    const matchesSearch = (post.bannerId?.toLowerCase() || "").includes(
      searchTerm.toLowerCase()
    );
    const matchesFilter =
      filterStatus === "Tất cả" || post.hoat_dong === filterStatus;
    const trangThaiXoa = post.trang_thai_xoa === "Đã xóa"
    return matchesSearch && matchesFilter && trangThaiXoa;
  });

  console.log("post đã xóa nè: ", filteredDeletedBannerss)
  
  const handleEdit = (post) => {
    console.log(post)
    setFormData({
      bannerId: post.bannerId,
      hinhAnh: post.hinhAnh,
      hoatDong: post.hoat_dong,
      ngayTao: post.ngay_tao,
      ngayHetHan: post.ngay_het_han,
      trangThaiXoa:post.trangThaiXoa,
      accountId: post.accountID,
      hanh_dong: post.hanh_dong,



    });
    setTabValue(1);
    setaddorupdate("add")
    console.log("Dữ liệu khi nhấn edit: ", post);
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
    console.log(formData)
    e.preventDefault();
    
    const formDataToSend = new FormData();
   
    console.log("bannerId: ", formData.bannerId);
    console.log("bannerIdccccc: ",personName);
/*     const existingBannerIds = await fetchExistingBannerIds(); */
    const bannerId = formData.bannerId;
    formDataToSend.append("bannerId",  formData.bannerId.toString());
    formData.trangThaiXoa = "Chưa xóa"
    // Kiểm tra bắt buộc nhập
    if (!bannerId || bannerId.trim() === "") {
        setErrors((prevErrors) => ({
            ...prevErrors,
            bannerId: "Mã banner là bắt buộc!"
        }));
        return;
    }
   /*  if (existingBannerIds.includes(bannerId)) {
      setErrors((prevErrors) => ({
          ...prevErrors,
          bannerId: "Mã banner đã tồn tại!",
      }));
      return;
  } */

    // Kiểm tra không chứa tiếng Việt
    const regexVi = /[àáảãạăắặằẳẵâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ]/i;
    if (regexVi.test(bannerId)) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            bannerId: "Mã banner không được chứa tiếng Việt!"
        }));
        return;
    }

    formDataToSend.append("hoat_dong", formData.hoatDong);
    const hoatDong = formData.hoatDong;

    // Kiểm tra bắt buộc nhập
    if (!hoatDong || hoatDong.trim() === "") {
        setErrors((prevErrors) => ({
            ...prevErrors,
            hoatDong: "Hành động là bắt buộc!"
        }));
        return;
    }
 
    formDataToSend.append("trang_thai_xoa", formData.trangThaiXoa);
 
    formDataToSend.append("id", userid);
    formDataToSend.append("hanh_dong", formData.hanh_dong);
    const ngayTao = new Date (formData.ngayTao);
    const ngayHetHan = new Date(formData.ngayHetHan);
    const ngayTaoFormatted = ngayTao.toISOString().split('T')[0]; // 'YYYY-MM-DD'
    const ngayHetHanFormatted = ngayHetHan.toISOString().split('T')[0]; // 'YYYY-MM-DD'

    formDataToSend.append("ngay_tao", ngayTaoFormatted);
    formDataToSend.append("ngay_het_han", ngayHetHanFormatted);
    formDataToSend.append("san_pham", personName);
    let isValid = true;
    const newErrors = {};
  
    if (ngayHetHan <= ngayTao) {
      newErrors.ngayHetHan = "Ngày hết hạn phải lớn hơn ngày tạo.";
      isValid = false;
    }
  
    setErrors(newErrors);
  
    if (!isValid) {
      return;
    }
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
if(addorupdate !="add")
{
  await axios.post("http://localhost:8080/api/banners/add", formDataToSend);
        handleSnackbar("Thêm banner thành công!", "success");
}
else{
  await axios.put("http://localhost:8080/api/banners/put", formDataToSend);
  handleSnackbar("Cập nhật banner thành công!", "success");
 
}
    try {
      
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
            <Tab
              onClick={() => {
                fetchBanners();
              }}
              label="Lịch Sử Xóa"
            />
            <Tab
              onClick={() => {
                apilistDataHd();
              }}
              label=" Hành Động"
            />
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
              <Grid item xs={12} sm={6}>
                
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
                            ? "Chưa xóa"
                            : post.trang_thai_xoa}
                        </TableCell>
                        <TableCell>
                          {post.accountID}
                        </TableCell>
                        <TableCell>
                          <Button onClick={() =>{ handleEdit(post)
                            console.log('cc',post)
                          }}>
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
      {/* Mã Banner */}
      <Grid item xs={12}>
        <TextField
          name="bannerId"
          label="Mã Banner"
          variant="outlined"
          fullWidth
          disabled
          value={formData.bannerId}
          error={!!errors.bannerId}
          helperText={errors.bannerId}
          onChange={handleInputChange}
        />
      </Grid>

      {/* Ngày Tạo */}
      <Grid item xs={12} sm={6}>
        <TextField
          name="ngayTao"
          label="Ngày Tạo"
          variant="outlined"
          fullWidth
          type="date"
          value={formData.ngayTao}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      {/* Ngày Hết Hạn */}
      <Grid item xs={12} sm={6}>
        <TextField
          name="ngayHetHan"
          label="Ngày Hết Hạn"
          variant="outlined"
          fullWidth
          type="date"
          value={formData.ngayHetHan}
          onChange={handleInputChange}
          error={!!errors.ngayHetHan}
          helperText={errors.ngayHetHan}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      {/* Trạng Thái Hoạt Động */}
      <Grid item xs={12}>
        <TextField
          name="hoatDong"
          select
          label="Trạng Thái Hoạt Động"
          variant="outlined"
          fullWidth
          value={formData.hoatDong}
          error={!!errors.hoatDong}
          helperText={errors.hoatDong}
          onChange={handleInputChange}
        >
          <MenuItem value="">
            <em>Chọn trạng thái hoạt động</em>
          </MenuItem>
          <MenuItem value="Hoạt động">Hoạt động</MenuItem>
          <MenuItem value="Ngừng hoạt động">Ngừng hoạt động</MenuItem>
        </TextField>
      </Grid>

      {/* Danh sách sản phẩm */}
      <Grid item xs={12}>
        <FormControl sx={{ width: '100%' }}>
          <InputLabel id="demo-multiple-checkbox-label">Sản phẩm</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="Sản phẩm" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {options2.length === 0
              ? options.map((name) => (
                  <MenuItem key={name.label} value={name.value}>
                    <Checkbox checked={personName.includes(name.value)} />
                    <ListItemText primary={name.label} />
                  </MenuItem>
                ))
              : options2.map((name) => (
                  <MenuItem key={name.label} value={name.value}>
                    <Checkbox checked={personName.includes(name.value)} />
                    <ListItemText primary={name.label} />
                  </MenuItem>
                ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Hình Ảnh */}
      <Grid item xs={12}>
        <input
          type="file"
          accept="images/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="upload-button"
        />
        <label htmlFor="upload-button">
          <Button variant="contained" component="span" fullWidth>
            Tải lên Hình Ảnh
          </Button>
        </label>
      </Grid>

      <Grid item xs={12}>
        {formData.hinhAnh && (
          <img
            src={URL.createObjectURL(formData.hinhAnh)}
            alt="Hình ảnh đã chọn"
            style={{ width: 100, height: 100, objectFit: "cover" }}
          />
        )}
      </Grid>

      {/* Buttons */}
      <Grid item xs={12} container spacing={2}>
        <Grid item xs={6}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<Add />}
          >
            {addorupdate === "add" ? "CẬP NHẬT BANNER" : "THÊM BANNER"}
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
                  {filteredDeletedBannerss.map((post) => (
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
                       {post.accountID}
                     </TableCell>
                     <TableCell>
                     <Button
                          onClick={() => handleRestore(post.bannerId)}
                          sx={{ color: "primary", marginRight: 1 }}
                          startIcon={<Restore />}
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
                
                    <TableCell>Nhật Kí Hành Động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listDataHd
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((post) => (
                      <TableRow key={post.bannerId}>
                        <TableCell>{post.banner.bannerId}</TableCell>
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
                        <TableCell>{post.banner.hoat_dong}</TableCell>
                        <TableCell>{post.banner.ngay_tao}</TableCell>
                        <TableCell>{post.banner.ngay_het_han}</TableCell>
                       
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
