// src/ReservationForm.js
import React, { useState } from "react";
import axios from "axios";

const ReservationForm = ({ token }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [typeOfService, setTypeOfService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/reservations",
        {
          name,
          phoneNumber,
          typeOfService,
          date,
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Reservation made:", response.data);
    } catch (error) {
      console.error("Error making reservation:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Make a Reservation</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Type of Service:</label>
        <select
          value={typeOfService}
          onChange={(e) => setTypeOfService(e.target.value)}
          required
        >
          <option value="">Select a service</option>
          <option value="Haircuts and Styling">Haircuts and Styling</option>
          <option value="Manicure and Pedicure">Manicure and Pedicure</option>
          <option value="Facial Treatments">Facial Treatments</option>
        </select>
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <button type="submit">Make Reservation</button>
    </form>
  );
};

export default ReservationForm;
