// models/Reservation.js
const { DataTypes } = require('sequelize');

const Reservation = (sequelize) => {
  return sequelize.define('Reservation', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    service: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateTime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });
};

module.exports = Reservation;