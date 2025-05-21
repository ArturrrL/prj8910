import React, { useState } from 'react';
import '../index.css';

function CinemaHall() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const seats = [
    Array(12).fill().map((_, col) => ({ row: 1, col: col + 1, booked: false })),
    Array(12).fill().map((_, col) => ({ row: 2, col: col + 1, booked: false })),
    Array(12).fill().map((_, col) => ({ row: 3, col: col + 1, booked: false })),
    Array(10).fill().map((_, col) => ({ row: 4, col: col + 1, booked: false })),
    Array(10).fill().map((_, col) => ({ row: 5, col: col + 1, booked: false })),
    Array(10).fill().map((_, col) => ({ row: 6, col: col + 1, booked: false })),
    Array(15).fill().map((_, col) => ({ row: 7, col: col + 1, booked: false })),
  ];

  const handleSeatClick = (seat) => {
    const isSelected = selectedSeats.some(s => s.row === seat.row && s.col === seat.col);
    if (!seat.booked) {
      setSelectedSeats(prev =>
        isSelected
          ? prev.filter(s => s.row !== seat.row || s.col !== seat.col)
          : [...prev, seat]
      );
    }
  };

  const clearSelectedSeats = () => {
    setSelectedSeats([]);
  };

  const maxSeatsInRow = Math.max(...seats.map(row => row.length));
  const screenWidth = maxSeatsInRow * 40;

  return (
    <div className="cinema-container">
      <div className="cinema-content">
        <div>
          <div
            className="screen"
            style={{ width: `${screenWidth}px` }}
          >
            Screen
          </div>
          <div className="cinema-hall">
            {seats.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                <span className="row-number">{rowIndex + 1}</span>
                {row.map((seat) => (
                  <div
                    key={`${seat.row}-${seat.col}`}
                    onClick={() => handleSeatClick(seat)}
                    className={`seat ${seat.booked ? 'booked' : selectedSeats.some(s => s.row === seat.row && s.col === seat.col) ? 'selected' : 'available'}`}
                  >
                    {seat.col}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="divider"></div>
        <div className="selected-seats">
          <h3 className="selected-seats-title">Обрані місця:</h3>
          <button
            onClick={clearSelectedSeats}
            className="clear-button"
          >
            Очистити
          </button>
          {selectedSeats.length > 0 ? (
            <ul className={`selected-seats-list ${selectedSeats.length > 10 ? 'columns-2' : ''}`}>
              {selectedSeats.map((seat) => (
                <li key={`${seat.row}-${seat.col}`} className="selected-seat-item">
                  Ряд {seat.row} Місце {seat.col}
                </li>
              ))}
            </ul>
          ) : (
            <p>Немає обраних місць</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CinemaHall;