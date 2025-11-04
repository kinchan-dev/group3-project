const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

// ✅ GET: Lấy danh sách user (chỉ admin xem được)
router.get("/", verifyToken, isAdmin, userController.getUsers);

// ✅ PUT: Cập nhật user
router.put("/:id", verifyToken, userController.updateUser);

// ✅ DELETE: Xóa user
router.delete("/:id", verifyToken, userController.deleteUser);

module.exports = router;
