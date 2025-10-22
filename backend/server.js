require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // 🟢 Thêm dòng này
const userRoutes = require("./routes/user");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const app = express();

dotenv.config(); // load .env
connectDB(); // connect MongoDB

app.use(cors()); // 🟢 Cho phép React (port 3001) gọi API từ port 3000
app.use(express.json());

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Kết nối MongoDB Atlas thành công"))
  .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

// Routes
app.use("/users", userRoutes);

// Chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server chạy tại cổng ${PORT}`));
