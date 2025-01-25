import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showFeedbackSection, setShowFeedbackSection] = useState(false);
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);

  // Fetch product data
  const fetchProductData = () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };

  // Fetch reviews from localStorage
  const fetchReviews = () => {
    const savedReviews = JSON.parse(localStorage.getItem(`reviews-${productId}`)) || [];
    setReviews(savedReviews);
    const totalRating = savedReviews.reduce((acc, review) => acc + review.rating, 0);
    setTotalRatings(totalRating);
  };

  // Handle review submission
  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (feedback && name && rating > 0) {
      const newReview = { id: Date.now(), name, feedback, rating };
      const updatedReviews = [newReview, ...reviews];
      setReviews(updatedReviews);

      // Save the review to localStorage
      localStorage.setItem(`reviews-${productId}`, JSON.stringify(updatedReviews));

      const updatedTotalRatings = totalRatings + rating;
      setTotalRatings(updatedTotalRatings);

      setFeedback('');
      setName('');
      setRating(0);

      alert('Thank you for your feedback!');
    } else {
      alert('Please fill out all fields and provide a rating!');
    }
  };

  // Handle rating change
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  // Handle delete review
  const handleDeleteReview = (reviewId) => {
    const updatedReviews = reviews.filter((review) => review.id !== reviewId);
    setReviews(updatedReviews);

    // Remove the review from localStorage
    const savedReviews = JSON.parse(localStorage.getItem(`reviews-${productId}`)) || [];
    const updatedSavedReviews = savedReviews.filter((review) => review.id !== reviewId);
    localStorage.setItem(`reviews-${productId}`, JSON.stringify(updatedSavedReviews));
  };

  // Calculate average rating
  const averageRating = reviews.length > 0 ? totalRatings / reviews.length : 0;

  useEffect(() => {
    fetchProductData();
    fetchReviews();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="[w-24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt="Product"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="Product" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {/* Display Average Rating */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  src={index < Math.floor(averageRating) ? assets.star_icon : assets.star_dull_icon}
                  alt="Star"
                  className="w-3.5"
                />
              ))}
            </div>
            <p className="pl-2">({reviews.length} reviews)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency} {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select quantity</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => {
                    setSize(item);
                    setShowFeedbackSection(true);
                  }}
                  className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
           onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews ({reviews.length})</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Organic products are crafted with nature's finest, free from harmful chemicals and synthetic additives. They ensure health, sustainability, and a greener planet for future generations.
          </p>
          <p>
            Organic products are made from naturally grown ingredients, preserving purity and quality. They're better for your health and kinder to the environment.
          </p>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mt-20">
        <h2>Customer Reviews</h2>
        <ul className="list-none p-0">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <li
                key={review.id}
                className="mb-4 p-4 border rounded bg-gray-100"
              >
                <strong>{review.name}</strong>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <img
                      key={index}
                      src={index < review.rating ? assets.star_icon : assets.star_dull_icon}
                      alt="Star"
                      className="w-3.5"
                    />
                  ))}
                </div>
                <p>{review.feedback}</p>
                <button
                  onClick={() => handleDeleteReview(review.id)}
                  className="mt-2 text-red-500 cursor-pointer"
                >
                  Delete Review
                </button>
              </li>
            ))
          ) : (
            <p>No reviews yet. Be the first to leave one!</p>
          )}
        </ul>

        {/* Feedback Form */}
        <form onSubmit={handleSubmitFeedback} className="mt-10">
          <h3 className="mb-4 text-lg font-medium">Submit Your Feedback</h3>
          <div className="mb-4">
            <label className="block mb-1">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Feedback:</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Rating:</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <img
                  key={star}
                  src={star <= rating ? assets.star_icon : assets.star_dull_icon}
                  alt="Star"
                  className="w-6 cursor-pointer"
                  onClick={() => handleRatingChange(star)}
                />
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded"
          >
            Submit Feedback
          </button>
        </form>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
