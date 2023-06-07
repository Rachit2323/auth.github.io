import React from 'react';

const BookReviewList = ({ reviews }) => {
  return (
    <div>
      <h2>Book Reviews</h2>
      {reviews.map((review) => (
        <div key={review._id}>
          <h3>{review.title}</h3>
          <p>Author: {review.author}</p>
          <p>Review: {review.review}</p>
        </div>
      ))}
    </div>
  );
};

export default BookReviewList;
