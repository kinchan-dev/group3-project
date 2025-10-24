const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// 1. Yêu cầu quên mật khẩu -> tạo token reset và lưu DB
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    // tìm user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email không tồn tại" });
    }

    // tạo token ngẫu nhiên
    const resetToken = crypto.randomBytes(20).toString("hex");

    // ⚠ BẢN TEST: lưu token thẳng vào DB, KHÔNG hash
    user.resetToken = resetToken;
    user.tokenExpire = Date.now() + 10 * 60 * 1000; // 10 phút
    await user.save();

    // trả token ra để bạn dùng ở bước /reset-password
    return res.json({
      message: "Token reset mật khẩu (dùng cho bước /reset-password)",
      resetToken: resetToken
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// 2. Reset mật khẩu bằng token
router.post("/reset-password", async (req, res) => {
  try {
    const { email, resetToken, newPassword } = req.body;

    // tìm user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email không tồn tại" });
    }

    // kiểm tra token khớp và chưa hết hạn
    if (
      !user.resetToken ||
      user.resetToken !== resetToken ||
      !user.tokenExpire ||
      Date.now() > user.tokenExpire
    ) {
      return res.status(400).json({ message: "Token không hợp lệ hoặc hết hạn" });
    }

    // đổi mật khẩu
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // xoá token reset (chỉ dùng 1 lần)
    user.resetToken = undefined;
    user.tokenExpire = undefined;
    await user.save();

    return res.json({ message: "✅ Đổi mật khẩu thành công!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
