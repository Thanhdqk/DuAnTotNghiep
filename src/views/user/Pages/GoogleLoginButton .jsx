import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const clientId = "694438456913-12c78ajrhf5evish0tgl217gl8uuk8e4.apps.googleusercontent.com"; // Thay YOUR_GOOGLE_CLIENT_ID bằng Client ID của bạn

  const handleSuccess = (response) => {
    console.log('GitHub login successful:', response);
  };

  const handleFailure = (error) => {
    console.log('GitHub login failed:', error);
  };

  const handleLoginSuccess = async (response) => {
    console.log('Login success:', response);
    const res = jwtDecode(response?.credential)
    console.log('data', res)


    const userData = {
      accountID: res.sub,
      hovaten: res.name,
      hinh_anh: res.picture,
      so_dien_thoai: "",
      hoat_dong: "active",
      email: res.email
    };

    try {
      const res = await axios.post("http://localhost:8080/api/users/login", null, {
        params: userData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      console.log("User saved:", res.data);
      localStorage.setItem("userToken", response.credential);
      navigate("/success")
    } catch (error) {
      console.error("Error saving user:", error);
    }

  };

  const handleLoginFailure = (error) => {
    console.error('Login failed:', error);
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <GoogleOAuthProvider clientId={clientId}>
            <div className="GoogleLoginButton">
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}

                className="google"
                style={{
                  width: '150px',
                  height: '40px',
                  fontSize: '12px',
                }}
              />
            </div>
          </GoogleOAuthProvider>

          

         


          <GitHubLoginButton></GitHubLoginButton>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};

export default GoogleLoginButton;
