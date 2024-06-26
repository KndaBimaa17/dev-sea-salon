// models/Service.js
const { DataTypes } = require("sequelize");

const Service = (sequelize) => {
  return sequelize.define("Service", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false, // duration in minutes
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};

module.exports = Service;
