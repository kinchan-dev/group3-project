const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/RefreshToken");
const loginLimiter = require("../middleware/rateLimiter");
const logActivity = require("../middleware/logActivity");

// 🧩 Import toàn bộ controller
const {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

// ===================
// 🔐 AUTH BASIC ROUTES
// ===================
router.post("/signup", async (req, res, next) => {
  await logActivity(null, "Signup request", req);
  next();
}, signup);

router.post("/login", loginLimiter, async (req, res, next) => {
  await logActivity(null, "Login attempt", req);
  next();
}, login);

router.post("/logout", async (req, res, next) => {
  await logActivity(req.userId, "Logout", req);
  next();
}, logout);

// ===================
// 🔄 REFRESH TOKEN
// ===================
router.post("/refresh", async (req, res) => {
  const { token } = req.body;
  if (!token)
    return res.status(401).json({ message: "Refresh token required" });

  try {
    // Kiểm tra token trong DB
    const storedToken = await RefreshToken.findOne({ token });
    if (!storedToken)
      return res.status(403).json({ message: "Invalid refresh token" });

    // Kiểm tra hết hạn
    if (storedToken.expiresAt < Date.now()) {
      await RefreshToken.deleteOne({ token });
      return res.status(403).json({ message: "Refresh token expired" });
    }

    // Giải mã refresh token
    const userData = jwt.verify(token, process.env.REFRESH_SECRET);

    // Tạo access token mới
    const newAccessToken = jwt.sign(
      { id: userData.id, email: userData.email, role: userData.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: "Invalid refresh token" });
  }
});

// ===================
// 🧹 REVOKE TOKEN (Đăng xuất toàn hệ thống)
// ===================
router.post("/logout/revoke", async (req, res) => {
  const { token } = req.body;
  if (!token)
    return res.status(400).json({ message: "Token required" });

  await RefreshToken.deleteOne({ token });
  res.json({ message: "Logout successful, refresh token revoked" });
});

// ===================
// 🔑 FORGOT / RESET PASSWORD
// ===================
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// ===================
// 🧾 EXPORT
// ===================
module.exports = router;
