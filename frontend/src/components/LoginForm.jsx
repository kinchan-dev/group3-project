import React, { useState } from "react";
import axios from "axios";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const API_URL = "http://localhost:3000/api"; // bạn có thể đổi sang process.env.REACT_APP_API_URL

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/login`, form);

      // ✅ Lưu token và role vào localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      setMessage("✅ Đăng nhập thành công!");
      
      // ✅ Reload lại trang để hiển thị Dashboard
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Lỗi kết nối!");
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
      <h2>Đăng nhập</h2>
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Đăng nhập</button>
      <p>{message}</p>
    </form>
  );
}
