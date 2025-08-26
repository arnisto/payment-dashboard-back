const jwt = require("jsonwebtoken");

module.exports = function auth(required = true) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null;
    if (!token) return required ? res.status(401).json({ message: "Unauthorized" }) : next();
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || "dev_secret");
      req.user = payload;
      return next();
    } catch (e) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}


