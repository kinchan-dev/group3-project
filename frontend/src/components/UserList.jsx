import React, { useState } from "react";
import axios from "axios";

function UserList({ users, onUserUpdated }) {
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  // 🗑️ Xóa user
 const handleDelete = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:3000/users/${id}`);
    if (res.data.success) {
      alert("Đã xóa user thành công!");
      onUserUpdated();
    } else {
      alert("Không thể xóa user!");
    }
  } catch (err) {
    console.error("Lỗi khi xóa user:", err);
    alert("Lỗi khi xóa user!");
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
      await axios.put(`http://localhost:3000/users/${editingUser._id}`, {
        name: editName,
        email: editEmail,
      });
      alert("Cập nhật thành công!");
      setEditingUser(null);
      onUserUpdated();
    } catch (err) {
      console.error("Lỗi khi cập nhật user:", err);
      alert("Lỗi khi cập nhật!");
    }
  };

  return (
    <div>
      {users.length === 0 ? (
        <p>Không có user nào</p>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u._id}>
              {u.name} - {u.email}{" "}
              <button onClick={() => handleEdit(u)}>✏️ Sửa</button>{" "}
              <button onClick={() => handleDelete(u._id)}>🗑️ Xóa</button>
            </li>
          ))}
        </ul>
      )}

      {editingUser && (
        <form onSubmit={handleUpdate}>
          <h3>Sửa thông tin người dùng</h3>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Tên"
            required
          />
          <input
            type="email"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <button type="submit">Lưu</button>{" "}
          <button type="button" onClick={() => setEditingUser(null)}>
            Hủy
          </button>
        </form>
      )}
    </div>
  );
}

export default UserList;
