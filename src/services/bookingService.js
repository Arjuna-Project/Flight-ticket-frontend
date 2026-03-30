import api from './api';

const createBooking = async (bookingData) => {
  const response = await api.post('/bookings', bookingData);
  return response.data;
};

const getUserBookings = async () => {
  const response = await api.get('/bookings/my-bookings');
  return response.data;
};

const getBookingById = async (id) => {
  const response = await api.get(`/bookings/${id}`);
  return response.data;
};

const bookingService = {
  createBooking,
  getUserBookings,
  getBookingById
};

export default bookingService;
