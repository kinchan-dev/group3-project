import React, { useState } from "react";
import axios from "axios";

export default function UploadAvatar() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("❌ Hãy chọn ảnh!");

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("userId", localStorage.getItem("userId")); // bạn có thể thay bằng id thực tế

    try {
      const res = await axios.post("http://localhost:3000/api/upload-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("✅ Upload thành công!");
      setImageUrl(res.data.avatarUrl);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Upload thất bại!");
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
      <h2>Tải ảnh đại diện</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
      <p>{message}</p>
      {imageUrl && (
        <div style={{ marginTop: "10px" }}>
          <img src={imageUrl} alt="Avatar" width="120" style={{ borderRadius: "50%" }} />
        </div>
      )}
    </div>
  );
}
