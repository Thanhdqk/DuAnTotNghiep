import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from '../partials/Sidebar';

const Wallet = () => {
  const [wallet, setWallet] = useState(null);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId"); // Lấy userId từ localStorage

  useEffect(() => {
    if (!userId) {
      setError("Không tìm thấy thông tin người dùng.");
      return;
    }
    fetchWallet(userId);
  }, [userId]);

  const fetchWallet = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/wallets/${userId}`);
      if (!response.ok) throw new Error("Không thể lấy thông tin ví.");
      const data = await response.json();
      setWallet(data);
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return (
      <div className="d-flex vh-100">
        <div className="col-2">
          <Sidebar userId={userId} />
        </div>
        <main className="flex-grow-1 d-flex justify-content-center align-items-center">
          <div className="text-center text-danger">{error}</div>
        </main>
      </div>
    );
  }

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div className="col-2">
        <Sidebar userId={userId} />
      </div>

      {/* Main Content */}
      <main className="flex-grow-1 align-items-center bg-light">
        <div className="card shadow" style={{ maxWidth: "500px", width: "100%" }}>
          <div className="card-header bg-white d-flex align-items-center">
            <img
              src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg"
              alt="PayPal Logo"
              style={{ width: "40px", height: "40px", marginRight: "10px" }}
            />
            <h3 className="mb-0 text-dark">Thông tin người dùng</h3>
          </div>
          <div className="card-body">
            <div className="mb-3 d-flex justify-content-between border-bottom pb-2">
              <span className="fw-bold text-muted">Họ và tên:</span>
              <span className="text-dark">{wallet?.users?.hovaten || "Không có dữ liệu"}</span>
            </div>
            <div className="mb-3 d-flex justify-content-between border-bottom pb-2">
              <span className="fw-bold text-muted">Email:</span>
              <span className="text-dark">{wallet?.users?.accountID || "Không có dữ liệu"}</span>
            </div>
            <div className="mb-3 d-flex justify-content-between border-bottom pb-2">
              <span className="fw-bold text-muted">Số tài khoản:</span>
              <span className="text-dark">{wallet?.so_tai_khoan || "Không có dữ liệu"}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Wallet;
