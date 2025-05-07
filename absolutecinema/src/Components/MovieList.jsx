import React, { useState } from 'react';
import MovieCard from './MovieCard';

function MovieList({ movies }) {
  const [search, setSearch] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleNext = () => {
    if (currentIndex < filteredMovies.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const visibleMovies = filteredMovies.slice(currentIndex, currentIndex + 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar w-full max-w-md p-3 rounded-full text-white placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {filteredMovies.length > 0 ? (
        <div className="relative">
          <div className="carousel-container">
            <div
              className="carousel-inner"
              style={{ transform: `translateX(-${currentIndex * 33.3}%)` }}
            >
              {filteredMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
          <div className="flex justify-between mt-4 absolute top-1/2 transform -translate-y-1/2 w-full px-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="nav-button rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= filteredMovies.length - 3}
              className="nav-button rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            >
              →
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-400">No movies found</p>
      )}
    </div>
  );
}

export default MovieList;