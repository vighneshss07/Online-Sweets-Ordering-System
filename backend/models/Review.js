import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    feedback: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;
