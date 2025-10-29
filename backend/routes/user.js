const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken, isAdmin } = require("../middleware/verifyToken");

// ✅ GET: Lấy danh sách users (chỉ admin mới được phép)
router.get("/", verifyToken, isAdmin, userController.getUsers);

// ✅ POST: Thêm user mới (chỉ admin)
router.post("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Kiểm tra đủ thông tin
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Thiếu thông tin cần thiết!" });
    }

    // Tạo user mới
    const newUser = new (require("../models/User"))({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "Thêm user thành công!", user: newUser });
  } catch (err) {
    console.error("❌ Lỗi thêm user:", err.message);
    res.status(400).json({ message: "Không thể thêm user!" });
  }
});

// ✅ PUT: Cập nhật user
router.put("/:id", verifyToken, userController.updateUser);

// ✅ DELETE: Xóa user
router.delete("/:id", verifyToken, userController.deleteUser);

module.exports = router;
