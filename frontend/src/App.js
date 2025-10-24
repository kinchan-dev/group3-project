import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import ProfilePage from "./components/ProfilePage";
import AdminUserList from "./components/AdminUserList";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import UploadAvatar from "./components/UploadAvatar";

function App() {
  const [users, setUsers] = useState([]);
  // eslint-disable-next-line no-unused-vars
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

  const handleUserAdded = () => {
    fetchUsers();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Hệ thống Quản lý & Đăng nhập Người dùng
      </h1>

      {/* 🟩 Đăng ký + Đăng nhập */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div
          style={{
            flex: "1",
            minWidth: "300px",
            maxWidth: "400px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <SignupForm />
        </div>

        <div
          style={{
            flex: "1",
            minWidth: "300px",
            maxWidth: "400px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <LoginForm />
        </div>
      </div>

      <hr style={{ margin: "40px 0" }} />

      {/* 🟦 Quản lý user thông thường */}
      <div>
        <h2>Thêm User</h2>
        <AddUser onUserAdded={handleUserAdded} />

        <h2>Danh sách User</h2>
        <UserList users={users} onUserUpdated={fetchUsers} />
      </div>

      {/* 🧍‍♂️ Trang thông tin cá nhân */}
      <div>
        <h1>Trang Thông tin cá nhân</h1>
        <ProfilePage />
      </div>

      {/* 🧑‍💼 Admin Dashboard */}
      {role === "admin" && (
        <div>
          <h1>Admin Dashboard</h1>
          <AdminUserList />
        </div>
      )}
      <div>
        <h1>🔐 Hệ thống Tài khoản Người dùng</h1>
        <ForgotPassword />
        <ResetPassword />
        <UploadAvatar />
      </div>
    </div>
    
  );
}

export default App;
