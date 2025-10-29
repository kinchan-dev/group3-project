import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "" });
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch {
      setMessage("❌ Không thể tải danh sách user (chỉ admin mới xem được)");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa user này?")) return;
    try {
      const res = await axios.delete(`http://localhost:3000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("🗑️ Xóa user thành công!");
      fetchUsers();
    } catch {
      setMessage("❌ Lỗi khi xóa user!");
    }
  };

  const startEdit = (user) => {
    setEditingUser(user._id);
    setEditForm({ name: user.name, email: user.email });
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(
        `http://localhost:3000/api/users/${id}`,
        editForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
            color: message.includes("✅") ? "#22c55e" : message.includes("🗑️") ? "#22c55e" : "#ef4444",
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
            backgroundColor: "#1b2130",
            padding: "12px 20px",
            borderRadius: "8px",
            marginBottom: "10px",
            border: editingUser === u._id ? "1px solid #22c55e" : "1px solid transparent",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div
              style={{
                backgroundColor: "#22c55e",
                color: "white",
                fontWeight: "bold",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textTransform: "uppercase",
              }}
            >
              {u.name ? u.name.charAt(0) : "?"}
            </div>
            {editingUser === u._id ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
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
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
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
                <p style={{ margin: 0, color: "#cbd5e1", fontSize: "14px" }}>{u.email}</p>
              </div>
            )}
          </div>

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
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
