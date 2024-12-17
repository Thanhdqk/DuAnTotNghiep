import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";
import { jwtDecode } from "jwt-decode";
//import ProfileImg from "../../../assets/images/thanhne1.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const danhSachThongTinCaNhan = async (accountid) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/lietKe/thongTinCaNhan/theoId/${accountid}`
      );
      const hinhAnhDay = response.data[0].hinhAnh;
      console.log("Hình ảnh đây: ", hinhAnhDay);
      setUserData(hinhAnhDay);
      console.log("Danh sách nè trời: ", response.data);
    } catch {}
  };
  useEffect(() => {
    // const storedData = JSON.parse(localStorage.getItem("data"));
    const accountIDNe = jwtDecode(localStorage.getItem("jwtToken")).sub;
    console.log("accountIDNe nè: ", accountIDNe);
    danhSachThongTinCaNhan(accountIDNe);
    // if (hinhAnhNe) {
    //   setUserData(hinhAnhNe);
    // }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("data");
    navigate("/login");
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={`http://localhost:8080/images/${userData}`}
          alt="Null"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        {/* <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          <ListItemText>My Account</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconListCheck width={20} />
          </ListItemIcon>
          <ListItemText>My Tasks</ListItemText>
        </MenuItem> */}
        <Box mt={1} py={1} px={2}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
