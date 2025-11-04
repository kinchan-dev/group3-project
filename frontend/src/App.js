import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ForgotPassword from "./components/ForgotPassword";
import ProfilePage from "./components/ProfilePage";
import AdminUserList from "./components/AdminUserList";
import UploadAvatar from "./components/UploadAvatar";
import "./App.css";

function App() {
  const [activeForm, setActiveForm] = useState("login");
  const [activeTab, setActiveTab] = useState("profile");
  const [role, setRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");

    if (token) {
      setIsLoggedIn(true);
      setRole(savedRole || "");
    } else {
      setIsLoggedIn(false);
      setActiveForm("login");
    }
  }, []);

  const handleLoginSuccess = (userRole) => {
    setIsLoggedIn(true);
    setRole(userRole);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setActiveForm("login");
  };

  // 🟢 Nếu chưa đăng nhập
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

  // ✅ Sau khi đăng nhập
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">
        {role === "admin"
          ? "👑 Admin Dashboard"
          : role === "moderator"
          ? "🛡️ Moderator Panel"
          : "👤 User Profile"}
      </h2>

      {/* 🧭 Navbar phân quyền */}
      <div className="dashboard-nav">
        {/* ✅ Admin và Moderator mới thấy "Quản lý User" */}
        {(role === "admin" || role === "moderator") && (
          <span
            className={activeTab === "users" ? "active-tab" : ""}
            onClick={() => setActiveTab("users")}
          >
            Quản lý User
          </span>
        )}

        {/* ✅ Tất cả đều có thể xem Profile */}
        <span
          className={activeTab === "profile" ? "active-tab" : ""}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </span>

        {/* ✅ Moderator và Admin có thể upload avatar */}
        {(role === "admin" || role === "moderator" || role === "user") && (
          <span
            className={activeTab === "upload" ? "active-tab" : ""}
            onClick={() => setActiveTab("upload")}
          >
            Upload Avatar
          </span>
        )}

        <button className="logout-btn" onClick={handleLogout}>
          Đăng xuất
        </button>
      </div>

      {/* ⚙️ Nội dung thay đổi theo tab */}
      <div className="dashboard-card">
        {/* ✅ Profile */}
        {activeTab === "profile" && <ProfilePage />}

        {/* ✅ Admin và Moderator: danh sách user */}
        {activeTab === "users" &&
          (role === "admin" || role === "moderator") && <AdminUserList />}

        {/* ✅ Upload Avatar: cho tất cả */}
        {activeTab === "upload" && <UploadAvatar />}
      </div>
    </div>
  );
}

export default App;
