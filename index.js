require("dotenv").config();
const app = require("./src/app");
const db = require("./src/models");

const PORT = process.env.PORT || 3000;

const sequelize = require("./src/config/sequelize");

sequelize
  .authenticate()
  .then(() => console.log("✅ Connected to local MySQL"))
  .catch((err) => console.error("❌ Connection failed:", err));

db.sequelize.sync({ alter: true }).then(() => {
  console.log("DB synced");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
