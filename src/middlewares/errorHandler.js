module.exports = (err, req, res, next) => {
  console.error("🔥 Error caught:", err);

  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    },
  });
};
