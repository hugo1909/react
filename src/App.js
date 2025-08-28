import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import TodoPage from './pages/TodoPage';
import About from './pages/About';
import Weather from './pages/Weather';
import NotFound from './pages/NotFound';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <Router>
      <div className="min-h-screen py-8 bg-gray-100">
        <div className="mx-auto max-w-7xl">
          <Navigation />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/todos" element={<TodoPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </div>
      </div>
    </Router>
  );
}

export default App;
