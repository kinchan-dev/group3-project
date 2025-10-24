import React, { useState } from "react";
import axios from "axios";

function AddUser({ onUserAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!name.trim()) {
      alert("Name không được để trống");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Email không hợp lệ");
      return;
    }

    try {
      await axios.post("http://localhost:3000/users", { name, email });
      alert("Thêm user thành công!");
      setName("");
      setEmail("");
      onUserAdded(); // reload danh sách
    } catch (err) {
      console.error("Lỗi khi thêm user:", err);
      alert("Lỗi khi thêm user!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Tên:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên"
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nhập email"
          required
        />
      </div>
      <button type="submit">Thêm</button>
    </form>
  );
}

export default AddUser;
