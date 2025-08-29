import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './UI/ThemeToggle';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/todos', label: 'Todos' },
    { path: '/about', label: 'About' },
    { path: '/weather', label: 'Weather' }
  ];

  return (
    <nav className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-md transition-colors font-medium ${
                  location.pathname === item.path
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
