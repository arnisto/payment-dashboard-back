const db = require("../models");

exports.getAllBills = async (req, res, next) => {
  try {
    const bills = await db.Bill.findAll({ include: db.Payment });
    res.json(bills);
  } catch (err) {
    next(err);
  }
};

exports.getBillById = async (req, res, next) => {
  try {
    const bill = await db.Bill.findByPk(req.params.id, { include: db.Payment });
    if (!bill) return res.status(404).json({ message: "Bill not found" });
    res.json(bill);
  } catch (err) {
    next(err);
  }
};

exports.createBill = async (req, res, next) => {
  try {
    const {
      user_id,
      client_name,
      client_email,
      amount_total,
      currency,
      status,
    } = req.body;
    const bill = await db.Bill.create({
      user_id,
      client_name,
      client_email,
      amount_total,
      currency,
      status,
    });

    await db.AuditLog.create({
      entity_type: "bill",
      entity_id: bill.id,
      action: "create",
      user_id,
      timestamp: new Date(),
    });

    res.status(201).json(bill);
  } catch (err) {
    next(err);
  }
};

exports.updateBill = async (req, res, next) => {
  try {
    const bill = await db.Bill.findByPk(req.params.id);
    if (!bill) return res.status(404).json({ message: "Bill not found" });

    await bill.update(req.body);

    await db.AuditLog.create({
      entity_type: "bill",
      entity_id: bill.id,
      action: "update",
      user_id: req.body.user_id || bill.user_id,
      timestamp: new Date(),
    });

    res.json(bill);
  } catch (err) {
    next(err);
  }
};

exports.deleteBill = async (req, res, next) => {
  try {
    const bill = await db.Bill.findByPk(req.params.id);
    if (!bill) return res.status(404).json({ message: "Bill not found" });

    await db.AuditLog.create({
      entity_type: "bill",
      entity_id: bill.id,
      action: "delete",
      user_id: bill.user_id,
      timestamp: new Date(),
    });

    await bill.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
