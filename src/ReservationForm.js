// src/ReservationForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

const ReservationForm = ({ token }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [typeOfService, setTypeOfService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [branchId, setBranchId] = useState("");
  const [branches, setBranches] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get("http://localhost:5000/branches", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBranches(response.data);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();
  }, [token]);

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = name ? "" : "Name is required.";
    tempErrors.phoneNumber = phoneNumber ? "" : "Phone number is required.";
    tempErrors.typeOfService = typeOfService
      ? ""
      : "Type of service is required.";
    tempErrors.date = date ? "" : "Date is required.";
    tempErrors.time = time ? "" : "Time is required.";
    tempErrors.branchId = branchId ? "" : "Branch is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).every((x) => tempErrors[x] === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/reservations",
        {
          name,
          phoneNumber,
          typeOfService,
          date,
          time,
          branchId,
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
    <div className="container">
      <h2>Make a Reservation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
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
          {errors.typeOfService && (
            <p className="error">{errors.typeOfService}</p>
          )}
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          {errors.date && <p className="error">{errors.date}</p>}
        </div>
        <div>
          <label>Time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
          {errors.time && <p className="error">{errors.time}</p>}
        </div>
        <div>
          <label>Branch:</label>
          <select
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            required
          >
            <option value="">Select a branch</option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name} - {branch.location}
              </option>
            ))}
          </select>
          {errors.branchId && <p className="error">{errors.branchId}</p>}
        </div>
        <button type="submit">Make Reservation</button>
      </form>
    </div>
  );
};

export default ReservationForm;
