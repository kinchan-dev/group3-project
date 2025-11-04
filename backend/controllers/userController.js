const User = require("../models/User");

// 🟢 Lấy danh sách user
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 Cập nhật user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // ✅ Kiểm tra quyền
    if (req.user.role !== "admin" && req.user.id !== id) {
      return res.status(403).json({ message: "Không có quyền cập nhật user này!" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "Không tìm thấy user!" });

    if (name) user.name = name;
    if (email) user.email = email;
    if (password && password.trim() !== "") user.password = password;

    await user.save();

    res.status(200).json({
      message: "✅ Cập nhật user thành công!",
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("❌ Lỗi cập nhật user:", err);
    res.status(500).json({ message: "Lỗi khi cập nhật user!" });
  }
};

// 🟢 Xóa user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user.role !== "admin" && req.user.id !== id) {
      return res.status(403).json({ message: "Không có quyền xóa user này!" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "🗑️ Xóa user thành công!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
