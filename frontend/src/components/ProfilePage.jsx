import React, { useEffect, useState } from "react";
import API from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

export default function ProfilePage() {
  const [profile, setProfile] = useState({});
  const [form, setForm] = useState({});
  const [avatarFile, setAvatarFile] = useState(null);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  // 🔄 Lấy thông tin cá nhân
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/profile");
        setProfile(res.data);
        setForm(res.data);
      } catch (err) {
        console.error(err);
        setMessage("❌ Lỗi tải thông tin cá nhân!");
      }
    };
    fetchProfile();
  }, [token]);

  // 💾 Cập nhật thông tin
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put("/profile", form);
      setProfile(res.data.user);
      setMessage("✅ Cập nhật thông tin thành công!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Lỗi khi cập nhật!");
    }
  };

  // 🖼️ Upload avatar
  const handleAvatarUpload = async (e) => {
    e.preventDefault();
    if (!avatarFile) return setMessage("⚠️ Hãy chọn ảnh trước khi upload!");

    const formData = new FormData();
    formData.append("avatar", avatarFile);

    try {
      const res = await API.post("/upload-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProfile((prev) => ({ ...prev, avatar: res.data.avatarUrl }));
      setMessage("✅ Ảnh đại diện đã được cập nhật!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Lỗi khi upload ảnh!");
    }
  };

  // 🚪 Đăng xuất
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 position-relative">
      {/* 🔘 Nút đăng xuất cố định ở góc phải */}
      <button
        onClick={handleLogout}
        className="btn btn-danger position-absolute fw-semibold shadow-sm"
        style={{
          top: "20px",
          right: "30px",
          borderRadius: "30px",
          padding: "8px 18px",
          transition: "0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#dc2626")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#ef4444")}
      >
        🚪 Đăng xuất
      </button>

      {/* Thẻ hồ sơ */}
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: "600px",
          borderRadius: "20px",
          backgroundColor: "#f9fafb",
        }}
      >
        {/* Header */}
        <h3 className="text-center text-success mb-4">
          <i className="fa-solid fa-user-circle me-2"></i> Hồ sơ cá nhân
        </h3>

        {/* Upload avatar */}
        <div className="text-center mb-4">
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt="Avatar"
              className="rounded-circle border border-3 border-success"
              width="130"
              height="130"
              style={{ objectFit: "cover", transition: "0.3s" }}
            />
          ) : (
            <div
              className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center"
              style={{
                width: "130px",
                height: "130px",
                fontSize: "50px",
                margin: "0 auto",
              }}
            >
              {profile.name ? profile.name.charAt(0).toUpperCase() : "?"}
            </div>
          )}

          {/* Form upload ảnh */}
          <form onSubmit={handleAvatarUpload} className="mt-4">
            <div className="d-flex justify-content-center align-items-center gap-2">
              {/* Nút chọn ảnh tùy chỉnh */}
              <label
                htmlFor="avatarUpload"
                className="btn btn-outline-success fw-semibold shadow-sm"
                style={{
                  borderRadius: "30px",
                  padding: "8px 18px",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "rgba(34,197,94,0.1)")
                }
                onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
              >
                <i className="fa-solid fa-image me-2"></i> Chọn ảnh
              </label>

              {/* Input file ẩn */}
              <input
                id="avatarUpload"
                type="file"
                accept="image/*"
                onChange={(e) => setAvatarFile(e.target.files[0])}
                style={{ display: "none" }}
              />

              {/* Nút upload */}
              <button
                type="submit"
                className="btn btn-success fw-semibold shadow-sm"
                style={{ borderRadius: "30px", padding: "8px 18px" }}
              >
                <i className="fa-solid fa-upload me-2"></i> Tải lên
              </button>
            </div>

            {/* Hiển thị tên file ảnh được chọn */}
            {avatarFile && (
              <p className="text-muted mt-2 small">
                <i className="fa-solid fa-check text-success me-1"></i>
                {avatarFile.name}
              </p>
            )}
          </form>
        </div>

        {/* Thông tin tài khoản */}
        <div className="mb-4 p-3 rounded" style={{ backgroundColor: "#e9f5ee" }}>
          <p className="mb-1">
            <strong>👤 Họ tên:</strong> {profile.name || "Chưa có"}
          </p>
          <p className="mb-0">
            <strong>📧 Email:</strong> {profile.email || "Chưa có"}
          </p>
        </div>

        {/* Form cập nhật thông tin */}
        <h5 className="text-success mb-3">
          <i className="fa-solid fa-pen-to-square me-2"></i> Cập nhật thông tin
        </h5>

        <form onSubmit={handleUpdate}>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Tên</label>
              <input
                type="text"
                className="form-control"
                placeholder="Tên mới..."
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="col">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email..."
                value={form.email || ""}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Mật khẩu mới</label>
            <input
              type="password"
              className="form-control"
              placeholder="Nhập mật khẩu mới..."
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 py-2 fw-semibold"
          >
            💾 Lưu thay đổi
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