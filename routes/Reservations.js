// routes/reservations.js
const express = require('express');
const Reservation = require('../models/Reservation');

const reservationRoutes = (sequelize) => {
  const router = express.Router();
  const ReservationModel = Reservation(sequelize);

  router.post('/', async (req, res) => {
    try {
      const { name, phoneNumber, service, dateTime } = req.body;
      const reservation = await ReservationModel.create({ name, phoneNumber, service, dateTime });
      res.status(201).json(reservation);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};

module.exports = reservationRoutes;