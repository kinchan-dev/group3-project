import React, { useState } from "react";
import API from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await API.post("/auth/forgot-password", { email });
      setMessage("✅ " + res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Lỗi khi gửi email!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div>
        <h3 className="text-center text-success mb-3">
          <i className="fa-solid fa-unlock-keyhole me-2"></i> Quên mật khẩu
        </h3>
        <p className="text-center text-muted mb-4">
          Nhập email của bạn để nhận liên kết đặt lại mật khẩu 📧
        </p>

        <form onSubmit={handleSubmit}>
          {/* Nhập email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="fa-solid fa-envelope text-success"></i>
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Nhập email của bạn..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Nút gửi */}
          <button
            type="submit"
            className="btn btn-success w-100 py-2 fw-semibold"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fa-solid fa-spinner fa-spin me-2"></i> Đang gửi...
              </>
            ) : (
              <>
                <i className="fa-solid fa-paper-plane me-2"></i> Gửi email đặt lại mật khẩu
              </>
            )}
          </button>
        </form>

        {/* Thông báo */}
        {message && (
          <div
            className={`alert mt-4 text-center ${
              message.includes("✅") ? "alert-success" : "alert-danger"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
