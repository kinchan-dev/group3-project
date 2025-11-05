import React, { useEffect, useState } from "react";
import API from "../api/axios"; // ✅ Dùng interceptor

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

  return (
    <div
      className="profile-container"
      style={{
        backgroundColor: "#131720",
        color: "white",
        borderRadius: "12px",
        padding: "25px",
        boxShadow: "0 0 15px rgba(0,0,0,0.4)",
        maxWidth: "700px",
        margin: "0 auto",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "15px", color: "#fff", textAlign: "center" }}>
        👤 Thông tin cá nhân
      </h2>

      {/* Avatar hiển thị */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginBottom: "20px",
        }}
      >
        {profile.avatar ? (
          <img
            src={profile.avatar}
            alt="Avatar"
            width="120"
            height="120"
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #22c55e",
              marginBottom: "10px",
            }}
          />
        ) : (
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              backgroundColor: "#3b82f6",
              color: "white",
              fontSize: "40px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            {profile.name ? profile.name.charAt(0).toUpperCase() : "?"}
          </div>
        )}

        {/* Form chọn ảnh avatar */}
        <form
          onSubmit={handleAvatarUpload}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <label
            htmlFor="avatar-upload"
            style={{
              display: "inline-block",
              backgroundColor: "#3b82f6",
              color: "#fff",
              borderRadius: "6px",
              padding: "8px 14px",
              cursor: "pointer",
              
            }}
          >
            Sửa
          </label>

          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files[0])}
            style={{ display: "none" }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#3b82f6",
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            📸 Cập nhật ảnh đại diện
          </button>
        </form>
      </div>

      {/* Thông tin tài khoản */}
      <div
        style={{
          background: "#1b2130",
          padding: "15px 20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <p>
          <strong>Tên:</strong> {profile.name}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
      </div>

      {/* Form cập nhật thông tin */}
      <h3 style={{ color: "#fff", marginBottom: "10px" }}>
        ✏️ Cập nhật thông tin
      </h3>
      <form
        onSubmit={handleUpdate}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            placeholder="Tên mới"
            value={form.name || ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="form-control"
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #3a3f4b",
              backgroundColor: "#1f2634",
              color: "#fff",
            }}
          />
          <input
            placeholder="Email"
            value={form.email || ""}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="form-control"
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #3a3f4b",
              backgroundColor: "#1f2634",
              color: "#fff",
            }}
          />
        </div>

        <input
          type="password"
          placeholder="Mật khẩu mới"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="form-control"
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #3a3f4b",
            backgroundColor: "#1f2634",
            color: "#fff",
          }}
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#22c55e",
            color: "#fff",
            border: "none",
            padding: "10px",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#16a34a")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#22c55e")}
        >
          💾 Lưu thay đổi
        </button>
      </form>

      {/* Thông báo */}
      {message && (
        <p
          style={{
            marginTop: "15px",
            color: message.includes("✅") ? "#22c55e" : "#ef4444",
            textAlign: "center",
            fontWeight: "500",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
