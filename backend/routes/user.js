const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController"); // ✅ KHÔNG có dấu ()

const User = require("../models/User");

// ✅ GET: Lấy danh sách users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ POST: Thêm user mới
router.post("/", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
    });
    const newUser = await user.save();
    res.json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ PUT: Cập nhật user
router.put("/:id", userController.updateUser);

// ✅ DELETE: Xóa user
router.delete("/:id", userController.deleteUser);

module.exports = router;
