import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/book/${id}`);
        setBook(response.data);
      } catch (err) {
        setError(err.response?.data || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-64 w-full object-cover md:w-64" src={book.image} alt={book.title} />
          </div>
          <div className="p-8">
            <div className="block mt-1 text-2xl leading-tight font-bold text-black">{book.title}</div>
            <p className="mt-2 text-gray-700 text-lg">by {book.author}</p>
            <p className="mt-2 text-gray-500">Published Date: {new Date(book.publishedDate).toDateString()}</p>
            <p className="mt-2 text-gray-500">Pages: {book.pages}</p>
            <div className="mt-4 text-sm text-indigo-500 font-semibold">
              <span>Genre: {book.genre}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
