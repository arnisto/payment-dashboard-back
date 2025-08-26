const express = require("express");
const router = express.Router();
const auditLogController = require("../controllers/audit_log.controller");

router.get("/", auditLogController.getAllLogs);
router.get("/:id", auditLogController.getLogById);
router.get(
  "/entity/:entity_type/:entity_id",
  auditLogController.getLogsByEntity
);
router.get("/user/:user_id", auditLogController.getLogsByUser);

module.exports = router;
