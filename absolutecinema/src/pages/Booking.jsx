import React from 'react';
import { useParams } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';

function Booking({ movies }) {
  const { id } = useParams();
  const movie = movies.find(m => m.id === parseInt(id));

  if (!movie) return <p>Movie not found</p>;

  return (
    <div>
      <h2>{movie.title} - Booking</h2>
      <p>Showtime: {movie.showtime}</p>
      <CinemaHall />
    </div>
  );
}

export default Booking;