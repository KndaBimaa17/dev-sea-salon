// src/HomePage.js
import React, { useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewsList from "./ReviewsList";
import "./HomePage.css";

const HomePage = () => {
  const [reviews, setReviews] = useState([]);

  const addReview = (review) => {
    setReviews([...reviews, review]);
  };

  return (
    <div className="homepage">
      <header>
        <h1>SEA Salon</h1>
        <p className="slogan">Beauty and Elegance Redefined</p>
      </header>
      <section className="services">
        <h2>Our Services</h2>
        <ul>
          <li>Haircuts and Styling</li>
          <li>Manicure and Pedicure</li>
          <li>Facial Treatments</li>
        </ul>
      </section>
      <section className="contact">
        <h2>Contact Us</h2>
        <p>
          <strong>Thomas</strong>
        </p>
        <p>Phone Number: 08123456789</p>
        <p>
          <strong>Sekar</strong>
        </p>
        <p>Phone Number: 08164829372</p>
      </section>
      <ReviewForm addReview={addReview} />
      <ReviewsList reviews={reviews} />
    </div>
  );
};

export default HomePage;
