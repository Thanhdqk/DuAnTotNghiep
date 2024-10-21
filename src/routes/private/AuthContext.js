// AuthContext.js
import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (accountID, password) => {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ accountID, password }),
    });

    if (response.ok) {
      const data = await response.json(); // Nhận dữ liệu từ server
      setIsAuthenticated(true); // Cập nhật trạng thái đăng nhập
      return data;
    } else {
      setIsAuthenticated(false);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const useAuth = () => useContext(AuthContext);
