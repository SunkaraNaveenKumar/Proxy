const authorizeUser = (allowedRoles) => {
  return (req, res, next) => {
    if (req.user || req.admin) {
      if (allowedRoles.includes(req.user?.role || req.admin?.role)) {
        next();
      } else {
        res.status(403).json({
          errors: "The User does not have permission to access the resource",
        });
      }
    } else res.status(401).json({ errors: "user is not authorized" });
  };
};

module.exports = authorizeUser
