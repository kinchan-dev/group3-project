import React, { useEffect, useState } from "react";
import API from "../api/axios"; // ✅ Dùng interceptor đã có token

export default function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "" });
  const role = localStorage.getItem("role"); // 👑 Lấy quyền người đăng nhập

  // 🔄 Lấy danh sách user
  const fetchUsers = async () => {
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
  };

  // 🗑️ Xóa user
  const deleteUser = async (id) => {
    if (role !== "admin") {
      return setMessage("⛔ Chỉ admin mới được phép xóa user!");
    }
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
    if (role === "user") {
      return setMessage("⚠️ User không được chỉnh sửa người khác!");
    }
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

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#131720",
        color: "white",
        borderRadius: "12px",
        padding: "25px",
        boxShadow: "0 0 15px rgba(0,0,0,0.4)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <h3 style={{ color: "white", marginBottom: "15px" }}>Danh sách User</h3>

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

      {role === "user" && (
        <p style={{ color: "#facc15" }}>👤 Bạn chỉ có thể xem thông tin của mình.</p>
      )}

      {users.map((u) => (
        <div
          key={u._id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#1b2130",
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
            {/* 🖼️ Avatar (có thể là ảnh thật từ Cloudinary) */}
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

            {/* Thông tin hoặc form sửa */}
            {editingUser === u._id ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  style={{
                    backgroundColor: "#111827",
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
                    backgroundColor: "#111827",
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
                <p style={{ margin: 0, color: "#cbd5e1", fontSize: "14px" }}>
                  {u.email}{" "}
                  <span style={{ color: "#9ca3af", fontSize: "12px" }}>
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
