import React from 'react';
import { Typography } from '@mui/material';
import EventSeatIcon from '@mui/icons-material/EventSeat';

const SeatMap = ({ occupiedSeats = [], selectedSeats = [], onSeatSelect, maxSelectable }) => {
  const rows = 10;
  const cols = ['A', 'B', 'C', 'D', 'E', 'F'];

  const handleSelect = (seatId) => {
    if (occupiedSeats.includes(seatId)) return;
    onSeatSelect(seatId);
  };

  return (
    <div className="flex flex-col items-center bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40">
      <Typography variant="h5" className="font-extrabold mb-8 text-slate-900 tracking-tight">Select Your Seats</Typography>
      
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 mb-10 bg-slate-50 px-6 py-3 rounded-full border border-slate-100 uppercase tracking-widest text-[11px] font-black">
        <div className="flex items-center gap-2 text-slate-400">
          <EventSeatIcon fontSize="small" /> Available
        </div>
        <div className="flex items-center gap-2 text-blue-600">
          <EventSeatIcon fontSize="small" /> Selected
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <EventSeatIcon fontSize="small" /> Occupied
        </div>
      </div>

      <div className="bg-slate-50 p-8 sm:p-12 rounded-[50px] border-[6px] border-slate-100/50 shadow-inner w-full max-w-sm">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex items-center justify-between mb-4">
            <div className="w-8 text-center text-slate-400 font-black text-xs">{rowIndex + 1}</div>
            
            <div className="flex gap-2.5">
              {cols.slice(0, 3).map((col) => {
                const seatId = `${rowIndex + 1}${col}`;
                const isOccupied = occupiedSeats.includes(seatId);
                const isSelected = selectedSeats.includes(seatId);

                return (
                  <div
                    key={seatId}
                    onClick={() => handleSelect(seatId)}
                    className={`cursor-pointer transition-all duration-200 hover:-translate-y-1 ${isOccupied ? 'cursor-not-allowed opacity-30 hover:-translate-y-0' : 'hover:scale-110'}`}
                    title={seatId}
                  >
                    <EventSeatIcon fontSize="large" className={isSelected ? 'text-blue-600 drop-shadow-md' : isOccupied ? 'text-slate-500' : 'text-slate-300 hover:text-blue-400'} />
                  </div>
                );
              })}
            </div>
            
            {/* Aisle */}
            <div className="w-6 sm:w-8 h-full"></div>
            
            <div className="flex gap-2.5">
              {cols.slice(3, 6).map((col) => {
                const seatId = `${rowIndex + 1}${col}`;
                const isOccupied = occupiedSeats.includes(seatId);
                const isSelected = selectedSeats.includes(seatId);

                return (
                  <div
                    key={seatId}
                    onClick={() => handleSelect(seatId)}
                    className={`cursor-pointer transition-all duration-200 hover:-translate-y-1 ${isOccupied ? 'cursor-not-allowed opacity-30 hover:-translate-y-0' : 'hover:scale-110'}`}
                    title={seatId}
                  >
                    <EventSeatIcon fontSize="large" className={isSelected ? 'text-blue-600 drop-shadow-md' : isOccupied ? 'text-slate-500' : 'text-slate-300 hover:text-blue-400'} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatMap;
