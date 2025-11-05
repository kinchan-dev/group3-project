const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 phút
  max: 5, // Chỉ cho phép 5 request / IP trong 10 phút
  message: {
    message: "⛔ Quá nhiều lần đăng nhập thất bại. Vui lòng thử lại sau 10 phút.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

console.log("✅ Rate limiter middleware loaded");

module.exports = loginLimiter;
