import React from 'react';
import { Link } from 'react-router-dom';
import WeatherWidget from '../components/Weather/WeatherWidget';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Main welcome section */}
      <div className="mb-8 text-center bg-white dark:bg-gray-800 rounded-lg p-6 transition-colors duration-200">
        <h1 className="mb-6 text-4xl font-bold text-gray-800 dark:text-white">
          Welcome to Hugo app
        </h1>
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
          I built this app to learn React 
          <Link 
            to="/about" 
            className="ml-2 text-blue-500 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Learn more
          </Link>
        </p>
      </div>

      {/* Dashboard widgets */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Weather Widget */}
        <div className="md:col-span-2">
          <WeatherWidget />
        </div>
        
        {/* Quick Actions */}
        <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm transition-colors duration-200">
          <h3 className="mb-3 text-lg font-semibold text-gray-800 dark:text-white">Quick Actions</h3>
          <div className="space-y-2">
            <Link 
              to="/todos" 
              className="block p-3 transition-colors rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-gray-900 dark:text-white">Manage Todos</span>
              </div>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Add and track your tasks</p>
            </Link>
            
            <Link 
              to="/weather" 
              className="block p-3 transition-colors rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-gray-900 dark:text-white">Weather Forecast</span>
              </div>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Check detailed weather info</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
