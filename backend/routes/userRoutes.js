const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const { checkRole } = require("../middleware/checkRole");
const User = require("../models/User");

// ✅ ADMIN xem toàn bộ user
router.get("/", verifyToken, checkRole("admin","moderator"), async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// ✅ MODERATOR và ADMIN đều có thể xem 1 user cụ thể
router.get("/:id", verifyToken, checkRole("admin", "moderator"), async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).json({ message: "User không tồn tại!" });
  res.json(user);
});

// ✅ ADMIN và MODERATOR có thể sửa user (PUT)
router.put("/:id", verifyToken, checkRole("admin", "moderator"), async (req, res) => {
  try {
    const { name, email, role } = req.body;

    // Chỉ admin được đổi role
    if (role && req.user.role !== "admin") {
      return res.status(403).json({ message: "Chỉ admin mới được đổi quyền người dùng!" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, ...(role ? { role } : {}) },
      { new: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ message: "User không tồn tại!" });

    res.json({ message: "Cập nhật user thành công!", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi cập nhật user!", error: err.message });
  }
});

// ✅ ADMIN được phép xóa user
router.delete("/:id", verifyToken, checkRole("admin"), async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Xóa user thành công!" });
});

module.exports = router;
