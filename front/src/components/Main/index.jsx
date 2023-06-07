import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import AddBookReviewForm from './AddBookReviewForm';
import BookReviewList from './BookReviewList';
import BookReviewSearch from './BookReviewSearch';

const BookReviewApp = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);

  useEffect(() => {
    fetchBookReviews();
  }, []);

  const fetchBookReviews = async () => {
    try {
      const response = await axios.get('http://localhost:1523/api/book-reviews');
      const data = response.data.reviews;
      setReviews(data);
      setFilteredReviews(data);
    } catch (error) {
      console.error(error);
    }
  };

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken._id;

  const handleAddReview = async (reviewData) => {
    try {
      const response = await axios.post('http://localhost:1523/api/book-reviews', reviewData, {
        headers: {
          userId: userId,
        },
      });
      console.log(response.data);
      fetchBookReviews();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (searchQuery) => {
    try {
      const response = await axios.get('http://localhost:1523/api/book-reviews/search', {
        params: searchQuery,
      });
      const data = response.data.reviews;
      setFilteredReviews(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    // Perform logout functionality
    // For example, clear token from localStorage and redirect to the login page
    localStorage.removeItem('token');
    window.location.href = '/login'; // Replace '/login' with your desired logout route
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <h1>Book Reviews</h1>
      <AddBookReviewForm onSubmit={handleAddReview} />
      <BookReviewSearch onSearch={handleSearch} />
      <BookReviewList reviews={filteredReviews} />
    </div>
  );
};

export default BookReviewApp;
