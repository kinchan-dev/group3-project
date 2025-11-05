import React from "react";
import AdminUserList from "../components/AdminUserList";

export default function ModeratorPage() {
  return (
    <div>
      <h2 className="text-center text-success mt-3">Moderator Dashboard</h2>
      <p className="text-center text-muted" style={{ fontSize: "1.2em", color: "#555" }}>
        👋 Chào bạn! Bạn có thể xem danh sách user nhưng không thể xóa.
      </p>

      {/* Dùng lại danh sách người dùng nhưng vẫn giữ phân quyền */}
      <div className="container mt-4">
        <AdminUserList />
      </div>
    </div>
  );
}
