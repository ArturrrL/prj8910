// src/services/BookingService.js
const BOOKINGS_KEY = 'cinemaBookings';

const BookingService = {
  // Отримання всіх бронювань
  getBookings() {
    return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');
  },

  // Збереження нового бронювання
  saveBooking(movieId, seats, userData) {
    const bookings = this.getBookings();
    const booking = {
      movieId,
      seats,
      userData,
      timestamp: new Date().toISOString(),
    };
    bookings.push(booking);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    return booking;
  },

  // Отримання заброньованих місць для конкретного фільму
  getBookedSeats(movieId) {
    const bookings = this.getBookings();
    return bookings
      .filter(b => b.movieId === movieId)
      .flatMap(b => b.seats);
  },
};

export default BookingService;