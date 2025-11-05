const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const sendEmail = require("../utils/sendEmail");

// =================== SIGNUP ===================
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email đã tồn tại!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "✅ Đăng ký thành công!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =================== LOGIN ===================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "❌ Email không tồn tại!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "❌ Sai mật khẩu!" });

    // 🟢 Access token (15 phút)
    const accessToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // 🟢 Refresh token (7 ngày)
    const refreshToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // Lưu refresh token vào DB
    await RefreshToken.create({
      token: refreshToken,
      userId: user._id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.status(200).json({
      message: "✅ Đăng nhập thành công!",
      accessToken,
      refreshToken,
      role: user.role,
      userId: user._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// =================== LOGOUT ===================
exports.logout = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token)
      return res.status(400).json({ message: "⚠️ Thiếu refresh token!" });

    await RefreshToken.deleteOne({ token });
    res.json({ message: "✅ Đăng xuất thành công!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =================== FORGOT PASSWORD ===================
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "❌ Email không tồn tại trong hệ thống!" });

    // 🔑 Tạo token có hạn 15 phút
    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // 🔗 Tạo link reset
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // 📧 Gửi email reset
    const html = `
      <h2>Đặt lại mật khẩu</h2>
      <p>Bấm vào liên kết bên dưới để đặt lại mật khẩu của bạn (hiệu lực trong 15 phút):</p>
      <a href="${resetLink}" target="_blank">${resetLink}</a>
    `;

    await sendEmail(email, "Đặt lại mật khẩu", html);
    res.json({ message: "✅ Email đặt lại mật khẩu đã được gửi!" });
  } catch (err) {
    console.error("❌ Lỗi gửi email:", err);
    res.status(500).json({ message: "❌ Lỗi khi gửi email đặt lại mật khẩu!" });
  }
};

// =================== RESET PASSWORD ===================
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // 🔍 Giải mã token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user)
      return res.status(400).json({ message: "❌ Token không hợp lệ hoặc người dùng không tồn tại!" });

    // 🔒 Mã hoá mật khẩu mới
    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    await user.save();

    res.json({ message: "✅ Mật khẩu đã được đặt lại thành công!" });
  } catch (err) {
    console.error("❌ Lỗi reset password:", err);
    res.status(500).json({ message: "❌ Token không hợp lệ hoặc đã hết hạn!" });
  }
};
