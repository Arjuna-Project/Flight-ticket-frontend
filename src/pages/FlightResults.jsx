import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Container, Box, CircularProgress, Alert } from '@mui/material';
import MainLayout from '../components/layout/MainLayout';
import FlightCard from '../components/flight/FlightCard';
import flightService from '../services/flightService';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const FlightResults = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const searchParams = {
    from: query.get('from'),
    to: query.get('to'),
    date: query.get('date'),
    passengers: query.get('passengers'),
    class: query.get('class')
  };

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);
        const data = await flightService.searchFlights(searchParams);
        setFlights(data);
      } catch (err) {
        setError('Failed to fetch flights. Please try again.',err);
      } finally {
        setLoading(false);
      }
    };

    if (searchParams.from && searchParams.to && searchParams.date) {
      fetchFlights();
    } else {
      setLoading(false);
      setError('Invalid search parameters.');
    }
  }, [useLocation().search]);

  const handleSelectFlight = (flight) => {
    navigate(`/flight/${flight._id}?passengers=${searchParams.passengers}`);
  };

  return (
    <MainLayout>
      <Box className="bg-slate-900 text-white pt-24 pb-20 relative overflow-hidden flex flex-col items-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80")' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-slate-900/80 to-slate-900 z-10" />
        
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500 rounded-full blur-[100px] opacity-10 pointer-events-none" />

        <Container className="relative z-20 flex flex-col items-center text-center">
          <Typography variant="h2" className="font-black mb-6 text-white tracking-tight text-[2.5rem] md:text-[3.5rem] drop-shadow-lg">
            Flight Results
          </Typography>
          <div className="flex flex-wrap items-center justify-center gap-4 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-xl">
            <Typography variant="body1" className="text-white font-bold tracking-wide text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-emerald-200">
              {searchParams.from} <span className="mx-2 text-white/50 font-normal">→</span> {searchParams.to} 
            </Typography>
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <Typography variant="body2" className="text-blue-100 font-semibold tracking-wide">
              {new Date(searchParams.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
            </Typography>
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <Typography variant="body2" className="text-blue-100 font-semibold tracking-wide">
              {searchParams.passengers} Adult{searchParams.passengers > 1 ? 's' : ''}
            </Typography>
          </div>
        </Container>
      </Box>

      <Container className="py-16 bg-slate-50 flex-grow min-h-screen relative z-30 -mt-10 rounded-t-[40px] shadow-2xl shadow-slate-900/5 px-4 md:px-8 max-w-6xl">
        {loading ? (
          <Box className="flex flex-col justify-center items-center py-32 space-y-4">
            <CircularProgress size={50} thickness={4} className="text-blue-600" />
            <Typography className="text-slate-400 font-bold uppercase tracking-widest text-sm">Searching Airspace...</Typography>
          </Box>
        ) : error ? (
          <Alert severity="error" className="py-4 px-6 rounded-2xl font-bold bg-red-50 text-red-700 border border-red-100">{error}</Alert>
        ) : flights.length === 0 ? (
          <Box className="bg-white border border-slate-100 p-12 rounded-3xl shadow-sm text-center max-w-2xl mx-auto mt-10">
            <Typography variant="h5" className="text-slate-900 font-bold mb-3">No direct flights available</Typography>
            <Typography className="text-slate-500 font-medium text-lg">We couldn't find any flights for this specific route and date. Try adjusting your search criteria.</Typography>
          </Box>
        ) : (
          <div className="space-y-6 flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-6 pl-2">
              <Typography variant="h5" className="text-slate-800 font-extrabold tracking-tight">
                {flights.length} <span className="text-slate-500 font-medium">Flights Found</span>
              </Typography>
              <Typography className="text-blue-600 font-bold text-sm bg-blue-50 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                Sort: Lowest Price
              </Typography>
            </div>
            {flights.map(flight => (
              <FlightCard 
                key={flight._id} 
                flightInstance={flight} 
                onSelect={handleSelectFlight} 
              />
            ))}
          </div>
        )}
      </Container>
    </MainLayout>
  );
};

export default FlightResults;
