const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },

  // 🟢 thêm 2 trường này để reset password hoạt động
  resetToken: { type: String },
  tokenExpire: { type: Number }, // lưu timestamp (Date.now())
  
  // 🟡 tùy chọn cho hoạt động 4
  avatar: { type: String }
});

module.exports = mongoose.model("User", userSchema);
