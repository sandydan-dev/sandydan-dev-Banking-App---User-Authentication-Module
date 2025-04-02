const roleAuthorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access Forbidden",
        details: `User role '${req.user.role}' does not have access to this resource`,
      });
    }

    next();
  };
};

module.exports = roleAuthorize;
