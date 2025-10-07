// controllers/userController.js
let users = [
  { id: 1, name: 'Trị', email: 'tri226320@student.nctu.edu.vn' },
  { id: 2, name: 'Kiên', email: 'kien220415@student.nctu.edu.vn' }
];

const getUsers = (req, res) => {
  res.status(200).json(users);
};

const createUser = (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.status(201).json(newUser);
};

module.exports = { getUsers, createUser };
