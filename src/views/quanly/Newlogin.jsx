import "../../vendor/bootstrap/css/bootstrap.min.css";
import "../../fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../../fonts/Linearicons-Free-v1.0.0/icon-font.min.css";
import "../../vendor/animate/animate.css";
import "../../vendor/css-hamburgers/hamburgers.min.css";
import "../../vendor/animsition/css/animsition.min.css";
import "../../vendor/select2/select2.min.css";
import "../../vendor/daterangepicker/daterangepicker.css";
import "../../styles/util.css";
import "../../styles/main.css";
import bgImage from "../../assets/images/bg-01.jpg";
import { useEffect, useState } from "react";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import { useAuth } from "../../routes/private/AuthContext"; // Import useAuth

const Newlogin = () => {
  const [accountID, setAccountID] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth(); // Gọi useAuth để lấy hàm login
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Ngăn reload trang
    console.log("Account ID:", accountID);
    console.log("Password:", password);

    try {
      const response = await login(accountID, password); // Gọi hàm login từ AuthContext

      console.log("Response from server:", response); // In toàn bộ phản hồi từ server

      if (response) {
        console.log("Đăng nhập thành công");
        console.log("Roles:", response.roles); // Kiểm tra lại đây
        navigate("/dashboard");
        // if(response.roles.includes("Admin")){
        //   navigate("/dashboard");
        // }else{
        //   navigate("/login");
        //   console.log("Bạn không có quyền truy cập");
        // }
      } else {
        console.error("Đăng nhập thất bại");
        notification.error({
          message: "Lỗi đăng nhập",
          description: "Tài khoản hoặc mật khẩu không chính xác",
          duration: 3,
        });
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
    }
  };

  localStorage.setItem("loginMessage", "Vui lòng đăng nhập !");
  useEffect(() => {
    const message = localStorage.getItem("loginMessage");
    if (message) {
      notification.error({
        message: "Thông báo",
        description: message,
        duration: 3,
        showProgress: true,
        pauseOnHover: false,
      });
      localStorage.removeItem("loginMessage");
    }

    $(".input100").each(function () {
      $(this).on("blur", function () {
        if ($(this).val().trim() !== "") {
          $(this).addClass("has-val");
        } else {
          $(this).removeClass("has-val");
        }
      });
    });

    return () => {
      $(".input100").off("blur");
    };
  }, []);

  return (
    <div style={{ backgroundColor: "#666666" }} className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <form className="login100-form validate-form">
            <span className="login100-form-title p-b-43">
              Login to continue
            </span>

            <div
              className="wrap-input100 validate-input"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input
                className="input100"
                type="text"
                name="accountID"
                value={accountID}
                onChange={(e) => setAccountID(e.target.value)}
              />
              <span className="focus-input100"></span>
              <span className="label-input100">Tài khoản</span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input100"></span>
              <span className="label-input100">Password</span>
            </div>

            <div className="flex-sb-m w-full p-t-3 p-b-32">
              <div className="contact100-form-checkbox">
                <input
                  className="input-checkbox100"
                  id="ckb1"
                  type="checkbox"
                  name="remember-me"
                />
                <label className="label-checkbox100" htmlFor="ckb1">
                  Remember me
                </label>
              </div>

              <div>
                <a href="#" className="txt1">
                  Forgot Password?
                </a>
              </div>
            </div>

            <div className="container-login100-form-btn">
              <button className="login100-form-btn" onClick={handleLogin}>
                Login
              </button>
            </div>

            <div className="text-center p-t-46 p-b-20">
              <span className="txt2">or sign up using</span>
            </div>

            <div className="login100-form-social flex-c-m">
              <a
                href="#"
                className="login100-form-social-item flex-c-m bg1 m-r-5"
              >
                <i className="fa fa-facebook-f" aria-hidden="true"></i>
              </a>

              <a
                href="#"
                className="login100-form-social-item flex-c-m bg2 m-r-5"
              >
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </a>
            </div>
          </form>

          <div
            className="login100-more"
            style={{ backgroundImage: `url(${bgImage})` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Newlogin;
