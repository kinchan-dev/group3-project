import React, { useState } from "react";
import API from "../api/axios";

export default function UserList({ users, onUserUpdated }) {
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "" });

  // 🗑️ Xóa user
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa user này?")) return;
    try {
      await API.delete(`/users/${id}`);
      alert("🗑️ Đã xóa user thành công!");
      onUserUpdated();
    } catch (err) {
      console.error("❌ Lỗi khi xóa user:", err);
      alert("Không thể xóa user!");
    }
  };

  // ✏️ Mở modal chỉnh sửa
  const handleEdit = (user) => {
    setEditingUser(user);
    setEditForm({ name: user.name, email: user.email });
  };

  // 💾 Cập nhật user
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/users/${editingUser._id}`, editForm);
      alert("✅ Cập nhật thành công!");
      setEditingUser(null);
      onUserUpdated();
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật user:", err);
      alert("Lỗi khi cập nhật!");
    }
  };

  // 🎨 Hàm tạo màu theo vai trò
  const getRoleColor = (role) => {
    switch (role) {
      case "admin": return "#ef4444";
      case "moderator": return "#3b82f6";
      default: return "#22c55e";
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#96e6a1",
        color: "#fff",
        borderRadius: "16px",
        padding: "25px",
        boxShadow: "0 0 20px rgba(0,0,0,0.3)",
        fontFamily: "Inter, sans-serif",
        transition: "0.3s ease",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          fontWeight: "600",
          textAlign: "center",
          color: "#22c55e",
        }}
      >
        👥 Danh sách người dùng
      </h2>

      {users.length === 0 ? (
        <p style={{ textAlign: "center", color: "#9ca3af" }}>Không có user nào</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "15px",
          }}
        >
          {users.map((u) => (
            <div
              key={u._id}
              style={{
                backgroundColor: "#1b2130",
                padding: "15px 20px",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
            >
              {/* Avatar + Info */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                {u.avatar ? (
                  <img
                    src={u.avatar}
                    alt={u.name}
                    width="50"
                    height="50"
                    style={{
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid #22c55e",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: "#3b82f6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    {u.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <strong>{u.name}</strong>
                  <p style={{ color: "#cbd5e1", fontSize: "14px", margin: "3px 0" }}>
                    {u.email}
                  </p>
                  <span
                    style={{
                      backgroundColor: getRoleColor(u.role),
                      color: "#fff",
                      padding: "2px 8px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      textTransform: "capitalize",
                    }}
                  >
                    {u.role}
                  </span>
                </div>
              </div>

              {/* Nút hành động */}
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => handleEdit(u)}
                  style={{
                    backgroundColor: "#3b82f6",
                    border: "none",
                    color: "#fff",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#2563eb")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#3b82f6")
                  }
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(u._id)}
                  style={{
                    backgroundColor: "#ef4444",
                    border: "none",
                    color: "#fff",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#dc2626")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#ef4444")
                  }
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal chỉnh sửa (popup đẹp hơn) */}
      {editingUser && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "999",
          }}
        >
          <div
            style={{
              backgroundColor: "#1b2130",
              padding: "25px",
              borderRadius: "12px",
              width: "380px",
              textAlign: "center",
              boxShadow: "0 0 25px rgba(0,0,0,0.4)",
              animation: "fadeIn 0.3s ease",
            }}
          >
            <h3 style={{ color: "#22c55e", marginBottom: "15px" }}>
              ✏️ Chỉnh sửa người dùng
            </h3>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                placeholder="Tên"
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "8px",
                  border: "1px solid #3a3f4b",
                  backgroundColor: "#111827",
                  color: "#fff",
                }}
              />
              <input
                type="email"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
                placeholder="Email"
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "15px",
                  borderRadius: "8px",
                  border: "1px solid #3a3f4b",
                  backgroundColor: "#111827",
                  color: "#fff",
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#22c55e",
                    border: "none",
                    color: "#fff",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  💾 Lưu
                </button>
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  style={{
                    backgroundColor: "#ef4444",
                    border: "none",
                    color: "#fff",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  ❌ Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}