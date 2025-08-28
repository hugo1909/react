import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center bg-white rounded-lg">
      <h1 className="mb-6 text-4xl font-bold text-gray-800">
        Welcome to Hugo app
      </h1>
      <p className="mb-8 text-lg text-gray-600">
        I built this app to learn React
      </p>
      <div className="space-y-4">
        <Link 
          to="/todos" 
          className="inline-block px-6 py-3 font-medium text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Go to Todos
        </Link>
        <div className="mt-4">
          <Link 
            to="/about" 
            className="text-blue-500 underline hover:text-blue-700"
          >
            Learn more about this app
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
