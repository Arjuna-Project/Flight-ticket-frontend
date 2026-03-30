import React from 'react';
import { Typography, Avatar } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';

const FlightCard = ({ flightInstance, onSelect }) => {
  const { flight, departureTime, arrivalTime, price } = flightInstance;
  const airline = flight.airline;

  const depDate = new Date(departureTime);
  const arrDate = new Date(arrivalTime);

  const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formatDuration = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  };

  return (
    <div 
      className="w-full bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-blue-900/10 hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden group"
      onClick={() => onSelect(flightInstance)}
    >
      <div className="flex flex-col lg:flex-row items-center justify-between p-6 md:p-8">
        
        {/* Airline Info */}
        <div className="flex items-center gap-5 w-full lg:w-1/4 mb-8 lg:mb-0">
          <Avatar 
            src={airline.logoUrl} 
            alt={airline.name} 
            className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 font-black text-xl shadow-inner border border-slate-100"
          >
            {airline.name.charAt(0)}
          </Avatar>
          <div>
            <Typography className="font-extrabold text-slate-900 text-[17px] leading-tight mb-1 tracking-tight">
              {airline.name}
            </Typography>
            <Typography className="text-slate-400 font-bold text-xs tracking-wider uppercase bg-slate-50 inline-block px-2 py-0.5 rounded">
              {flight.flightNumber}
            </Typography>
          </div>
        </div>

        {/* Time & Route Info */}
        <div className="flex items-center justify-between w-full lg:w-2/4 px-0 lg:px-12 mb-8 lg:mb-0">
          <div className="text-center w-[80px]">
            <Typography className="font-black text-slate-900 text-2xl tracking-tight">{formatTime(depDate)}</Typography>
            <Typography className="text-slate-500 font-bold mt-1 text-sm">{flight.departureAirport.code}</Typography>
          </div>
          
          <div className="flex-1 px-4 flex flex-col items-center min-w-[150px]">
            <Typography className="text-slate-500 text-xs font-bold bg-slate-50 px-3 py-1 rounded-full tracking-widest uppercase mb-2">
              {formatDuration(flight.durationMinutes)}
            </Typography>
            <div className="w-full flex items-center relative py-2 mb-1">
              <div className="h-[2px] bg-slate-200 w-full group-hover:bg-blue-300 transition-colors rounded-full" />
              <div className="absolute left-1/2 -translate-x-1/2 bg-white px-2">
                <FlightTakeoffIcon className="text-blue-500 -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-300" fontSize="small" />
              </div>
            </div>
            <Typography className="text-emerald-500 font-black text-[10px] tracking-widest uppercase mt-1">Non-stop</Typography>
          </div>
          
          <div className="text-center w-[80px]">
            <Typography className="font-black text-slate-900 text-2xl tracking-tight">{formatTime(arrDate)}</Typography>
            <Typography className="text-slate-500 font-bold mt-1 text-sm">{flight.arrivalAirport.code}</Typography>
          </div>
        </div>

        {/* Price & Action */}
        <div className="w-full lg:w-1/4 flex flex-col items-center lg:items-end justify-center border-t lg:border-t-0 lg:border-l border-slate-100 pt-8 lg:pt-0 pl-0 lg:pl-10">
          <Typography className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">From</Typography>
          <Typography className="font-black text-slate-900 text-[28px] tracking-tight leading-none mb-5">
            ₹{price.toLocaleString()}
          </Typography>
          <button 
            onClick={(e) => { e.stopPropagation(); onSelect(flightInstance); }} 
            className="w-full sm:w-auto px-10 py-3.5 rounded-xl text-[15px] font-black text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
