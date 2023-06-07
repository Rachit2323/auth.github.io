const express = require('express');
const router = express.Router();

const { BookReview } = require("../models/book.js");
const { User } = require("../models/user.js");


router.post('/book-reviews', async (req, res) => {
  console.log(req.body);
  try {
    const { title, author, rating, review } = req.body;
    const userId = req.header('userId'); // Extract the userId from the header

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a new book review
    const newReview = new BookReview({
      title,
      author,
      rating,
      review,
      user: user._id, // Assign the user's ID to the 'user' field
    });

    // Save the book review
    await newReview.save();

    // Add the book review to the user's bookReviews array
    user.bookReviews.push(newReview._id);
    await user.save();

    res.status(201).json({ message: 'Book review added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add book review' });
  }
});

// Route to display existing book reviews
router.get('/book-reviews', async (req, res) => {
  try {
    const reviews = await BookReview.find({}, 'title author review').exec();

    res.json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch book reviews' });
  }
});

router.get('/book-reviews/search', async (req, res) => {
  try {
    const { title, author } = req.query;

    const filter = {};
    if (title) filter.title = { $regex: title, $options: 'i' };
    if (author) filter.author = { $regex: author, $options: 'i' };

    const reviews = await BookReview.find(filter, 'title author review').exec();

    res.json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch book reviews' });
  }
});

module.exports = router;
