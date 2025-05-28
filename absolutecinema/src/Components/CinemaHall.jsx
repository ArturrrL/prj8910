import React from 'react';
import '../index.css';

function CinemaHall({
  selectedSeats,
  setSelectedSeats,
  bookedSeats,
  handleSeatClick,
  handleBook,
  handleSubmit,
  handleInputChange,
  userData,
  showForm,
  setShowForm,
  totalCost,
}) {
  const seats = [
    Array(12).fill().map((_, col) => ({ row: 1, col: col + 1, booked: false })),
    Array(12).fill().map((_, col) => ({ row: 2, col: col + 1, booked: false })),
    Array(12).fill().map((_, col) => ({ row: 3, col: col + 1, booked: false })),
    Array(10).fill().map((_, col) => ({ row: 4, col: col + 1, booked: false })),
    Array(10).fill().map((_, col) => ({ row: 5, col: col + 1, booked: false })),
    Array(10).fill().map((_, col) => ({ row: 6, col: col + 1, booked: false })),
    Array(15).fill().map((_, col) => ({ row: 7, col: col + 1, booked: false })),
  ];

  const maxSeatsInRow = Math.max(...seats.map(row => row.length));
  const screenWidth = maxSeatsInRow * 40;

  const clearSelectedSeats = () => {
    setSelectedSeats([]);
  };

  return (
    <div className="cinema-container">
      <div className="cinema-content">
        <div>
          <div className="screen" style={{ width: `${screenWidth}px` }}>
            Screen
          </div>
          <div className="cinema-hall">
            {seats.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                <span className="row-number">{rowIndex + 1}</span>
                {row.map((seat) => {
                  const isBooked = bookedSeats.some(s => s.row === seat.row && s.col === seat.col);
                  return (
                    <div
                      key={`${seat.row}-${seat.col}`}
                      onClick={() => handleSeatClick(seat)}
                      className={`seat ${isBooked ? 'booked' : selectedSeats.some(s => s.row === seat.row && s.col === seat.col) ? 'selected' : 'available'}`}
                    >
                      {seat.col}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="divider"></div>
        <div className="selected-seats">
          <h3 className="selected-seats-title">Обрані місця:</h3>
          {selectedSeats.length > 0 ? (
            <div className="selected-seats-content">
              <div className="seats-list-container">
                <ul className={`selected-seats-list ${selectedSeats.length > 10 ? 'columns-2' : ''}`}>
                  {selectedSeats.map((seat) => (
                    <li key={`${seat.row}-${seat.col}`} className="selected-seat-item">
                      Ряд {seat.row} Місце {seat.col}
                    </li>
                  ))}
                </ul>
                <p className="total-cost">Загальна вартість: {totalCost} грн</p>
              </div>
              <div className="actions-container">
                <div className="button-group">
                  <button onClick={clearSelectedSeats} className="clear-button">
                    Очистити
                  </button>
                  <button onClick={handleBook} className="book-button">
                    Забронювати
                  </button>
                </div>
                {showForm && (
                  <form onSubmit={handleSubmit} className="booking-form">
                    <input
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      placeholder="Ім’я"
                      className="form-input"
                    />
                    <input
                      type="text"
                      name="phone"
                      value={userData.phone}
                      onChange={handleInputChange}
                      placeholder="Телефон"
                      className="form-input"
                    />
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className="form-input"
                    />
                    <button type="submit" className="submit-button">
                      Підтвердити
                    </button>
                  </form>
                )}
              </div>
            </div>
          ) : (
            <p>Немає обраних місць</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CinemaHall;