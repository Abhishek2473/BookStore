import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token'); // Or wherever you store the token
      if (!token) {
        alert('No token found, please sign in.');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:4000/api/user/${id}`, {
          headers: {
            'Authorization': token
          }
        });
        setUser(response.data);
        setFormData({
          username: response.data.username,
          email: response.data.email,
          password: ''
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Or wherever you store the token
    if (!token) {
      alert('No token found, please sign in.');
      return;
    }

    try {
      await axios.put(`http://localhost:4000/api/user/${user._id}`, formData, {
        headers: {
          'Authorization': token
        }
      });
      alert('Profile updated successfully!');
      setEditMode(false);
      setUser({ ...user, ...formData });
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>
      {editMode ? (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </form>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <p className="text-gray-700 text-sm font-bold">Username: {user.username}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700 text-sm font-bold">Email: {user.email}</p>
          </div>
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
