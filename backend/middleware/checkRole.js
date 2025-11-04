exports.checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user.role; // req.user được set trong verifyToken
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "Bạn không có quyền truy cập!" });
      }
      next();
    } catch (err) {
      return res.status(401).json({ message: "Xác thực thất bại!" });
    }
  };
};
