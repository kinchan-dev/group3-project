const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "moderator", "admin"], // ✅ thêm moderator
    default: "user"
  },
  resetToken: { type: String },
  tokenExpire: { type: Number },
  
  avatar: { type: String, default: "" },
});

module.exports = mongoose.model("User", userSchema);
