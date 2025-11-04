import React, { useState } from "react";
import API from "../api/axios"; // ✅ Sử dụng API interceptor có gắn token sẵn

export default function UserList({ users, onUserUpdated }) {
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  // 🗑️ Xóa user
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa user này?")) return;
    try {
      await API.delete(`/users/${id}`);
      alert("🗑️ Đã xóa user thành công!");
      onUserUpdated(); // ✅ Refresh danh sách user
    } catch (err) {
      console.error("❌ Lỗi khi xóa user:", err);
      alert("Không thể xóa user!");
    }
  };

  // ✏️ Chọn user để sửa
  const handleEdit = (user) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
  };

  // 💾 Cập nhật user (PUT)
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/users/${editingUser._id}`, {
        name: editName,
        email: editEmail,
      });
      alert("✅ Cập nhật thành công!");
      setEditingUser(null);
      onUserUpdated(); // ✅ Refresh danh sách sau khi sửa
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật user:", err);
      alert("Lỗi khi cập nhật!");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#131720",
        color: "white",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <h3 style={{ marginBottom: "15px", color: "#fff" }}>👥 Danh sách người dùng</h3>

      {users.length === 0 ? (
        <p style={{ color: "#9ca3af" }}>Không có user nào</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {users.map((u) => (
            <li
              key={u._id}
              style={{
                backgroundColor: "#1b2130",
                marginBottom: "10px",
                padding: "10px 15px",
                borderRadius: "6px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {/* ✅ Ảnh đại diện hoặc ký tự đầu tiên */}
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
                      width: "45px",
                      height: "45px",
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
                  <strong>{u.name}</strong> <br />
                  <span style={{ color: "#cbd5e1", fontSize: "14px" }}>{u.email}</span>
                </div>
              </div>

              <div>
                <button
                  onClick={() => handleEdit(u)}
                  style={{
                    backgroundColor: "#3b82f6",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "5px 10px",
                    marginRight: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  ✏️ Sửa
                </button>
                <button
                  onClick={() => handleDelete(u._id)}
                  style={{
                    backgroundColor: "#ef4444",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "5px 10px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  🗑️ Xóa
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Form chỉnh sửa */}
      {editingUser && (
        <form
          onSubmit={handleUpdate}
          style={{
            marginTop: "20px",
            backgroundColor: "#1b2130",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h3 style={{ color: "#fff", marginBottom: "10px" }}>
            ✏️ Sửa thông tin người dùng
          </h3>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Tên"
            required
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "6px",
              border: "1px solid #3a3f4b",
              backgroundColor: "#111827",
              color: "#fff",
            }}
          />
          <input
            type="email"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            placeholder="Email"
            required
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "6px",
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
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              💾 Lưu
            </button>
            <button
              type="button"
              onClick={() => setEditingUser(null)}
              style={{
                backgroundColor: "#6b7280",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ❌ Hủy
            </button>
          </div>
        </form>
      )}
    </div>
  );
}