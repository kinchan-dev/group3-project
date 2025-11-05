import React, { useState } from "react";
import API from "../api/axios"; // ✅ API có interceptor

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      // ✅ Gọi API gửi email đặt lại mật khẩu
      const res = await API.post("/auth/forgot-password", { email });

      setMessage("✅ " + res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Lỗi khi gửi email!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#131720",
        padding: "30px",
        borderRadius: "12px",
        color: "white",
        boxShadow: "0 0 20px rgba(0,0,0,0.4)",
        textAlign: "center",
      }}
    >
      <h3 style={{ marginBottom: "10px", color: "#22c55e" }}>🔑 Quên mật khẩu</h3>
      <p style={{ color: "#cbd5e1", marginBottom: "20px" }}>
        Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          type="email"
          placeholder="Nhập email của bạn..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #3a3f4b",
            backgroundColor: "#1b2130",
            color: "#fff",
            outline: "none",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#22c55e")}
          onBlur={(e) => (e.target.style.borderColor = "#3a3f4b")}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: loading ? "#15803d" : "#22c55e",
            border: "none",
            padding: "12px",
            borderRadius: "8px",
            color: "#fff",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "0.3s ease",
          }}
          onMouseOver={(e) => !loading && (e.target.style.backgroundColor = "#16a34a")}
          onMouseOut={(e) => !loading && (e.target.style.backgroundColor = "#22c55e")}
        >
          {loading ? "⏳ Đang gửi..." : "Gửi email đặt lại mật khẩu"}
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
  );
}
