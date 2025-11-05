import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";


export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  const result = await dispatch(loginUser({ email, password }));

  if (loginUser.fulfilled.match(result)) {
    const role = result.payload.role; // 👈 Lấy role từ backend trả về

    // Lưu role vào localStorage (để App.js dùng)
    localStorage.setItem("role", role);

    // 🔁 Điều hướng theo role
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "moderator") {
      navigate("/moderator");
    } else {
      navigate("/profile");
    }
  }
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
