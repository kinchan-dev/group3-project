import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/forgot-password", {
        email,
      });
      setMessage(`✅ ${res.data.message}\n🔑 Token: ${res.data.resetToken}`);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Lỗi khi gửi yêu cầu!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 shadow-sm rounded"
      style={{
        backgroundColor: "#f9f9f9",
        border: "1px solid #dcdcdc",
        color: "dimgray",
      }}
    >
      <h4 className="text-center mb-4" style={{ color: "dimgray" }}>
        🔑 Quên mật khẩu
      </h4>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Nhập email của bạn..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        Gửi yêu cầu
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
