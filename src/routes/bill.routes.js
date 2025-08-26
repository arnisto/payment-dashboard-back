const express = require("express");
const router = express.Router();
const billController = require("../controllers/bill.controller");
const auth = require("../middlewares/auth");

router.get("/", auth(), billController.getAllBills);
router.get("/:id", auth(), billController.getBillById);
router.post("/", auth(), billController.createBill);
router.put("/:id", auth(), billController.updateBill);
router.delete("/:id", auth(), billController.deleteBill);

module.exports = router;
