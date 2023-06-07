import React, { useState } from 'react';

const AddBookReviewForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, author, rating, review });
    setTitle('');
    setAuthor('');
    setRating('');
    setReview('');
    setMessage('Book review added successfully!');
  };

  return (
    <div>
      {message && (
        <p style={{ color: 'green' }}>{message}</p>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Author:
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </label>
        <label>
          Rating:
          <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
        </label>
        <label>
          Review:
          <textarea value={review} onChange={(e) => setReview(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddBookReviewForm;
