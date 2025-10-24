const User = require("../models/User");
const bcrypt = require("bcryptjs");

// [GET] /api/profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // lấy từ middleware xác thực
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "Không tìm thấy user" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// [PUT] /api/profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, password } = req.body;

    const updateData = { name, email };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updated = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");
    res.status(200).json({ message: "Cập nhật thành công!", user: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
