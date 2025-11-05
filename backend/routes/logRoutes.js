const express = require("express");
const router = express.Router();
const ActivityLog = require("../models/ActivityLog");

// 🧩 Chỉ admin mới được xem
router.get("/", async (req, res) => {
  try {
    const logs = await ActivityLog.find().populate("userId", "email name").sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy logs!" });
  }
});

module.exports = router;
