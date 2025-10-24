import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProfilePage() {
  const [profile, setProfile] = useState({});
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");
  const API_URL = "http://localhost:3000/api/profile";
  const token = localStorage.getItem("token");

  // Lấy thông tin user
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
        setForm(res.data);
      } catch (err) {
        setMessage("Lỗi tải thông tin cá nhân");
      }
    };
    fetchProfile();
  }, [token]);

  // Cập nhật user
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(API_URL, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
      setProfile(res.data.user);
    } catch (err) {
      setMessage(err.response?.data?.message || "Lỗi cập nhật");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Thông tin cá nhân</h2>

      {profile && (
        <div>
          <p><b>Tên:</b> {profile.name}</p>
          <p><b>Email:</b> {profile.email}</p>
        </div>
      )}

      <h3>Cập nhật thông tin</h3>
      <form onSubmit={handleUpdate}>
        <input
          placeholder="Tên"
          value={form.name || ""}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email || ""}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Mật khẩu mới (tuỳ chọn)"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button>Cập nhật</button>
      </form>

      <p style={{ color: "green" }}>{message}</p>
    </div>
  );
}
