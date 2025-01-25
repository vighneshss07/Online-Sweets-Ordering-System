import express from 'express';
import mongoose from 'mongoose';
import Review from '../models/Review.js'; // Ensure this path is correct based on your folder structure

const router = express.Router();

// Route to submit a new review
router.post('/submit-review', async (req, res) => {
  const { productId, name, feedback, rating } = req.body;

  const newReview = new Review({
    productId,
    name,
    feedback,
    rating,
  });

  try {
    await newReview.save();
    res.status(201).json({ message: 'Review submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving review', details: error.message });
  }
});

// Route to fetch reviews for a specific product by productId
router.get('/reviews/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.find({ productId }).exec();

    // Calculate average rating
    const totalRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = reviews.length > 0 ? totalRatings / reviews.length : 0;

    res.status(200).json({
      reviews,
      averageRating: averageRating.toFixed(1),
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reviews', details: error.message });
  }
});

export default router;
