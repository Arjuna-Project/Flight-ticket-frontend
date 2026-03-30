import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import FlightResults from '../pages/FlightResults';
import FlightDetails from '../pages/FlightDetails';
import Booking from '../pages/Booking';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminBookings from '../pages/admin/AdminBookings';
import AdminFlights from '../pages/admin/AdminFlights';
import { AdminRoute } from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/results" element={<FlightResults />} />
      <Route path="/flight/:id" element={<FlightDetails />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
      <Route path="/admin/bookings" element={<AdminRoute><AdminBookings /></AdminRoute>} />
      <Route path="/admin/flights" element={<AdminRoute><AdminFlights /></AdminRoute>} />
    </Routes>
  );
};
export default AppRoutes;
