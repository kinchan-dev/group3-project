import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProfilePage() {
  const [profile, setProfile] = useState({});
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");
  const API_URL = "http://localhost:3000/api/profile";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
        setForm(res.data);
      } catch (err) {
        setMessage("❌ Lỗi tải thông tin cá nhân!");
      }
    };
    fetchProfile();
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(API_URL, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("✅ Cập nhật thành công!");
      setProfile(res.data.user);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Lỗi khi cập nhật!");
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
      <h2 style={{ marginBottom: "15px", color: "#fff" }}>Thông tin cá nhân</h2>

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

      <h3 style={{ color: "#fff", marginBottom: "10px" }}>Cập nhật thông tin</h3>
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
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            padding: "10px",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#2ecc71")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
        >
          Cập nhật
        </button>
      </form>

      {message && (
        <p
          style={{
            marginTop: "15px",
            color: message.includes("✅") ? "#28a745" : "#ff4d4f",
            textAlign: "center",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
