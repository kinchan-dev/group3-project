import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
/* eslint-disable no-unused-vars */
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import ProfilePage from "./components/ProfilePage";
import AdminUserList from "./components/AdminUserList";
import ForgotPassword from "./components/ForgotPassword";
// import ResetPassword from "./components/ResetPassword";
import UploadAvatar from "./components/UploadAvatar";

function App() {
  const [users, setUsers] = useState([]); /* eslint-disable no-unused-vars */

  const [role, setRole] = useState(localStorage.getItem("role") || "");

  // 🧩 Lấy danh sách user
  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy users:", err);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="container py-4" style={{ fontFamily: "Arial" }}>
      <h1 className="text-center mb-5 fw-bold text-primary">
        🌐 Hệ thống Quản lý & Đăng nhập Người dùng
      </h1>

      {/* 🔹 Đăng ký & Đăng nhập */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-5 mb-3">
          <div className="card shadow-sm border-0 p-4">
            <h4 className="text-center text-secondary mb-3">📝 Đăng ký</h4>
            <SignupForm />
          </div>
        </div>
        <div className="col-md-5 mb-3">
          <div className="card shadow-sm border-0 p-4">
            <h4 className="text-center text-secondary mb-3">🔐 Đăng nhập</h4>
            <LoginForm />
          </div>
        </div>
      </div>

      {/* 🔹 Thông tin cá nhân */}
      <div className="card mb-4 shadow-sm border-0 p-4">
        <h3 className="mb-3 text-secondary">👤 Trang Thông tin cá nhân</h3>
        <ProfilePage />
      </div>

      {/* 🔹 Admin Dashboard */}
      {role === "admin" && (
        <div className="card mb-4 shadow-sm border-0 p-4">
          <h3 className="mb-3 text-secondary">🛠️ Admin Dashboard</h3>
          <AdminUserList />
        </div>
      )}

      {/* 🔹 Hệ thống Tài khoản */}
      <div className="card mb-4 shadow-sm border-0 p-4">
        <h3 className="mb-3 text-secondary">🔑 Hệ thống Tài khoản Người dùng</h3>
        <ForgotPassword />
        <UploadAvatar />
      </div>

      {/* 🔹 Footer */}
      <footer className="text-center mt-5 text-muted small">
        © 2025 Group 3 - User Management System | ASP.NET + React + MongoDB
      </footer>
    </div>
  );
}

export default App;
