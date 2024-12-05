import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SpotifyCallback = () => {
 

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
          <div className="text-center">
            <div className="spinner-border text-success mb-4" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted fs-5">Đang xử lý, vui lòng đợi...</p>
          </div>
        </div>
      );
};

export default SpotifyCallback;
