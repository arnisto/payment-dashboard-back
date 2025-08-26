const db = require("../models");

exports.getAllPayments = async (req, res, next) => {
  try {
    const payments = await db.Payment.findAll({
      include: [{ model: db.Bill, as: "bill" }],
    });
    res.json(payments);
  } catch (err) {
    next(err);
  }
};

exports.getPaymentById = async (req, res, next) => {
  try {
    const payment = await db.Payment.findByPk(req.params.id, {
      include: [{ model: db.Bill, as: "bill" }],
    });
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.json(payment);
  } catch (err) {
    next(err);
  }
};

exports.createPayment = async (req, res, next) => {
  try {
    const { bill_id, amount, method, payment_date } = req.body;

    const bill = await db.Bill.findByPk(bill_id);
    if (!bill) return res.status(404).json({ message: "Bill not found" });

    const payment = await db.Payment.create({
      bill_id,
      amount,
      method,
      payment_date,
    });

    // Update bill status based on total payments
    const payments = await db.Payment.findAll({ where: { bill_id } });
    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);

    let newStatus = bill.status;
    if (totalPaid >= bill.amount_total) {
      newStatus = "paid";
    } else if (totalPaid > 0) {
      newStatus = "partialy_paid";
    }

    await bill.update({ status: newStatus });

    await db.AuditLog.create({
      entity_type: "payment",
      entity_id: payment.id,
      action: "create",
      user_id: bill.user_id,
      timestamp: new Date(),
      details: { bill_id, amount, method, payment_date },
    });

    res.status(201).json(payment);
  } catch (err) {
    next(err);
  }
};

exports.updatePayment = async (req, res, next) => {
  try {
    const payment = await db.Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    const before = payment.toJSON();
    await payment.update(req.body);

    await db.AuditLog.create({
      entity_type: "payment",
      entity_id: payment.id,
      action: "update",
      user_id: req.body.user_id || payment.bill_id,
      timestamp: new Date(),
      details: { before, after: payment.toJSON() },
    });

    res.json(payment);
  } catch (err) {
    next(err);
  }
};

exports.deletePayment = async (req, res, next) => {
  try {
    const payment = await db.Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    await db.AuditLog.create({
      entity_type: "payment",
      entity_id: payment.id,
      action: "delete",
      user_id: payment.bill_id,
      timestamp: new Date(),
      details: payment.toJSON(),
    });

    await payment.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
