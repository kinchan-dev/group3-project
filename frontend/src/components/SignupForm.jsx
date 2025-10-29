import React, { useState } from "react";
import axios from "axios";

export default function SignupForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const API_URL = "http://localhost:3000/api";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/signup`, form);
      setMessage(`✅ ${res.data.message}`);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Lỗi kết nối!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <label>Tên</label>
      <input
        type="text"
        placeholder="Tên"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

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

      <button type="submit">Đăng ký</button>

      {message && (
        <p className="auth-message">
          {message}
        </p>
      )}
    </form>
  );
}
