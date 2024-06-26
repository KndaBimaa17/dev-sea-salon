import React, { useState } from "react";
import "./styles.css";
import ReservationForm from "./ReservationForm";
import ReviewForm from "./ReviewForm";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const App = () => {
  const [reviews, setReviews] = useState([]);
  const [token, setToken] = useState("");
  const [showLogin, setShowLogin] = useState(true);

  const addReview = (review) => {
    setReviews([...reviews, review]);
  };

  return (
    <div className="App">
      <h1>SEA Salon</h1>
      {!token ? (
        <>
          {showLogin ? (
            <>
              <LoginForm setToken={setToken} />
              <p>
                Don't have an account?{" "}
                <a href="#" onClick={() => setShowLogin(false)}>
                  Register
                </a>
              </p>
            </>
          ) : (
            <>
              <RegisterForm />
              <p>
                Already have an account?{" "}
                <a href="#" onClick={() => setShowLogin(true)}>
                  Login
                </a>
              </p>
            </>
          )}
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
