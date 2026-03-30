import api from './api';

const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

const register = async (name, email, password) => {
  const response = await api.post('/auth/register', { name, email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
};

const getToken = () => localStorage.getItem('token');
const isAdmin = () => {
  const user = getCurrentUser();
  return user && user.role === 'admin';
};
const isLoggedIn = () => !!getToken();

const authService = { login, register, logout, getCurrentUser, getToken, isAdmin, isLoggedIn };
export default authService;
