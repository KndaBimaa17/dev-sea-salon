// src/AdminDashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = ({ token }) => {
  const [branches, setBranches] = useState([]);
  const [branchName, setBranchName] = useState("");
  const [branchLocation, setBranchLocation] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");

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

  const handleCreateBranch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/branches",
        {
          name: branchName,
          location: branchLocation,
          openingTime,
          closingTime,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBranches([...branches, response.data]);
      setBranchName("");
      setBranchLocation("");
      setOpeningTime("");
      setClosingTime("");
    } catch (error) {
      console.error("Error creating branch:", error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleCreateBranch}>
        <h3>Create Branch</h3>
        <div>
          <label>Branch Name:</label>
          <input
            type="text"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Branch Location:</label>
          <input
            type="text"
            value={branchLocation}
            onChange={(e) => setBranchLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Opening Time:</label>
          <input
            type="time"
            value={openingTime}
            onChange={(e) => setOpeningTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Closing Time:</label>
          <input
            type="time"
            value={closingTime}
            onChange={(e) => setClosingTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Branch</button>
      </form>
      <div>
        <h3>Existing Branches</h3>
        <ul>
          {branches.map((branch) => (
            <li key={branch.id}>
              {branch.name} - {branch.location} (Open: {branch.openingTime} -
              Close: {branch.closingTime})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
