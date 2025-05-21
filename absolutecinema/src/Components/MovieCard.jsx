import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MovieCard({ movie }) {
  const [isHovered, setIsHovered] = useState(false);
  const [youtubeId, setYoutubeId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const url = movie.trailer;
    const videoIdMatch = url.match(/[?&]v=([^&]+)/);
    if (videoIdMatch && videoIdMatch[1]) {
      setYoutubeId(videoIdMatch[1]);
    } else {
      const shortUrlMatch = url.match(/youtu\.be\/([^\?&]+)/);
      if (shortUrlMatch && shortUrlMatch[1]) {
        setYoutubeId(shortUrlMatch[1]);
      }
    }
  }, [movie.trailer]);

  const handleBook = () => {
    navigate(`/booking/${movie.id}`);
  };

  return (
    <div
      className="movie-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover absolute top-0 left-0"
        />
        {isHovered && youtubeId && (
          <iframe
            className="video-overlay absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&fs=0&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
          ></iframe>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
        <h3 className="text-xl font-bold truncate">{movie.title}</h3>
        <p className="text-sm text-gray-300 mt-1 line-clamp-2">{movie.description}</p>
        <p className="text-sm text-gray-400 mt-1">Genre: {movie.genre}</p>
        <p className="text-sm text-gray-400 mt-1">Showtime: {movie.showtime}</p>
        <button
          onClick={handleBook}
          className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-base font-semibold hover:from-blue-700 hover:to-purple-700 transition transform hover:scale-105"
        >
         Забронювати
        </button>
      </div>
    </div>
  );
}

export default MovieCard;