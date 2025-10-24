const User = require("../models/User");

// [GET] /api/users - chỉ Admin được xem danh sách
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// [DELETE] /api/users/:id - chỉ Admin hoặc chính chủ được xóa
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Nếu không phải admin thì chỉ được xóa tài khoản chính mình
    if (req.user.role !== "admin" && req.user.id !== id) {
      return res.status(403).json({ message: "Không có quyền xóa user này!" });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Xóa user thành công!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
