const mongoose = require('mongoose');
const { User } = require('./user.js');

// Define the book review schema
const bookReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});
 
// Create the book review model
const BookReview = mongoose.model('BookReview', bookReviewSchema);
module.exports = { BookReview };
