import React, { useState } from "react";
import API from "../api/axios"; // ✅ Dùng API có interceptor

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/forgot-password", { email }); // ✅ Không cần URL đầy đủ
      setMessage("✅ Token reset mật khẩu (dùng cho bước /reset-password)");
      setToken(res.data.resetToken);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Lỗi khi gửi yêu cầu!");
    }
  };

  const copyToken = () => {
    navigator.clipboard.writeText(token);
    alert("📋 Token đã được sao chép!");
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form wide-form">
      <h4 className="auth-form-title">🔑 Quên mật khẩu</h4>

      <label>Email</label>
      <input
        type="email"
        placeholder="Nhập email của bạn..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button type="submit">Gửi yêu cầu</button>

      {message && (
        <div className="token-box">
          <p className="token-message">{message}</p>

          {token && (
            <div className="token-display">
              <code>{token}</code>
              <button type="button" onClick={copyToken}>
                📋
              </button>
            </div>
          )}
        </div>
      )}
    </form>
  );
}
