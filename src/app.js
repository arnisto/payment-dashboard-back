const express = require("express");
const app = express();
const userRoutes = require("./routes/user.routes");
const errorHandler = require("./middlewares/errorHandler");
const permissionRoutes = require("./routes/permission.routes");
const billRoutes = require("./routes/bill.routes");
const paymentRoutes = require("./routes/payment.routes");
const auditLogRoutes = require("./routes/audit_log.routes");

app.use(express.json());

const swagger = require("./config/swagger");

// Basic CORS middleware to allow frontend dev origin
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use("/api-docs", swagger.serve, swagger.setup);

app.use("/api/users", userRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/audit-logs", auditLogRoutes);

app.use(errorHandler);

module.exports = app;
