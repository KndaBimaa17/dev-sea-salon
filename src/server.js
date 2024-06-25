// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Sequelize } = require("sequelize");
const reservationRoutes = require("./routes/reservations");
const reviewRoutes = require("./routes/reviews");
const authRoutes = require("../routes/Auth");
const authenticate = require("../middleware/Auth");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
const sequelize = new Sequelize("sea_salon", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("Connected to MySQL"))
  .catch((err) => console.error("Unable to connect to MySQL:", err));

// Sync models
sequelize.sync({ force: true }).then(() => {
  console.log("Database & tables created!");
  const UserModel = require("./models/User")(sequelize);
  UserModel.create({
    fullName: "Thomas N",
    email: "thomas.n@compfest.id",
    phoneNumber: "08123456789",
    password: bcrypt.hashSync("Admin123", 10),
    role: "Admin",
  });
});

// Routes
app.use("/auth", authRoutes(sequelize));
app.use("/reservations", authenticate, reservationRoutes(sequelize));
app.use("/reviews", reviewRoutes(sequelize));

app.get("/", (req, res) => {
  res.send("SEA Salon API");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
