import React, { useState } from 'react';

function CinemaHall() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const seats = Array(5).fill().map((_, row) => 
    Array(10).fill().map((_, col) => ({ row: row + 1, col: col + 1, booked: false }))
  );

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

  return (
    <div>
      <h2>Select Seats</h2>
      <div>
        {seats.flat().map((seat) => (
          <div
            key={`${seat.row}-${seat.col}`}
            onClick={() => handleSeatClick(seat)}
            className={`seat ${selectedSeats.some(s => s.row === seat.row && s.col === seat.col) ? 'selected' : 'available'}`}
          >
            {seat.row},{seat.col}
          </div>
        ))}
      </div>
      <p>Selected Seats: {selectedSeats.map(s => `${s.row},${s.col}`).join(', ')}</p>
    </div>
  );
}

export default CinemaHall;