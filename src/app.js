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

app.use("/api-docs", swagger.serve, swagger.setup);

app.use("/api/users", userRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/audit-logs", auditLogRoutes);

app.use(errorHandler);

module.exports = app;
