import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  productId: {
    type: String, // Change from ObjectId to String
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
