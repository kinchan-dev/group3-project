import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ResetPassword from "./components/ResetPassword";
import reportWebVitals from "./reportWebVitals";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

// ✅ Import thêm các component được dùng trong route
import ProtectedRoute from "./components/ProtectedRoute";
import AdminUserList from "./components/AdminUserList";
import ProfilePage from "./components/ProfilePage";
import ModeratorPage from "./components/ModeratorPage";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Trang chính */}
          <Route path="/" element={<App />} />

          {/* Trang reset mật khẩu */}
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* ✅ Trang dành cho admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminUserList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/moderator"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Moderator"]}>
                <ModeratorPage />
              </ProtectedRoute>
            }
          />

          {/* ✅ Trang dành cho user đã đăng nhập */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();