import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showReviews, setShowReviews] = useState(false);
  const [newReview, setNewReview] = useState('');
  const [reviewError, setReviewError] = useState('');
  const [isInReadingList, setIsInReadingList] = useState(false);
  const [userId, setUserId] = useState('664cdbf7afab467687153517'); // Replace with actual user ID

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/book/${id}`);
        setBook(response.data);

        // Fetch user data to check if the book is in the reading list
        const userResponse = await axios.get(`http://localhost:4000/api/user/${userId}`);
        setIsInReadingList(userResponse.data.readingList.includes(id));
      } catch (err) {
        setError(err.response?.data || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id, userId]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:4000/api/book/${id}/review`, { review: newReview });
      setBook(response.data);
      setNewReview('');
      setReviewError('');
    } catch (err) {
      setReviewError(err.response?.data || 'An error occurred while submitting the review');
    }
  };

  const toggleReadingList = async () => {
    try {
      if (isInReadingList) {
        await axios.post(`http://localhost:4000/api/user/${userId}/reading-list/remove`, { bookId: id });
      } else {
        await axios.post(`http://localhost:4000/api/user/${userId}/reading-list/add`, { bookId: id });
      }
      setIsInReadingList(!isInReadingList);
    } catch (err) {
      setError(err.response?.data || 'An error occurred while updating the reading list');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-8">
      <div className="flex">
        <div className="w-1/3">
          <img className="w-full h-auto" src={book.image} alt={book.title} />
        </div>
        <div className="ml-8 w-2/3">
          <div className="text-3xl font-bold mb-4">{book.title}</div>
          <p className="text-lg text-gray-700 mb-2">by {book.author}</p>
          <p className="text-gray-500 mb-2">Published Date: {new Date(book.publishedDate).toDateString()}</p>
          <p className="text-gray-500 mb-2">Pages: {book.pages}</p>
          <div className="text-lg text-indigo-500 font-semibold mb-4">Genre: {book.genre}</div>
          <p className="text-lg text-gray-700">{book.description}</p>
          <div className="flex mt-4">
            <button
              className={`py-2 px-4 rounded mr-4 ${isInReadingList ? 'bg-red-500' : 'bg-green-500'} text-white`}
              onClick={toggleReadingList}
            >
              {isInReadingList ? 'Remove from Reading List' : 'Add to Reading List'}
            </button>
            <button
              className="py-2 px-4 rounded bg-blue-500 text-white"
              onClick={() => setShowReviews(!showReviews)}
            >
              {showReviews ? 'Hide Reviews' : 'Show Reviews'}
            </button>
          </div>
          {showReviews && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Reviews</h2>
              <ul className="space-y-4">
                {book.reviews.map((review, index) => (
                  <li key={index} className="bg-gray-100 p-4 rounded-md shadow-sm">
                    {review}
                  </li>
                ))}
              </ul>
              <form onSubmit={handleReviewSubmit} className="mt-8">
                <textarea
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  className="w-full p-2 border rounded-md mb-4"
                  rows="4"
                  placeholder="Write your review here..."
                ></textarea>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
                  Submit Review
                </button>
                {reviewError && <div className="text-red-500 mt-2">{reviewError}</div>}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};  

export default BookDetails;
