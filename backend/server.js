require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');   // 🟢 THÊM DÒNG NÀY
const app = express();

app.use(express.json());

// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Kết nối MongoDB Atlas thành công'))
  .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

// Import route
const userRoutes = require('./routes/user');
app.use('/users', userRoutes);

// Chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server chạy tại cổng ${PORT}`));