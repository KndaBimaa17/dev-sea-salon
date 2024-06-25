// src/App.js
import React, { useState } from "react";
import "./styles.css";
import ReservationForm from "./ReservationForm";
import ReviewForm from "./ReviewForm";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const App = () => {
  const [reviews, setReviews] = React.useState([]);
  const [token, setToken] = useState("");

  const addReview = (review) => {
    setReviews([...reviews, review]);
  };

  return (
    <div className="App">
      <h1>SEA Salon</h1>
      {!token ? (
        <>
          <RegisterForm />
          <LoginForm setToken={setToken} />
        </>
      ) : (
        <>
          <ReservationForm token={token} />
          <ReviewForm addReview={addReview} />
          <div className="reviews">
            <h2>Customer Reviews</h2>
            {reviews.map((review, index) => (
              <div key={index}>
                <h3>{review.customerName}</h3>
                <p>Rating: {review.starRating}</p>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
