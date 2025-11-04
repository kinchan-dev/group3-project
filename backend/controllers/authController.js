const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");

// ------------------ SIGNUP ------------------
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email đã tồn tại" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ------------------ LOGIN ------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Email không tồn tại" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Sai mật khẩu" });

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
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    res.status(200).json({
      message: "Đăng nhập thành công!",
      accessToken,
      refreshToken,
      role: user.role,
      userId: user._id
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ------------------ LOGOUT ------------------
exports.logout = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "Token required" });

    await RefreshToken.deleteOne({ token });
    res.status(200).json({ message: "Đăng xuất thành công, refresh token đã bị thu hồi!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
