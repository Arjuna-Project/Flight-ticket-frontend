import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Typography, CircularProgress, Alert } from '@mui/material';
import MainLayout from '../components/layout/MainLayout';
import SeatMap from '../components/flight/SeatMap';
import flightService from '../services/flightService';
import authService from '../services/authService';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const FlightDetails = () => {
  const { id } = useParams();
  const query = useQuery();
  const navigate = useNavigate();
  const passengerCount = parseInt(query.get('passengers') || 1, 10);
  
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState(['1A', '1B', '4C', '4D', '7A', '7B', '9E', '9F']);

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        setLoading(true);
        const data = await flightService.getFlightById(id);
        setFlight(data);
      } catch (err) {
        setError('Failed to load flight details.');
      } finally {
        setLoading(false);
      }
    };
    fetchFlight();
  }, [id]);

  const handleSeatSelect = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      if (selectedSeats.length < passengerCount) {
        setSelectedSeats([...selectedSeats, seatId]);
      } else {
        const newSelection = [...selectedSeats];
        newSelection.shift();
        newSelection.push(seatId);
        setSelectedSeats(newSelection);
      }
    }
  };

  const handleContinue = () => {
    if (selectedSeats.length !== passengerCount) {
      alert(`Please select exactly ${passengerCount} seats before continuing.`);
      return;
    }
    
    if (!authService.getCurrentUser()) {
      alert('Please log in to continue booking.');
      navigate('/login');
      return;
    }

    navigate('/booking', {
      state: {
        flightId: id,
        flight,
        passengerCount,
        selectedSeats,
        totalPrice: (flight.price ?? 0) * passengerCount
      }
    });
  };

  if (loading) return (
    <MainLayout>
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <CircularProgress size={50} thickness={4} className="text-blue-600" />
      </div>
    </MainLayout>
  );

  if (error || !flight) return (
    <MainLayout>
      <div className="flex justify-center py-32 px-4 bg-slate-50 min-h-screen">
        <Alert severity="error" className="w-full max-w-2xl font-bold bg-red-50 text-red-700 rounded-2xl border border-red-100 p-6">
          {error || 'Flight not found'}
        </Alert>
      </div>
    </MainLayout>
  );

  return (
    <MainLayout>
      <div className="bg-slate-50 min-h-screen py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Typography variant="h3" className="font-black mb-12 text-slate-900 tracking-tight text-[2rem] md:text-[2.5rem]">
            Select Your Seats
          </Typography>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left side: Flight Info & Pricing */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="sticky top-28 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 p-8 md:p-10">
                <Typography variant="h5" className="font-extrabold border-b border-slate-100 pb-6 mb-8 text-slate-900 tracking-tight">
                  Fare Summary
                </Typography>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-[17px]">
                    <Typography className="text-slate-500 font-medium">Base Fare ({passengerCount} × ₹{(flight.price ?? 0).toLocaleString()})</Typography>
                    <Typography className="font-bold text-slate-800">₹{((flight.price ?? 0) * passengerCount).toLocaleString()}</Typography>
                  </div>
                  <div className="flex justify-between items-center text-[17px]">
                    <Typography className="text-slate-500 font-medium">Taxes & Surcharges</Typography>
                    <Typography className="font-bold text-slate-800">₹{(passengerCount * 1250).toLocaleString()}</Typography>
                  </div>
                  
                  <div className="border-t border-slate-100 pt-6 mt-6">
                    <div className="flex justify-between items-end">
                      <Typography className="font-black text-slate-900 text-sm tracking-wide uppercase">Total Amount</Typography>
                      <Typography className="font-black text-blue-600 text-3xl leading-none">
                        ₹{(((flight.price ?? 0) * passengerCount) + (passengerCount * 1250)).toLocaleString()}
                      </Typography>
                    </div>
                  </div>
                </div>

                <div className="mt-10 bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                  <div className="flex items-center justify-between mb-3">
                    <Typography className="text-slate-800 font-bold tracking-tight text-lg">
                      Selected Seats
                    </Typography>
                    <span className={`text-[11px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg ${selectedSeats.length === passengerCount ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {selectedSeats.length} / {passengerCount}
                    </span>
                  </div>
                  <Typography className="text-blue-700 font-black text-xl tracking-wide min-h-[30px]">
                    {selectedSeats.length > 0 ? selectedSeats.join(', ') : <span className="text-slate-400 text-base font-medium">Select a seat on the map</span>}
                  </Typography>
                </div>

                <button 
                  disabled={selectedSeats.length !== passengerCount}
                  onClick={handleContinue}
                  className={`w-full mt-8 py-4 px-6 rounded-xl text-[15px] font-black tracking-wide transition-all duration-200
                    ${selectedSeats.length === passengerCount 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/25 active:-translate-y-0.5' 
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                >
                  Continue to Booking
                </button>
              </div>
            </div>
            
            {/* Right side: Seat Map */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <SeatMap 
                occupiedSeats={occupiedSeats}
                selectedSeats={selectedSeats}
                onSeatSelect={handleSeatSelect}
                maxSelectable={passengerCount}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FlightDetails;
