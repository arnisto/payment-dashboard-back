module.exports = function authorize(requiredRole) {
  return (req, res, next) => {
    const user = req.user;

    if (!user || user.role !== requiredRole) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};
