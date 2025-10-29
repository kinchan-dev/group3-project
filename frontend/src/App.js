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
  // eslint-disable-next-line no-unused-vars
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

  // ✅ Trang sau khi đăng nhập
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">⚙️ Quản Lý User</h2>

      {/* Navbar */}
      <div className="dashboard-nav">
        <span
          className={activeTab === "users" ? "active-tab" : ""}
          onClick={() => setActiveTab("users")}
        >
          Quản lý User
        </span>
        <span
          className={activeTab === "profile" ? "active-tab" : ""}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </span>
        <button className="logout-btn" onClick={handleLogout}>
          Đăng xuất
        </button>
      </div>

      {/* Nội dung thay đổi theo tab */}
      {activeTab === "profile" && (
        <div className="dashboard-card">
          <ProfilePage />
        </div>
      )}


      {activeTab === "users" && (
        <div className="dashboard-card">
          <AdminUserList />
        </div>
      )}

      <div className="dashboard-card">
        <UploadAvatar />
      </div>
    </div>
  );
}

export default App;
