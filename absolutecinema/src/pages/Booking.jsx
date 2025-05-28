import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';
import BookingService from '../services/BookingService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Booking({ movies }) {
  const { id } = useParams();
  const movie = movies.find(m => m.id === parseInt(id));

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [userData, setUserData] = useState({ name: '', phone: '', email: '' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (movie) {
      const seats = BookingService.getBookedSeats(movie.id);
      setBookedSeats(seats);
    }
  }, [movie]);

  const handleSeatClick = (seat) => {
    if (!seat.booked && !bookedSeats.some(s => s.row === seat.row && s.col === seat.col)) {
      setSelectedSeats(prev =>
        prev.some(s => s.row === seat.row && s.col === seat.col)
          ? prev.filter(s => s.row !== seat.row || s.col !== seat.col)
          : [...prev, seat]
      );
    }
  };

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.name || !userData.phone || !userData.email) {
      toast.error('Усі поля є обов\'язковими!');
      return false;
    }
    if (!emailRegex.test(userData.email)) {
      toast.error('Невірний формат email!');
      return false;
    }
    return true;
  };

  const handleBook = () => {
    if (selectedSeats.length === 0) {
      toast.error('Оберіть хоча б одне місце!');
      return;
    }
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      BookingService.saveBooking(movie.id, selectedSeats, userData);
      setBookedSeats(prev => [...prev, ...selectedSeats]); // Оновлення заброньованих місць
      setSelectedSeats([]);
      setShowForm(false);
      setUserData({ name: '', phone: '', email: '' });
      toast.success('Бронювання успішно виконано!');
    }
  };

  const ticketPrice = 150; // Ціна одного квитка в гривнях
  const totalCost = selectedSeats.length * ticketPrice;

  if (!movie) return <p>Movie not found</p>;

  return (
    <div>
      <h2>{movie.title} - Booking</h2>
      <p>Showtime: {movie.showtime}</p>
      <CinemaHall
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
        bookedSeats={bookedSeats}
        handleSeatClick={handleSeatClick}
        handleBook={handleBook}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        userData={userData}
        showForm={showForm}
        setShowForm={setShowForm}
        totalCost={totalCost}
      />
      <ToastContainer />
    </div>
  );
}

export default Booking;