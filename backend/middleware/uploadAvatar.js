const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// Lưu tạm ảnh
const upload = multer({ dest: "uploads/" });

const resizeImage = async (req, res, next) => {
  if (!req.file) return next();

  const filePath = req.file.path;
  const outputPath = path.join("uploads", `resized-${Date.now()}.jpg`);

  try {
    await sharp(filePath)
      .resize(300, 300)
      .jpeg({ quality: 80 })
      .toFile(outputPath);

    fs.unlinkSync(filePath); // xóa file gốc
    req.file.path = outputPath; // thay bằng file đã resize
    next();
  } catch (err) {
    console.error("Lỗi resize ảnh:", err);
    res.status(500).json({ message: "Lỗi xử lý ảnh!" });
  }
};

module.exports = { upload, resizeImage };
