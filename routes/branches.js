// routes/branches.js
const express = require("express");
const Branch = require("../models/Branch");
const { check, validationResult } = require("express-validator");

const branchRoutes = (sequelize) => {
  const router = express.Router();
  const BranchModel = Branch(sequelize);

  // Create a new branch
  router.post(
    "/",
    [
      check("name").not().isEmpty().withMessage("Name is required"),
      check("location").not().isEmpty().withMessage("Location is required"),
      check("openingTime")
        .not()
        .isEmpty()
        .withMessage("Opening time is required"),
      check("closingTime")
        .not()
        .isEmpty()
        .withMessage("Closing time is required"),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const { name, location, openingTime, closingTime } = req.body;
        const branch = await BranchModel.create({
          name,
          location,
          openingTime,
          closingTime,
        });
        res.status(201).json(branch);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  );

  // Get all branches
  router.get("/", async (req, res) => {
    try {
      const branches = await BranchModel.findAll();
      res.json(branches);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};

module.exports = branchRoutes;
