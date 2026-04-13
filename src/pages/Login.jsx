import React, { useState } from 'react';
import { Typography, Alert } from '@mui/material';
import Input from '../components/ui/Input';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import FlightIcon from '@mui/icons-material/Flight';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    setLoading(true);

    try {
      const data = await authService.login(email, password);
      const role = data?.user?.role;
      navigate(role === 'admin' ? '/admin' : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative py-12 px-4 transition-colors duration-500 overflow-hidden bg-slate-50">
      {/* Decorative Backgrounds */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[420px]">
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 rounded-[20px] shadow-2xl mb-4 transition-all duration-300 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/40">
            <FlightIcon className="text-white text-[40px] rotate-45" />
          </div>
          <Typography variant="h4" className="font-black tracking-tight text-slate-900">
            AeroHUB
          </Typography>
          <Typography variant="body1" className="text-slate-500 mt-2 font-medium">
            Welcome back! Please enter your details.
          </Typography>
        </div>

        <div className="rounded-[32px] overflow-hidden backdrop-blur-xl border shadow-2xl transition-all duration-500 bg-white/90 border-white shadow-blue-900/10">
          <div className="p-8 sm:p-10">
            {error && (
              <Alert 
                severity="error" 
                className="mb-6 rounded-2xl font-bold bg-red-50 text-red-700 border border-red-100"
              >
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input 
                label="Email Address" 
                type="email" 
                required 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-xl transition-colors bg-slate-50 [&_fieldset]:border-slate-200"
              />

              <Input 
                label="Password" 
                type="password" 
                required 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                className="w-full rounded-xl transition-colors bg-slate-50 [&_fieldset]:border-slate-200"
              />

              <button 
                type="submit" 
                disabled={loading} 
                className={`w-full mt-4 py-4 rounded-xl text-[16px] font-black tracking-wide text-white transition-all duration-300 ${
                  loading 
                    ? 'opacity-50 cursor-not-allowed bg-blue-400' 
                    : 'bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/30'
                }`}
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <Typography variant="body2" className="text-slate-500 font-medium">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-600 font-black hover:text-blue-700 transition-colors">
                  Sign up free
                </Link>
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
