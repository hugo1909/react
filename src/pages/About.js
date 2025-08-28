import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-white rounded-lg">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">About Todo App</h1>
      
      <div className="space-y-4 text-gray-600">
        <p>
          This is a modern Todo application built with React and styled with Tailwind CSS.
        </p>
        
        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-800">Features:</h2>
        <ul className="space-y-2 list-disc list-inside">
          <li>Add new tasks</li>
          <li>Mark tasks as complete</li>
          <li>Edit existing tasks</li>
          <li>Delete tasks</li>
          <li>Responsive design</li>
          <li>Clean and intuitive interface</li>
        </ul>

        <h2 className="mt-6 mb-3 text-xl font-semibold text-gray-800">Technologies Used:</h2>
        <ul className="space-y-2 list-disc list-inside">
          <li>React 19</li>
          <li>React Router DOM</li>
          <li>Tailwind CSS</li>
          <li>JavaScript ES6+</li>
        </ul>

        <div className="pt-6 mt-8 border-t border-gray-200">
          <Link 
            to="/" 
            className="inline-block px-6 py-2 mr-4 text-white transition-colors bg-gray-500 rounded-lg hover:bg-gray-600"
          >
            Back to Home
          </Link>
          <Link 
            to="/todos" 
            className="inline-block px-6 py-2 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Go to Todos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
