import React, { useState } from "react";
import axios from "axios";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/login`, form);
      localStorage.setItem("token", res.data.token);
      setMessage("Đăng nhập thành công!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Lỗi kết nối!");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Đăng nhập</h2>
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Mật khẩu" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button>Đăng nhập</button>
      <p>{message}</p>
    </form>
  );
}
