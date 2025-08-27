import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Welcome to Hugo app
      </h1>
      <p className="text-gray-600 mb-8 text-lg">
        I built this app to learn React
      </p>
      <div className="space-y-4">
        <Link 
          to="/todos" 
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          Go to Todos
        </Link>
        <div className="mt-4">
          <Link 
            to="/about" 
            className="text-blue-500 hover:text-blue-700 underline"
          >
            Learn more about this app
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
