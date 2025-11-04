const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const { upload, resizeImage } = require("../middleware/uploadAvatar");
const cloudinary = require("../config/cloudinary");
const User = require("../models/User");
const fs = require("fs");

router.post("/upload-avatar", verifyToken, upload.single("avatar"), resizeImage, async (req, res) => {
  try {
    const userId = req.user.id;
    if (!req.file) return res.status(400).json({ message: "Không có file!" });

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "avatars",
      public_id: `user_${userId}_${Date.now()}`,
    });

    fs.unlinkSync(req.file.path); // xóa file local sau upload

    const user = await User.findByIdAndUpdate(
      userId,
      { avatar: result.secure_url },
      { new: true }
    );

    res.json({
      message: "✅ Upload thành công!",
      avatarUrl: result.secure_url,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Lỗi upload avatar!" });
  }
});

module.exports = router;
