import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/todos', label: 'Todos' },
    { path: '/about', label: 'About' }
  ];

  return (
    <nav className="bg-white shadow-md rounded-lg mb-6">
      <div className="px-6 py-4">
        <div className="flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-md transition-colors font-medium ${
                location.pathname === item.path
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
