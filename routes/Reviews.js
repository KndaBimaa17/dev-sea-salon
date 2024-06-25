// routes/reviews.js
const express = require("express");
const Review = require("../models/Review");

const reviewRoutes = (sequelize) => {
  const router = express.Router();
  const ReviewModel = Review(sequelize);

  router.post("/", async (req, res) => {
    try {
      const { customerName, starRating, comment } = req.body;
      const review = await ReviewModel.create({
        customerName,
        starRating,
        comment,
      });
      res.status(201).json(review);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};

module.exports = reviewRoutes;
