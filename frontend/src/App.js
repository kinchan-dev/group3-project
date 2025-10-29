import React, { useState, useEffect } from "react";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import ForgotPassword from "./components/ForgotPassword";
import ProfilePage from "./components/ProfilePage";
import AdminUserList from "./components/AdminUserList";
import UploadAvatar from "./components/UploadAvatar";

function App() {
  const [activeForm, setActiveForm] = useState("login");
  const [role, setRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Kiểm tra token mỗi khi mở trang
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

  // ✅ Xử lý khi đăng nhập thành công
  const handleLoginSuccess = (userRole) => {
    setIsLoggedIn(true);
    setRole(userRole);
  };

  // ✅ Đăng xuất
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setActiveForm("login");
  };

  // ✅ Giao diện đăng nhập
  if (!isLoggedIn) {
    return (
      <div className="container py-5" style={{ fontFamily: "Arial" }}>
        <h2 className="text-center mb-4 text-primary">
          🌐 Hệ thống Quản lý & Đăng nhập Người dùng
        </h2>

        <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "420px" }}>
          {activeForm === "login" && (
            <>
              <LoginForm onLoginSuccess={handleLoginSuccess} />

              <div className="text-center mt-3">
                <button className="btn btn-link" onClick={() => setActiveForm("signup")}>
                  📝 Đăng ký
                </button>
                <button className="btn btn-link" onClick={() => setActiveForm("forgot")}>
                  ❓ Quên mật khẩu
                </button>
              </div>
            </>
          )}

          {activeForm === "signup" && (
            <> 
              <SignupForm />
              <div className="text-center mt-3">
                <button className="btn btn-link" onClick={() => setActiveForm("login")}>
                  🔙 Quay lại Đăng nhập
                </button>
              </div>
            </>
          )}

          {activeForm === "forgot" && (
            <>
              <ForgotPassword />
              <div className="text-center mt-3">
                <button className="btn btn-link" onClick={() => setActiveForm("login")}>
                  🔙 Quay lại Đăng nhập
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // ✅ Giao diện sau khi đăng nhập
  return (
    <div className="container py-4" style={{ fontFamily: "Arial" }}>
      <h2 className="text-center mb-4 text-primary">👋 Chào mừng bạn đến hệ thống!</h2>

      <div className="card mb-4 shadow-sm border-0 p-4">
        <h3 className="text-secondary mb-3">👤 Thông tin cá nhân</h3>
        <ProfilePage />
        <button className="btn btn-outline-danger mt-3" onClick={handleLogout}>
          🚪 Đăng xuất
        </button>
      </div>

      {role === "admin" && (
        <div className="card mb-4 shadow-sm border-0 p-4">
          <h3 className="text-secondary mb-3">🛠️ Admin Dashboard</h3>
          <AdminUserList />
        </div>
      )}

      <div className="card mb-4 shadow-sm border-0 p-4">
        <h3 className="text-secondary mb-3">📤 Tải ảnh đại diện</h3>
        <UploadAvatar />
      </div>

      <footer className="text-center mt-4 text-muted small">
        © 2025 Group 3 - User Management System | ASP.NET + React + MongoDB
      </footer>
    </div>
  );
}

export default App;
