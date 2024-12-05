import React, { useState } from "react";
import { Button, Box, Modal, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CLIENT_ID = "6623586a915b49cc85a591cc92bde415";
const REDIRECT_URI = "http://localhost:3000/callback";
const SCOPES = ["user-read-email", "user-read-private"];

const SpotifyPlayerComponent = () => {
  const Navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleSpotifyLogin = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${encodeURIComponent(SCOPES.join(" "))}`;

    const width = 500;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    const popup = window.open(
      authUrl,
      "Spotify Login",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    const interval = setInterval(() => {
      try {
        if (popup.location.hash) {
          const hash = popup.location.hash.substring(1);
          const params = new URLSearchParams(hash);
          const token = params.get("access_token");

          if (token) {
            setAccessToken(token);
            popup.close();
            clearInterval(interval);

            // Lấy thông tin người dùng sau khi có access token
            fetchUserData(token);
          }
        }
      } catch (err) {
        // Bỏ qua lỗi do cross-origin khi popup chưa hoàn thành
      }
    }, 1000);
  };

  const fetchUserData = async (token) => {
    const res = await axios({
      url: `https://api.spotify.com/v1/me`, method: "GET", headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    const username = encodeURIComponent(res.data.display_name); // hoặc dùng email/id nếu cần
    const userEmail = encodeURIComponent(res.data.email);
    const token1 = await axios({ url: `http://localhost:8080/api/users/spotifylogin?username=${username}&email=${userEmail}`, method: "GET" })

    setUserData(res.data);
   
    Navigate("/")
  }












  return (
   
     <div className="container">
    <div className="row">
      <div className="col-md-12 text-center">
      <button
        class="btn text-light btn-lg rounded spotify-button"
        style={{ backgroundColor: '#1DB954', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',minWidth:"400px" }}
        onClick={handleSpotifyLogin}
      >
        <i class="fab fa-spotify"></i>
        <span>Đăng nhập với Spotify</span>
      </button>
      </div>
    </div>
    {accessToken && userData && (
        <div>
          <h2>Welcome, {userData.display_name}</h2>
          <p>Email: {userData.email}</p>
          <img src={userData.images[0]?.url} alt="Profile" width="100" />
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
     </div>

      
   
  );
};

export default SpotifyPlayerComponent;
