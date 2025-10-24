import React, { useState } from "react";
import axios from "axios";

export default function SignupForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/signup`, form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Lỗi kết nối!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Đăng ký</h2>
      <input placeholder="Tên" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Mật khẩu" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button>Đăng ký</button>
      <p>{message}</p>
    </form>
  );
}
