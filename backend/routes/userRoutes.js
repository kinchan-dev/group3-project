const express = require("express");
const router = express.Router();

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const { getUsers, deleteUser } = require("../controllers/userController");

router.get("/", verifyToken, isAdmin, getUsers);
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
