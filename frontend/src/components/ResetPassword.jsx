import React, { useState } from "react";
import API from "../api/axios"; // ✅ Dùng API thay axios

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/reset-password", { email, resetToken, newPassword });
      setMessage(`✅ ${res.data.message}`);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Lỗi khi reset mật khẩu!");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <h2>Đặt lại mật khẩu</h2>
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nhập token reset"
          value={resetToken}
          onChange={(e) => setResetToken(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu mới"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Cập nhật mật khẩu</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
