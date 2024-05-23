import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-blue-600 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-white text-xl font-bold">
            Book Management System
          </div>
          <ul className="flex space-x-4">
            <li>
              <Link 
                to="/" 
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200"
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/signup" 
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200"
              >
                Sign up
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex-grow flex justify-center">
          <input 
            type="text" 
            placeholder="Search books..." 
            className="px-3 py-1 rounded-lg text-black"
          />
        </div>
      </nav>
    </header>
  );
};
