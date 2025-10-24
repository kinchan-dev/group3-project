const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const User = require("../models/User");

// Cấu hình lưu file lên Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "avatars",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

// API upload avatar
router.post("/upload-avatar", upload.single("avatar"), async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) return res.status(404).json({ message: "Không tìm thấy user" });

    user.avatar = req.file.path;
    await user.save();

    res.json({
      message: "✅ Upload thành công!",
      avatarUrl: req.file.path,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
