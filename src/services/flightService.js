import api from './api';

const searchFlights = async (params) => {
  const response = await api.get('/flights/search', { params });
  return response.data;
};

const getFlightById = async (id) => {
  const response = await api.get(`/flights/${id}`);
  return response.data;
};

const flightService = {
  searchFlights,
  getFlightById
};

export default flightService;
