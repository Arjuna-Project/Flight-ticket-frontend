import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress, Alert, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import bookingService from '../services/bookingService';
import authService from '../services/authService';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';

const statusConfig = {
  confirmed: { label: 'Confirmed', classes: 'bg-emerald-100 text-emerald-700 border border-emerald-200' },
  cancelled:  { label: 'Cancelled',  classes: 'bg-red-100 text-red-600 border border-red-200' },
  pending:    { label: 'Pending',    classes: 'bg-amber-100 text-amber-700 border border-amber-200' },
};

const BookingCard = ({ booking }) => {
  const fi = booking.flightInstance;
  const flight = fi?.flight;
  const airline = flight?.airline;

  const depDate = fi?.departureTime ? new Date(fi.departureTime) : null;
  const arrDate = fi?.arrivalTime   ? new Date(fi.arrivalTime)   : null;

  const formatTime = (d) =>
    d ? d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—';

  const formatDate = (d) =>
    d ? d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

  const status = booking.status?.toLowerCase() ?? 'confirmed';
  const { label, classes } = statusConfig[status] ?? statusConfig.confirmed;

  const seats = booking.passengers?.map((p) => p.seatNumber).filter(Boolean) ?? [];

  return (
    <div className="bg-white border border-slate-100 rounded-3xl shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-blue-900/10 hover:border-blue-100 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
      {/* Top accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400" />

      <div className="p-6 md:p-8">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100">
              <FlightTakeoffIcon className="text-blue-600 text-[22px]" />
            </div>
            <div>
              <Typography className="font-extrabold text-slate-900 text-[17px] leading-tight">
                {airline?.name ?? 'Unknown Airline'}
              </Typography>
              <Typography className="text-slate-400 font-bold text-xs tracking-widest uppercase">
                {flight?.flightNumber ?? '—'}
              </Typography>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className={`text-[11px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg ${classes}`}>
              {label}
            </span>
          </div>
        </div>

        {/* Route */}
        <div className="flex items-center justify-center gap-4 bg-slate-50 rounded-2xl px-6 py-5 mb-6 border border-slate-100">
          <div className="text-center">
            <Typography className="font-black text-slate-900 text-3xl tracking-tight leading-none">
              {formatTime(depDate)}
            </Typography>
            <Typography className="text-slate-500 font-bold text-sm mt-1">
              {flight?.departureAirport?.code ?? '—'}
            </Typography>
          </div>

          <div className="flex-1 flex flex-col items-center px-4">
            <div className="w-full flex items-center relative py-2">
              <div className="h-[2px] bg-slate-200 w-full rounded-full" />
              <div className="absolute left-1/2 -translate-x-1/2 bg-slate-50 px-2">
                <FlightTakeoffIcon className="text-blue-400 -rotate-12 text-[20px]" />
              </div>
            </div>
            <Typography className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
              Non-stop
            </Typography>
          </div>

          <div className="text-center">
            <Typography className="font-black text-slate-900 text-3xl tracking-tight leading-none">
              {formatTime(arrDate)}
            </Typography>
            <Typography className="text-slate-500 font-bold text-sm mt-1">
              {flight?.arrivalAirport?.code ?? '—'}
            </Typography>
          </div>
        </div>

        {/* Meta info grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { icon: <CalendarMonthIcon className="text-blue-500 text-[18px]" />, label: 'Date', value: formatDate(depDate) },
            { icon: <GroupIcon className="text-indigo-500 text-[18px]" />, label: 'Passengers', value: booking.passengers?.length ?? 1 },
            { icon: <EventSeatIcon className="text-emerald-500 text-[18px]" />, label: 'Seats', value: seats.length > 0 ? seats.join(', ') : '—' },
            {
              icon: <ConfirmationNumberIcon className="text-amber-500 text-[18px]" />,
              label: 'Reference',
              value: booking.bookingReference ?? '—',
              mono: true
            },
          ].map(({ icon, label, value, mono }) => (
            <div key={label} className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
              <div className="flex items-center gap-1.5 mb-1.5">
                {icon}
                <Typography className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{label}</Typography>
              </div>
              <Typography className={`text-slate-800 font-bold text-sm truncate ${mono ? 'font-mono tracking-wide' : ''}`}>
                {value}
              </Typography>
            </div>
          ))}
        </div>

        {/* Footer: total price */}
        <div className="flex justify-end items-center border-t border-slate-100 pt-5">
          <div className="text-right">
            <Typography className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-0.5">
              Total Paid
            </Typography>
            <Typography className="font-black text-blue-600 text-2xl leading-none tracking-tight">
              ₹{(booking.totalPrice ?? 0).toLocaleString()}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authService.isLoggedIn()) {
      navigate('/login');
      return;
    }
    (async () => {
      try {
        const data = await bookingService.getUserBookings();
        console.log('Bookings API response:', data);
        if (Array.isArray(data)) {
          setBookings(data);
        } else if (data && Array.isArray(data.bookings)) {
          setBookings(data.bookings);
        } else if (data && Array.isArray(data.data)) {
          setBookings(data.data);
        } else {
          setBookings([]);
        }
      } catch (err) {
        setError('Could not load your bookings. Please try again.');
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  return (
    <MainLayout>
      {/* Page header */}
      <div className="bg-slate-900 text-white pt-24 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-slate-900/80 to-slate-900 z-10" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500 rounded-full blur-[100px] opacity-10 pointer-events-none" />

        <div className="relative z-20 text-center px-4">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center mx-auto mb-5">
            <ConfirmationNumberIcon className="text-white text-[32px]" />
          </div>
          <Typography variant="h2" className="font-black text-white tracking-tight text-[2rem] md:text-[3rem] mb-3">
            My Bookings
          </Typography>
          <Typography className="text-blue-200 font-medium text-lg max-w-lg mx-auto">
            View and manage all your flight reservations in one place.
          </Typography>
        </div>
      </div>

      {/* Content */}
      <div className="bg-slate-50 min-h-screen py-14 px-4 md:px-8 -mt-10 rounded-t-[40px] relative z-20 shadow-2xl shadow-slate-900/5">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="flex flex-col justify-center items-center py-32 gap-4">
              <CircularProgress size={50} thickness={4} className="text-blue-600" />
              <Typography className="text-slate-400 font-bold uppercase tracking-widest text-sm">
                Fetching your bookings...
              </Typography>
            </div>
          ) : error ? (
            <Alert severity="error" className="rounded-2xl font-bold bg-red-50 text-red-700 border border-red-100 p-6">
              {error}
            </Alert>
          ) : bookings.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-16 text-center max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ConfirmationNumberIcon className="text-slate-400 text-[36px]" />
              </div>
              <Typography variant="h5" className="text-slate-900 font-bold mb-3">
                No bookings yet
              </Typography>
              <Typography className="text-slate-500 font-medium text-lg mb-8">
                You haven't booked any flights yet. Start exploring destinations!
              </Typography>
              <button
                onClick={() => navigate('/')}
                className="px-10 py-3.5 rounded-xl text-[15px] font-black text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25 transition-all duration-200"
              >
                Search Flights
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <Typography variant="h5" className="text-slate-800 font-extrabold tracking-tight">
                  {bookings.length}{' '}
                  <span className="text-slate-500 font-medium">
                    Booking{bookings.length !== 1 ? 's' : ''}
                  </span>
                </Typography>
              </div>
              <div className="space-y-6">
                {bookings.map((booking) => (
                  <BookingCard key={booking._id} booking={booking} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default MyBookings;
