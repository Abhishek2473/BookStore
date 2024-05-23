import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ReadingList = () => {
  const { userId } = useParams();
  const [readingList, setReadingList] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReadingList = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/user/${userId}/reading-list`);
        setReadingList(response.data);
      } catch (err) {
        setError(err.response?.data || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchReadingList();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-7xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Reading List</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {readingList.map((book) => (
            <div key={book._id} className="bg-gray-200 p-6 rounded-lg shadow-md">
              <img className="h-48 w-full object-cover mb-4" src={book.image} alt={book.title} />
              <div className="text-lg font-semibold text-black">{book.title}</div>
              <p className="mt-2 text-gray-700">by {book.author}</p>
              <p className="mt-2 text-gray-500">Published Date: {new Date(book.publishedDate).toDateString()}</p>
              <p className="mt-2 text-gray-500">Pages: {book.pages}</p>
              <div className="mt-4 text-sm text-indigo-500 font-semibold">Genre: {book.genre}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReadingList;