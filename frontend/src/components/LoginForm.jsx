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
    <form
      onSubmit={handleLogin}
      className="p-4 shadow-sm rounded"
      style={{
        backgroundColor: "#f9f9f9",
        border: "1px solid #dcdcdc",
        color: "dimgray",
      }}
    >
      <h4 className="text-center mb-4" style={{ color: "dimgray" }}>
        🔐 Đăng nhập
      </h4>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Nhập email..."
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Mật khẩu</label>
        <input
          type="password"
          className="form-control"
          placeholder="Nhập mật khẩu..."
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
      </div>

      <button
        type="submit"
        className="btn w-100 mt-2"
        style={{
          backgroundColor: "dimgray",
          color: "white",
          fontWeight: "bold",
          borderRadius: "8px",
        }}
      >
        Đăng nhập
      </button>

      {message && (
        <p
          className="mt-3 text-center"
          style={{
            color: message.includes("✅") ? "green" : "red",
            whiteSpace: "pre-line",
          }}
        >
          {message}
        </p>
      )}
    </form>
  );
}
