import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Typography, Alert } from '@mui/material';
import MainLayout from '../components/layout/MainLayout';
import PassengerForm from '../components/flight/PassengerForm';
import bookingService from '../services/bookingService';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successBooking, setSuccessBooking] = useState(null);

  if (!location.state) {
    return <Navigate to="/" />;
  }

  const { flightId, flight, passengerCount, selectedSeats, totalPrice } = location.state;
  const finalPrice = totalPrice + (passengerCount * 1250);

  const handleCreateBooking = async (passengers) => {
    try {
      setLoading(true);
      setError('');
      
      const payload = {
        flightInstance: flightId,
        passengers,
        totalPrice: finalPrice
      };
      
      const response = await bookingService.createBooking(payload);
      setSuccessBooking(response);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  if (successBooking) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4">
          <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 p-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6 border-4 border-emerald-100">
              <CheckCircleOutlineIcon className="text-emerald-500 text-[60px]" />
            </div>
            <Typography variant="h3" className="font-black text-slate-900 tracking-tight mb-2">Booking Confirmed!</Typography>
            <Typography className="text-slate-500 font-medium text-lg mb-10">
              Your flight has been successfully reserved.
            </Typography>
            
            <div className="w-full bg-slate-50 rounded-2xl p-8 border border-slate-100 mb-10">
              <Typography className="text-slate-400 uppercase tracking-widest font-black text-xs mb-2">Booking Reference</Typography>
              <Typography className="font-mono font-black text-blue-600 tracking-widest text-3xl">
                {successBooking.bookingReference}
              </Typography>
            </div>
            
            <button 
              onClick={() => navigate('/')} 
              className="w-full py-4 rounded-xl text-[15px] font-black tracking-wide text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
            >
              Back to Home
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-slate-50 min-h-screen py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Typography variant="h3" className="font-black mb-12 text-slate-900 tracking-tight text-[2rem] md:text-[2.5rem]">
            Review & Complete
          </Typography>
          
          {error && <Alert severity="error" className="mb-8 rounded-2xl font-bold bg-red-50 text-red-700 border border-red-100">{error}</Alert>}
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Passenger Form */}
            <div className="lg:col-span-7 xl:col-span-8">
              <PassengerForm 
                passengerCount={passengerCount}
                seatSelections={selectedSeats}
                onSubmit={handleCreateBooking}
                loading={loading}
              />
            </div>
            
            {/* Right: Summary */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="sticky top-28 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 p-8">
                <Typography variant="h5" className="font-extrabold border-b border-slate-100 pb-5 mb-6 text-slate-900 tracking-tight">
                  Itinerary Summary
                </Typography>
                
                <div className="mb-8 p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-200/60 pb-4">
                    <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-blue-600">
                      <FlightTakeoffIcon />
                    </div>
                    <div>
                      <Typography className="font-black text-slate-900 text-[15px] leading-tight flex items-center gap-2">
                        {flight.flight.airline.name} 
                        <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded uppercase tracking-widest">{flight.flight.flightNumber}</span>
                      </Typography>
                      <Typography className="text-slate-500 font-medium text-[13px] tracking-wide mt-1">
                        {new Date(flight.departureTime).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </Typography>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-1">
                    <Typography className="font-bold text-slate-700 text-lg">{flight.flight.departureAirport.code}</Typography>
                    <div className="flex-1 border-t-2 border-dashed border-slate-300 mx-4 relative">
                      <FlightTakeoffIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-300 -rotate-12 bg-slate-50 px-1" fontSize="small" />
                    </div>
                    <Typography className="font-bold text-slate-700 text-lg">{flight.flight.arrivalAirport.code}</Typography>
                  </div>
                </div>
                
                <div className="mb-8">
                  <Typography className="text-slate-400 text-[11px] uppercase tracking-widest font-black mb-3">Allocated Seats</Typography>
                  <div className="flex flex-wrap gap-2">
                    {selectedSeats.map(seat => (
                      <span key={seat} className="font-mono bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-bold border border-blue-100 shadow-sm">
                        {seat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-8 mt-4">
                  <div className="flex justify-between items-end mb-2">
                    <Typography className="font-black text-slate-900 text-[13px] tracking-wide uppercase">Final Total</Typography>
                    <Typography className="font-black text-blue-600 text-[32px] leading-none tracking-tight">₹{finalPrice.toLocaleString()}</Typography>
                  </div>
                  <Typography className="text-slate-400 text-[11px] font-medium text-right uppercase tracking-widest">Pricing incl. taxes & fees</Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Booking;
