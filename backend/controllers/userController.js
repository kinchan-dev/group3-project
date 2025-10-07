const User = require('../models/User');

// GET: Lấy danh sách người dùng
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy dữ liệu', error });
  }
};

// POST: Thêm người dùng mới
const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi thêm người dùng', error });
  }
};

module.exports = { getUsers, createUser };