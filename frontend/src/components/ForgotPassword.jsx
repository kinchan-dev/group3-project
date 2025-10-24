import React, { useState } from "react";
import axios from "axios";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const API_URL = "http://localhost:3000/api";

  const handleForgot = async () => {
    const res = await axios.post(`${API_URL}/forgot-password`, { email });
    setMessage(res.data.message + "\nToken: " + res.data.resetToken);
  };

  const handleReset = async () => {
    const res = await axios.post(`${API_URL}/reset-password`, { email, resetToken: token, newPassword });
    setMessage(res.data.message);
  };

  return (
    <div>
      <h3>Quên mật khẩu</h3>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleForgot}>Gửi token reset</button>

      <h3>Đặt lại mật khẩu</h3>
      <input placeholder="Token reset" value={token} onChange={(e) => setToken(e.target.value)} />
      <input type="password" placeholder="Mật khẩu mới" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      <button onClick={handleReset}>Đổi mật khẩu</button>

      <p>{message}</p>
    </div>
  );
}
