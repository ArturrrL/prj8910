import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import movies from './data/movies';

function App() {
  return (
    <Router>
      <div>
        <header className="bg-black bg-opacity-80 py-6">
          <h1 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Cinema
          </h1>
        </header>
        <Routes>
          <Route path="/" element={<Home movies={movies} />} />
          <Route path="/booking/:id" element={<Booking movies={movies} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;