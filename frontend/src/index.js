import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ResetPassword from "./components/ResetPassword";
import reportWebVitals from "./reportWebVitals";
import "@fortawesome/fontawesome-free/css/all.min.css";

// 🟢 Thêm React Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Route trang chính */}
        <Route path="/" element={<App />} />

        {/* Route khi người dùng bấm link trong email */}
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();