// frontend/src/components/AddUser.jsx
import React, { useState } from "react";
import axios from "axios";

const AddUser = ({ onUserAdded }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault(); // chặn reload trang
  if (!name || !email) return alert("Vui lòng nhập đủ tên và email!");

  try {
    await axios.post("http://localhost:3000/users", { name, email });
    onUserAdded(); // 🟢 chỉ gọi callback, không truyền res.data
    setName("");
    setEmail("");
  } catch (err) {
    console.error(err);
    alert("Lỗi khi thêm user!");
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Thêm</button>
    </form>
  );
};

export default AddUser;
