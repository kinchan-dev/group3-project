import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h3>🔐 Đăng nhập</h3>
      <label>Email</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <label>Mật khẩu</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit" disabled={loading}>
        {loading ? "⏳ Đang xử lý..." : "Đăng nhập"}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
