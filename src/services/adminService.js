import api from './api';
import authService from './authService';

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${authService.getToken()}` }
});

const getDashboardStats = async () => (await api.get('/admin/stats', getAuthHeaders())).data;
const getAllUsers = async () => (await api.get('/admin/users', getAuthHeaders())).data;
const getAllBookings = async () => (await api.get('/admin/bookings', getAuthHeaders())).data;
const getAllFlights = async () => (await api.get('/admin/flights', getAuthHeaders())).data;

const updateFlightStatus = async (flightId, status) => 
  (await api.patch(`/admin/flights/${flightId}/status`, { status }, getAuthHeaders())).data;

const deleteFlightInstance = async (flightId) => 
  (await api.delete(`/admin/flights/${flightId}`, getAuthHeaders())).data;

const cancelBooking = async (bookingId) => 
  (await api.patch(`/admin/bookings/${bookingId}/cancel`, {}, getAuthHeaders())).data;

const adminService = {
  getDashboardStats, getAllUsers, getAllBookings, getAllFlights,
  updateFlightStatus, deleteFlightInstance, cancelBooking
};
export default adminService;
