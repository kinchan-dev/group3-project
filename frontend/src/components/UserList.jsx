import React, { useState } from "react";
import API from "../api/axios"; // ✅ Dùng API interceptor thay vì axios

function UserList({ users, onUserUpdated }) {
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  // 🗑️ Xóa user
  const handleDelete = async (id) => {
    try {
      const res = await API.delete(`/users/${id}`); // ✅ Gọi API với đường dẫn tương đối
      alert("🗑️ Đã xóa user thành công!");
      onUserUpdated();
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
      onUserUpdated();
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
              <div>
                <strong>{u.name}</strong> <br />
                <span style={{ color: "#cbd5e1" }}>{u.email}</span>
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
                  }}
                >
                  🗑️ Xóa
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

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
            Sửa thông tin người dùng
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

export default UserList;
