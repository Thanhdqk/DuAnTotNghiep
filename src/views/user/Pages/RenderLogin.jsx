import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
const RenderLogin = () => {

  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Lấy token từ localStorage
    const token = localStorage.getItem("userToken");
    if (token) {
      // Giải mã token và lấy tên người dùng
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);
      
      // Giả sử 'name' là thông tin trong payload của token, hoặc dùng 'sub' nếu là ID người dùng
      setUserName(decodedToken.name || decodedToken.sub);
    }
  }, []);

  // Hàm render chào mừng hoặc yêu cầu đăng nhập
  const renderUserGreeting = () => {
    if (userName) {
      return <><h2>Chào, {userName}!</h2>
      <button className='btn btn-danger ms-5'  onClick={()=>{
        localStorage.removeItem("userToken")
        setUserName("")
      }}>logout</button></>; // Render tên người dùng
    } else {
      return <p>Vui lòng đăng nhập</p>; // Nếu chưa đăng nhập
    }
  };
  return (
    <div> {renderUserGreeting()}</div>
  )
}

export default RenderLogin