// src/ReviewsList.js
import React from "react";

const ReviewsList = ({ reviews }) => {
  return (
    <div>
      <h2>Customer Reviews</h2>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <p>
              <strong>{review.name}</strong>
            </p>
            <p>Rating: {review.rating}</p>
            <p>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsList;
