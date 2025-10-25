const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // sẽ tạo ở bước dưới

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Kiểm tra email tồn tại
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email đã tồn tại" });

    // Mã hoá mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Tìm user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email không tồn tại" });

    // 2️⃣ So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password); // ✅ khai báo biến ở đây
    console.log("password nhập:", password);
    console.log("password DB:", user.password);
    console.log("Kết quả bcrypt.compare:", isMatch);

    if (!isMatch) return res.status(400).json({ message: "Sai mật khẩu" });

    // 3️⃣ Tạo token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Đăng nhập thành công",
      token,
      role: user.role,
      userId: user._id // 👈 thêm userId để frontend dùng upload avatar
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};



exports.logout = (req, res) => {
  res.status(200).json({ message: "Đăng xuất thành công (xóa token phía client)" });
};
