import React from 'react';
import MovieList  from './components/MovieList';
import movies from './data/movies';

function App() {
  return (
    <div>
      <header className="bg-black bg-opacity-80 py-6">
        <h1 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          AbsoluteCinema
        </h1>
      </header>
      <MovieList movies={movies} />
    </div>
  );
}

export default App;