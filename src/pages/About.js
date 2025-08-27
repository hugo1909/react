import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">About Todo App</h1>
      
      <div className="space-y-4 text-gray-600">
        <p>
          This is a modern Todo application built with React and styled with Tailwind CSS.
        </p>
        
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Features:</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Add new tasks</li>
          <li>Mark tasks as complete</li>
          <li>Edit existing tasks</li>
          <li>Delete tasks</li>
          <li>Responsive design</li>
          <li>Clean and intuitive interface</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Technologies Used:</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>React 19</li>
          <li>React Router DOM</li>
          <li>Tailwind CSS</li>
          <li>JavaScript ES6+</li>
        </ul>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <Link 
            to="/" 
            className="inline-block px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors mr-4"
          >
            Back to Home
          </Link>
          <Link 
            to="/todos" 
            className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go to Todos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
