const express = require("express");
const router = express.Router();
const permissionController = require("../controllers/permission.controller");
const auth = require("../middlewares/auth");

router.get("/", auth(), permissionController.getAllPermissions);
router.get("/:id", auth(), permissionController.getPermissionById);
router.post("/", auth(), permissionController.createPermission);
router.put("/:id", auth(), permissionController.updatePermission);
router.delete("/:id", auth(), permissionController.deletePermission);

module.exports = router;
