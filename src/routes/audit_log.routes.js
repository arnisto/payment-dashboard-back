const express = require("express");
const router = express.Router();
const auditLogController = require("../controllers/audit_log.controller");
const auth = require("../middlewares/auth");

router.get("/", auth(), auditLogController.getAllLogs);
router.get("/:id", auth(), auditLogController.getLogById);
router.get(
  "/entity/:entity_type/:entity_id",
  auth(),
  auditLogController.getLogsByEntity
);
router.get("/user/:user_id", auth(), auditLogController.getLogsByUser);

module.exports = router;
