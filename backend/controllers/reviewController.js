// ReviewController.js (Backend)

import { Review } from '../models/productModel';

export const submitReview = async (req, res) => {
  try {
    const { productId, name, feedback, rating } = req.body;

    // Create a new review object
    const newReview = new Review({
      productId,
      name,
      feedback,
      rating,
    });

    // Save the review in the database
    await newReview.save();

    // Send a response to the frontend
    res.status(201).json({ message: 'Review submitted successfully!', review: newReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving review!' });
  }
};
