import React, { useState } from "react";
import API from "../api/axios"; // ✅ Dùng API có interceptor

export default function UploadAvatar() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId"); // ✅ lấy userId từ localStorage

    if (!file) return setMessage("❌ Hãy chọn ảnh!");
    if (!userId) return setMessage("❌ Không tìm thấy userId, hãy đăng nhập lại!");

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("userId", userId);

    try {
      const res = await API.post("/upload-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("✅ Upload thành công!");
      setImageUrl(res.data.avatarUrl);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "❌ Upload thất bại!");
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
      <h2>Tải ảnh đại diện</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit" style={{ marginLeft: "10px" }}>
          Upload
        </button>
      </form>

      <p>{message}</p>

      {imageUrl && (
        <div style={{ marginTop: "10px" }}>
          <img
            src={imageUrl}
            alt="Avatar"
            width="120"
            height="120"
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
        </div>
      )}
    </div>
  );
}
