// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authRoutes = (sequelize) => {
  const router = express.Router();
  const UserModel = User(sequelize);

  // Register route
  router.post("/register", async (req, res) => {
    try {
      const { fullName, email, phoneNumber, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await UserModel.create({
        fullName,
        email,
        phoneNumber,
        password: hashedPassword,
      });
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Login route
  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ where: { email } });
      if (!user) return res.status(404).json({ error: "User not found" });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.status(401).json({ error: "Invalid password" });

      const token = jwt.sign({ userId: user.id, role: user.role }, "secretkey");
      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};

module.exports = authRoutes;
