import React, { useState } from "react";
import API from "../api/axios";

export default function UploadAvatar() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) return setMessage("❌ Hãy chọn ảnh!");

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await API.post("/upload-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message);
      setImageUrl(res.data.avatarUrl);
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload thất bại!");
    }
  };

  return (
    <div style={{ background: "#1b2130", padding: 20, borderRadius: 10 }}>
      <h3 style={{ color: "white" }}>📸 Upload Avatar</h3>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          style={{
            background: "#111827",
            color: "#fff",
            border: "1px solid #3a3f4b",
            padding: "10px",
            borderRadius: "6px",
          }}
        />
        <button
          type="submit"
          style={{
            marginLeft: 10,
            padding: "10px 15px",
            border: "none",
            backgroundColor: "#22c55e",
            color: "#fff",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Upload
        </button>
      </form>

      <p style={{ color: "white", marginTop: 10 }}>{message}</p>

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Avatar"
          width="150"
          height="150"
          style={{
            marginTop: 10,
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid #22c55e",
          }}
        />
      )}
    </div>
  );
}
