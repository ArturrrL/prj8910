import React from 'react';
import MovieList from '../components/MovieList';

function Home({ movies }) {
  return (
    <div>
      <MovieList movies={movies} />
    </div>
  );
}

export default Home;