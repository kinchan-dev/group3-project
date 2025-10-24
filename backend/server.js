require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
const profileRoutes = require("./routes/profileRoutes");
const userRoutes = require("./routes/userRoutes");

// 🟢 Import đúng router mới
const authRoutes = require("./routes/authRoutes");

const app = express();

connectDB(); // Kết nối MongoDB
app.use(cors({ origin: "http://localhost:3001" })); // Cho phép React gọi API
app.use(express.json());


// Routes chính
app.use("/api/auth", authRoutes); // ✅ Dùng /api/auth thay vì /users
app.use("/api/profile", profileRoutes);
app.use("/api/users", userRoutes);
// Chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server chạy tại cổng ${PORT}`));
