import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setMessage("❌ Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:3000/api/auth/reset-password/${token}`,
        { password }
      );

      setMessage("✅ " + res.data.message);

      // ⏳ Tự quay lại trang đăng nhập sau 3s
      setTimeout(() => navigate("/"), 2500);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Token không hợp lệ hoặc đã hết hạn!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#1e293b",
          padding: "40px",
          borderRadius: "15px",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 0 25px rgba(0,0,0,0.5)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "10px", color: "#22c55e" }}>🔑 Đặt lại mật khẩu</h2>
        <p style={{ color: "#9ca3af", marginBottom: "25px" }}>
          Nhập mật khẩu mới của bạn bên dưới.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <div style={{ textAlign: "left" }}>
            <label style={{ fontWeight: "600", color: "#e2e8f0" }}>
              Mật khẩu mới
            </label>
            <input
              type="password"
              placeholder="Nhập mật khẩu mới"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "6px",
                borderRadius: "8px",
                border: "1px solid #334155",
                backgroundColor: "#0f172a",
                color: "#fff",
                fontSize: "15px",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#22c55e")}
              onBlur={(e) => (e.target.style.borderColor = "#334155")}
            />
          </div>

          <div style={{ textAlign: "left" }}>
            <label style={{ fontWeight: "600", color: "#e2e8f0" }}>
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              placeholder="Nhập lại mật khẩu"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "6px",
                borderRadius: "8px",
                border: "1px solid #334155",
                backgroundColor: "#0f172a",
                color: "#fff",
                fontSize: "15px",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#22c55e")}
              onBlur={(e) => (e.target.style.borderColor = "#334155")}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: loading ? "#15803d" : "#22c55e",
              border: "none",
              padding: "12px",
              borderRadius: "10px",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "0.3s ease",
            }}
            onMouseOver={(e) => !loading && (e.target.style.backgroundColor = "#16a34a")}
            onMouseOut={(e) => !loading && (e.target.style.backgroundColor = "#22c55e")}
          >
            {loading ? "⏳ Đang xử lý..." : "Đặt lại mật khẩu"}
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "20px",
              color: message.includes("✅") ? "#22c55e" : "#ef4444",
              fontWeight: "500",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
