const db = require("./src/models");
const bcrypt = require("bcrypt");

async function seed() {
  await db.sequelize.sync({ force: true });

  const passwordHash = await bcrypt.hash("supersecure", 10);

  const superadmin = await db.User.create({
    email: "superadmin@example.com",
    password_hash: passwordHash,
    role: "superadmin",
  });

  const user1 = await db.User.create({
    email: "user1@example.com",
    password_hash: await bcrypt.hash("userpass", 10),
    role: "user",
    parent_id: superadmin.id,
  });

  await db.Permission.bulkCreate([
    {
      user_id: user1.id,
      section: "bill",
      can_read: true,
      can_write: true,
      can_delete: false,
    },
    {
      user_id: user1.id,
      section: "payment",
      can_read: true,
      can_write: false,
      can_delete: false,
    },
  ]);

  const bill = await db.Bill.create({
    user_id: user1.id,
    client_name: "Acme Corp",
    client_email: "client@acme.com",
    amount_total: 1000,
    currency: "EUR",
    status: "pending",
  });

  await db.Payment.create({
    bill_id: bill.id,
    amount: 500,
    method: "virement",
    payment_date: new Date(),
  });

  await db.AuditLog.create({
    entity_type: "bill",
    entity_id: bill.id,
    action: "create",
    user_id: user1.id,
    timestamp: new Date(),
  });

  console.log("✅ Seed complete");
}

seed();
