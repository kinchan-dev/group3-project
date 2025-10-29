import React, { useState } from "react";
import axios from "axios";

export default function LoginForm({ onLoginSuccess }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const API_URL = "http://localhost:3000/api";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/login`, form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userId", res.data.userId);

      setMessage("✅ Đăng nhập thành công!");
      setTimeout(() => {
        onLoginSuccess(res.data.role);
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Lỗi kết nối!");
    }
  };

  return (
    <form onSubmit={handleLogin} className="auth-form">
      <label>Email</label>
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <label>Mật khẩu</label>
      <input
        type="password"
        placeholder="Mật khẩu"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />

      <button type="submit">Đăng nhập</button>

      {message && (
        <p className="auth-message">
          {message}
        </p>
      )}
    </form>
  );
}
