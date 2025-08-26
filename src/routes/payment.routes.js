const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");
const auth = require("../middlewares/auth");
const checkPermission = require("../middlewares/checkPermission");

router.get("/", auth(), paymentController.getAllPayments);
router.get("/:id", auth(), paymentController.getPaymentById);
router.post("/", auth(), paymentController.createPayment);
router.put("/:id", auth(), paymentController.updatePayment);
router.delete(
  "/:id",
  auth(),
  checkPermission("payments", "delete"),
  paymentController.deletePayment
);

module.exports = router;
