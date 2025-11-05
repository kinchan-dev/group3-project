import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // ❌ Nếu chưa đăng nhập → chuyển về login
  if (!isAuthenticated) return <Navigate to="/" replace />;

  // ⚠️ Nếu không đủ quyền → về trang profile
  if (roles && !roles.includes(user?.role)) return <Navigate to="/profile" replace />;

  return children;
}