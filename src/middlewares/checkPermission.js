const Permission = require("../models/permission.model");

module.exports = function checkPermission(section, action) {
  return async (req, res, next) => {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    try {
      const permission = await Permission.findOne({
        where: { user_id: userId, section },
      });

      if (!permission || !permission[`can_${action}`]) {
        return res.status(403).json({ message: "Permission denied" });
      }

      next();
    } catch (err) {
      console.error("Permission check failed:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
