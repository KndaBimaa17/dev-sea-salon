const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const Branch = require("./models/Branch")(sequelize);
const Reservation = require("./models/Reservation")(sequelize);

const app = express();
app.use(bodyParser.json());

// Routes
const branchRoutes = require("./routes/branches")(sequelize);
const reservationRoutes = require("./routes/reservations")(sequelize);
app.use("/branches", branchRoutes);
app.use("/reservations", reservationRoutes);

// Synchronize sequelize
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Error synchronizing database:", err);
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
