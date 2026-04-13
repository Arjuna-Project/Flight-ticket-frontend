import React, { useState } from 'react';
import { Typography, Alert } from '@mui/material';
import Input from '../components/ui/Input';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import FlightIcon from '@mui/icons-material/Flight';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);

    try {
      await authService.register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-400/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-[32px] border border-white shadow-2xl shadow-emerald-900/10 relative z-10 my-8">
        <div className="p-8 sm:p-10">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-4 rounded-2xl shadow-xl shadow-emerald-500/30">
              <FlightIcon className="text-white text-[32px] rotate-45" />
            </div>
          </div>
          
          <Typography variant="h4" className="text-center font-black text-slate-900 mb-2 tracking-tight">
            Create Account
          </Typography>
          <Typography className="text-center text-slate-500 mb-8 font-medium">
            Join AeroHUB for the best flights and deals.
          </Typography>

          {error && (
            <Alert severity="error" className="mb-6 rounded-2xl font-bold bg-red-50 text-red-700 border border-red-100">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 rounded-xl"
            />

            <Input
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 rounded-xl"
            />
            
            <Input
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 rounded-xl"
            />

            <Input
              label="Confirm Password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-slate-50 rounded-xl"
            />

            <button 
              type="submit" 
              disabled={loading} 
              className={`w-full py-4 mt-6 rounded-xl text-[16px] font-black tracking-wide text-white transition-all duration-300 ${
                loading ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-500/30 active:-translate-y-0.5'
              }`}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-slate-100">
            <Typography className="text-slate-500 font-medium text-[15px]">
              Already have an account?{' '}
              <Link to="/login" className="font-black text-emerald-600 hover:text-emerald-700 transition-colors">
                Sign in
              </Link>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
