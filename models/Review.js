// models/Review.js
const { DataTypes } = require("sequelize");

const Review = (sequelize) => {
  return sequelize.define("Review", {
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    starRating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};

module.exports = Review;
