const ActivityLog = require("../models/ActivityLog");

const logActivity = async (userId, action, req = null) => {
  try {
    await ActivityLog.create({
      userId: userId || null,
      action,
      ip: req?.ip || "unknown",
      userAgent: req?.headers["user-agent"] || "unknown",
    });
  } catch (error) {
    console.error("❌ Lỗi ghi log:", error.message);
  }
};

module.exports = logActivity;
