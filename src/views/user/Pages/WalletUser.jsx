import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    return <div style={errorMessageStyle}>Lỗi: {error}</div>;
  }

  if (!wallet) {
    return <div style={loadingMessageStyle}>Đang tải thông tin ví...</div>;
  }

  return (
    <div style={mainContainerStyle}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <Link to="/" style={linkStyle}>
          <h3>Quản Lý Cá Nhân</h3>
        </Link>
        <ul style={menuStyle}>
          {[
            "Thông tin cá nhân",
            "Lịch sử đặt hàng",
            "Đổi mật khẩu",
            "Feedback",
            "Yêu Thích",
            "Mã giảm giá",
            "Địa chỉ của bạn",
            "Ví đã liên kết",
          ].map((item, index) => (
            <li key={index}>
              <Link
                to={`/${item.replace(/ /g, "-").toLowerCase()}?userId=${userId}`}
                style={linkStyle}
              >
                <button style={buttonStyle}>{item}</button>
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main style={mainContentStyle}>
  <h2 style={headerStyle}>Thông tin ví PayPal</h2>
  <div style={cardStyle}>
    <div style={cardHeaderStyle}>
      <img
        src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg"
        alt="PayPal Logo"
        style={iconStyle}
      />
      <h3 style={cardTitleStyle}>Thông tin người dùng</h3>
    </div>
    <div style={cardBodyStyle}>
      <div style={infoRowStyle}>
        <span style={infoLabelStyle}>Họ và tên:</span>
        <span style={infoValueStyle}>{wallet.users?.hovaten || "Không có dữ liệu"}</span>
      </div>
      <div style={infoRowStyle}>
        <span style={infoLabelStyle}>Email:</span>
        <span style={infoValueStyle}>{wallet.users?.accountID || "Không có dữ liệu"}</span>
      </div>
      <div style={infoRowStyle}>
        <span style={infoLabelStyle}>Số tài khoản:</span>
        <span style={infoValueStyle}>{wallet.so_tai_khoan}</span>
      </div>
      {/* <div style={infoRowStyle}>
        <span style={infoLabelStyle}>Số dư:</span>
        <span style={infoValueStyle}>
          {wallet.so_du ? wallet.so_du.toLocaleString("vi-VN") + " VND" : "Không có dữ liệu"}
        </span>
      </div> */}
    </div>
  </div>
</main>

    </div>
  );
};

// CSS Styles
const mainContainerStyle = {
  display: "flex",
  height: "100vh",
  fontFamily: "Arial, sans-serif",
};

const sidebarStyle = {
  width: "250px",
  backgroundColor: "#2c3e50",
  color: "#fff",
  padding: "20px",
  boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
};

const linkStyle = {
  textDecoration: "none",
  color: "white",
};

const menuStyle = {
  listStyleType: "none",
  padding: "0",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#34495e",
  color: "white",
  border: "none",
  textAlign: "left",
  cursor: "pointer",
  fontSize: "16px",
  marginBottom: "10px",
  borderRadius: "5px",
  transition: "background-color 0.3s",
};

const mainContentStyle = {
  flex: 1,
  padding: "40px",
  backgroundColor: "#ecf0f1",
};

const walletInfoStyle = {
  backgroundColor: "white",
  borderRadius: "5px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  maxWidth: "500px",
  margin: "0 auto",
};

const errorMessageStyle = {
  textAlign: "center",
  marginTop: "20%",
  fontSize: "18px",
  color: "red",
};

const loadingMessageStyle = {
  textAlign: "center",
  marginTop: "20%",
  fontSize: "18px",
  color: "#34495e",
};

  
  const headerStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: "20px",
  };
  
  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
    width: "100%",
    padding: "20px",
  };
  
  const cardHeaderStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  };
  
  const iconStyle = {
    width: "40px",
    height: "40px",
    marginRight: "10px",
  };
  
  const cardTitleStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#34495e",
  };
  
  const cardBodyStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };
  
  const infoRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #ecf0f1",
    padding: "10px 0",
  };
  
  const infoLabelStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#7f8c8d",
  };
  
  const infoValueStyle = {
    fontSize: "16px",
    color: "#34495e",
  };
  
export default Wallet;
