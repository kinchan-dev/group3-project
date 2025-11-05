import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ForgotPassword from "./components/ForgotPassword";
import ProfilePage from "./components/ProfilePage";
import AdminUserList from "./components/AdminUserList";
import "./App.css";

function App() {
  const [activeForm, setActiveForm] = useState("login");
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem("activeTab") || "profile");
  const [role, setRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChecking, setIsChecking] = useState(true); // ⏳ Trạng thái đang kiểm tra đăng nhập

  // 🔍 Kiểm tra token mỗi khi load lại trang
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const savedRole = localStorage.getItem("role");

    if (token) {
      setIsLoggedIn(true);
      setRole(savedRole || "");
    } else {
      setIsLoggedIn(false);
      setActiveForm("login");
    }

    setIsChecking(false); // ✅ Kết thúc quá trình kiểm tra
  }, []);

  // 💾 Lưu tab đang mở để khi F5 vẫn giữ nguyên
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const handleLoginSuccess = (userRole) => {
    setIsLoggedIn(true);
    setRole(userRole);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setActiveForm("login");
  };

  // 🌀 Loading khi đang kiểm tra token
  if (isChecking) {
    return (
      <div className="auth-container" style={{ textAlign: "center", marginTop: "100px" }}>
        <h2 style={{ color: "#22c55e" }}>⏳ Đang tải thông tin người dùng...</h2>
      </div>
    );
  }

  // 🚪 Nếu chưa đăng nhập → Hiển thị form auth
  if (!isLoggedIn) {
    return (
      <div className="auth-container">
        <h2 className="auth-title">👋 Chào mừng!</h2>
        <p className="auth-subtitle">Vui lòng đăng nhập hoặc đăng ký</p>

        <div className="form-wrapper">
          {activeForm === "login" && (
            <div className="form-card">
              <LoginForm onLoginSuccess={handleLoginSuccess} />
              <div className="form-links">
                <button onClick={() => setActiveForm("signup")}>Đăng ký</button>
                <button onClick={() => setActiveForm("forgot")}>
                  Quên mật khẩu
                </button>
              </div>
            </div>
          )}

          {activeForm === "signup" && (
            <div className="form-card">
              <SignupForm />
              <div className="form-links">
                <button onClick={() => setActiveForm("login")}>
                  🔙 Quay lại đăng nhập
                </button>
              </div>
            </div>
          )}

          {activeForm === "forgot" && (
            <div className="form-card">
              <ForgotPassword />
              <div className="form-links">
                <button onClick={() => setActiveForm("login")}>
                  🔙 Quay lại đăng nhập
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ✅ Sau khi đăng nhập thành công
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">⚙️ Quản Lý Người Dùng</h2>

      {/* 🔹 Thanh điều hướng */}
      <div className="dashboard-nav">
        {(role === "admin" || role === "moderator") && (
          <span
            className={activeTab === "users" ? "active-tab" : ""}
            onClick={() => setActiveTab("users")}
          >
            👥 Quản lý User
          </span>
        )}

        <span
          className={activeTab === "profile" ? "active-tab" : ""}
          onClick={() => setActiveTab("profile")}
        >
          🙍 Hồ sơ cá nhân
        </span>

        <button className="logout-btn" onClick={handleLogout}>
          🚪 Đăng xuất
        </button>
      </div>

      {/* 🔸 Nội dung từng tab */}
      {activeTab === "profile" && (
        <div className="dashboard-card">
          <ProfilePage />
        </div>
      )}

      {activeTab === "users" && (role === "admin" || role === "moderator") && (
        <div className="dashboard-card">
          <AdminUserList />
        </div>
      )}
    </div>
  );
}

export default App;