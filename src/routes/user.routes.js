const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

// 🔐 Auth routes (optional later)
router.post("/login", userController.login);
router.post("/reset-password", userController.resetPassword);

// 👤 User CRUD
router.get("/", auth(), userController.getAllUsers);
router.get("/:id", auth(), userController.getUserById);
router.post("/", auth(), userController.createUser);
router.put("/:id", auth(), userController.updateUser);
router.delete("/:id", auth(), userController.deleteUser);

module.exports = router;
