import React, { useState, useEffect, useCallback, useRef } from "react";
import API from "../api/axios";

export default function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "" });
  const [adminInfo, setAdminInfo] = useState({});
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);
  const role = localStorage.getItem("role");

  // ✅ Lấy thông tin người đăng nhập
  const fetchProfile = useCallback(async () => {
    try {
      const res = await API.get("/profile");
      setAdminInfo(res.data);
    } catch (err) {
      console.error("❌ Lỗi tải profile:", err);
    }
  }, []);

  // ✅ Ghi nhớ hàm fetchUsers để không bị ESLint cảnh báo
  const fetchUsers = useCallback(async () => {
    try {
      if (role !== "admin" && role !== "moderator") {
        setMessage("⚠️ Bạn không có quyền xem danh sách user!");
        return;
      }
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setMessage("❌ Không thể tải danh sách user!");
    }
  }, [role]);

  useEffect(() => {
    fetchUsers();
    fetchProfile();
  }, [fetchUsers, fetchProfile]);

  // 🗑️ Xóa user
  const deleteUser = async (id) => {
    if (role !== "admin") return setMessage("⛔ Chỉ admin mới được phép xóa user!");
    if (!window.confirm("Bạn có chắc muốn xóa user này?")) return;
    try {
      await API.delete(`/users/${id}`);
      setMessage("🗑️ Xóa user thành công!");
      fetchUsers();
    } catch {
      setMessage("❌ Lỗi khi xóa user!");
    }
  };

  // ✏️ Bắt đầu sửa
  const startEdit = (user) => {
    if (role === "user") return setMessage("⚠️ User không được chỉnh sửa người khác!");
    setEditingUser(user._id);
    setEditForm({ name: user.name, email: user.email });
  };

  // 💾 Lưu thay đổi
  const saveEdit = async (id) => {
    try {
      await API.put(`/users/${id}`, editForm);
      setMessage("✅ Cập nhật user thành công!");
      setEditingUser(null);
      fetchUsers();
    } catch {
      setMessage("❌ Lỗi khi cập nhật user!");
    }
  };

  // 🚪 Đăng xuất
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  // 🧠 Click ra ngoài sẽ đóng dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      style={{
        color: "white",
        borderRadius: "12px",
        padding: "25px",
        fontFamily: "Inter, sans-serif",
        backgroundColor: "#01ff491e",
        boxShadow: "0 0 15px rgba(0,0,0,0.3)",
        margin: "30px",
      }}
    >
      {/* ✅ Header có avatar + dropdown */}
      <div
        ref={dropdownRef}
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: "25px",
          position: "relative",
        }}
      >
        {/* Avatar + Tên (Click để toggle dropdown) */}
        <div
          onClick={() => setShowMenu((prev) => !prev)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            transition: "0.3s",
            userSelect: "none",
          }}
        >
          {adminInfo.avatar ? (
            <img
              src={adminInfo.avatar}
              alt="avatar"
              width="45"
              height="45"
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #22c55e",
                transition: "0.3s",
                boxShadow: showMenu ? "0 0 10px #22c55e" : "none",
                transform: showMenu ? "scale(1.05)" : "scale(1)",
              }}
            />
          ) : (
            <div
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                backgroundColor: "#3b82f6",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                color: "#fff",
                fontSize: "18px",
                boxShadow: showMenu ? "0 0 10px #22c55e" : "none",
                transform: showMenu ? "scale(1.05)" : "scale(1)",
                transition: "0.3s",
              }}
            >
              {adminInfo.name ? adminInfo.name.charAt(0).toUpperCase() : "A"}
            </div>
          )}
          <span
            style={{
              fontWeight: "600",
              color: showMenu ? "#16a34a" : "#22c55e",
              transition: "0.3s",
            }}
          >
            {adminInfo.name || "Admin"}
          </span>
        </div>

        {/* Dropdown menu */}
        {showMenu && (
          <div
            style={{
              position: "absolute",
              top: "60px",
              right: "0",
              backgroundColor: "#1b2130",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
              padding: "8px 0",
              zIndex: 100,
              width: "160px",
              animation: "fadeIn 0.25s ease-in-out",
            }}
          >
            <button
              onClick={() => (window.location.href = "/profile")}
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                background: "none",
                border: "none",
                color: "white",
                textAlign: "left",
                fontSize: "14px",
                cursor: "pointer",
                transition: "0.2s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#2a3346")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
            >
              👤 Xem hồ sơ
            </button>
            <button
              onClick={handleLogout}
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                background: "none",
                border: "none",
                color: "#ef4444",
                textAlign: "left",
                fontSize: "14px",
                cursor: "pointer",
                transition: "0.2s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#2a3346")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
            >
              🚪 Đăng xuất
            </button>
          </div>
        )}
      </div>

      {role === "moderator" && (
        <p style={{ color: "#838113ff" }}>⚠️ Moderator: bạn chỉ có thể xem và chỉnh sửa user, không thể xóa.</p>
      )}

      {/* Danh sách người dùng */}
      <h3 style={{ color: "white", marginBottom: "15px" }}>👥 Danh sách User</h3>

      {message && (
        <p
          style={{
            color:
              message.includes("✅") || message.includes("🗑️")
                ? "#22c55e"
                : "#ef4444",
            marginBottom: "15px",
            fontWeight: "500",
          }}
        >
          {message}
        </p>
      )}

      {users.map((u) => (
        <div
          key={u._id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#1b213030",
            padding: "12px 20px",
            borderRadius: "8px",
            marginBottom: "10px",
            border:
              editingUser === u._id
                ? "1px solid #22c55e"
                : "1px solid transparent",
          }}
        >
          {/* Avatar + Info */}
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            {u.avatar ? (
              <img
                src={u.avatar}
                alt={u.name}
                width="45"
                height="45"
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #22c55e",
                }}
              />
            ) : (
              <div
                style={{
                  backgroundColor: "#3b82f6",
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {u.name ? u.name.charAt(0).toUpperCase() : "?"}
              </div>
            )}

            {/* Info hoặc form sửa */}
            {editingUser === u._id ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  style={{
                    backgroundColor: "#1459e4ff",
                    color: "#fff",
                    border: "1px solid #3a3f4b",
                    borderRadius: "6px",
                    padding: "6px",
                  }}
                />
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  style={{
                    backgroundColor: "#000000ff",
                    color: "#fff",
                    border: "1px solid #3a3f4b",
                    borderRadius: "6px",
                    padding: "6px",
                  }}
                />
              </div>
            ) : (
              <div>
                <strong>{u.name}</strong>
                <p style={{ margin: 0, color: "#000000ff", fontSize: "14px" }}>
                  {u.email}{" "}
                  <span style={{ color: "#2461cbff", fontSize: "12px" }}>
                    ({u.role})
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Các hành động */}
          <div style={{ display: "flex", gap: "8px" }}>
            {editingUser === u._id ? (
              <>
                <button
                  onClick={() => saveEdit(u._id)}
                  style={{
                    backgroundColor: "#22c55e",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 10px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Lưu
                </button>
                <button
                  onClick={() => setEditingUser(null)}
                  style={{
                    backgroundColor: "#6b7280",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 10px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Hủy
                </button>
              </>
            ) : (
              <>
                {(role === "admin" || role === "moderator") && (
                  <button
                    onClick={() => startEdit(u)}
                    style={{
                      backgroundColor: "#3b82f6",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "6px 10px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Sửa
                  </button>
                )}
                {role === "admin" && (
                  <button
                    onClick={() => deleteUser(u._id)}
                    style={{
                      backgroundColor: "#ef4444",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "6px 10px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Xóa
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
