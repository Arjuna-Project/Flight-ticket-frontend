import React, { useState } from 'react';
import { Typography, Alert, Tab, Tabs } from '@mui/material';
import Input from '../components/ui/Input';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import FlightIcon from '@mui/icons-material/Flight';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import ShieldIcon from '@mui/icons-material/Shield';

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isAdminTab = activeTab === 1;

  const handleTabChange = (_, newVal) => {
    setActiveTab(newVal); 
    setEmail(''); 
    setPassword(''); 
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);

    try {
      const data = await authService.login(email, password);
      const role = data?.user?.role;
      if (isAdminTab && role !== 'admin') {
        setError('Access denied. This is not an admin account.');
        authService.logout();
        return;
      }
      navigate(role === 'admin' ? '/admin' : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally { setLoading(false); }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center relative py-12 px-4 transition-colors duration-500 overflow-hidden ${
      isAdminTab ? 'bg-slate-900' : 'bg-slate-50'
    }`}>
      {/* Decorative Backgrounds */}
      {isAdminTab ? (
        <>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-[120px] pointer-events-none" />
        </>
      )}

      <div className="relative z-10 w-full max-w-[420px]">
        <div className="flex flex-col items-center mb-8">
          <div className={`p-4 rounded-[20px] shadow-2xl mb-4 transition-all duration-300 ${
            isAdminTab 
              ? 'bg-gradient-to-br from-indigo-500 to-violet-600 shadow-indigo-500/40' 
              : 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/40'
          }`}>
            {isAdminTab 
              ? <AdminPanelSettingsIcon className="text-white text-[40px]" /> 
              : <FlightIcon className="text-white text-[40px] rotate-45" />
            }
          </div>
          <Typography variant="h4" className={`font-black tracking-tight ${isAdminTab ? 'text-white' : 'text-slate-900'}`}>
            SkyBooker
          </Typography>
        </div>

        <div className={`rounded-[32px] overflow-hidden backdrop-blur-xl border shadow-2xl transition-all duration-500 ${
          isAdminTab 
            ? 'bg-slate-900/80 border-indigo-500/30 shadow-indigo-900/50' 
            : 'bg-white/90 border-white shadow-blue-900/10'
        }`}>
          <div className={`border-b ${isAdminTab ? 'border-indigo-500/30' : 'border-slate-100'}`}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange} 
              variant="fullWidth"
              className={isAdminTab ? '[&_.MuiTabs-indicator]:bg-indigo-400' : '[&_.MuiTabs-indicator]:bg-blue-600'}
            >
              <Tab 
                icon={<PersonIcon fontSize="small"/>} 
                iconPosition="start" 
                label="User" 
                className={`font-bold transition-colors ${
                  activeTab === 0 
                    ? (isAdminTab ? 'text-indigo-400' : 'text-blue-600') 
                    : (isAdminTab ? 'text-slate-400' : 'text-slate-500')
                }`}
              />
              <Tab 
                icon={<ShieldIcon fontSize="small"/>} 
                iconPosition="start" 
                label="Admin" 
                className={`font-bold transition-colors ${
                  activeTab === 1 
                    ? (isAdminTab ? 'text-indigo-400' : 'text-blue-600') 
                    : (isAdminTab ? 'text-slate-400' : 'text-slate-500')
                }`}
              />
            </Tabs>
          </div>

          <div className="p-8 sm:p-10">
            {error && (
              <Alert 
                severity="error" 
                className={`mb-6 rounded-2xl font-bold ${
                  isAdminTab 
                    ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                    : 'bg-red-50 text-red-700 border border-red-100'
                }`}
              >
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input 
                label={isAdminTab ? 'Admin Email' : 'Email Address'} 
                type="email" 
                required 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                className={`w-full rounded-xl transition-colors ${
                  isAdminTab 
                    ? '[&_.MuiOutlinedInput-root]:text-slate-200 [&_fieldset]:border-slate-700 [&_.MuiInputLabel-root]:text-slate-400 [&_.MuiOutlinedInput-root]:bg-slate-800/50 hover:[&_fieldset]:border-indigo-400' 
                    : 'bg-slate-50 [&_fieldset]:border-slate-200'
                }`}
              />

              <Input 
                label="Password" 
                type="password" 
                required 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                className={`w-full rounded-xl transition-colors ${
                  isAdminTab 
                    ? '[&_.MuiOutlinedInput-root]:text-slate-200 [&_fieldset]:border-slate-700 [&_.MuiInputLabel-root]:text-slate-400 [&_.MuiOutlinedInput-root]:bg-slate-800/50 hover:[&_fieldset]:border-indigo-400' 
                    : 'bg-slate-50 [&_fieldset]:border-slate-200'
                }`}
              />

              <button 
                type="submit" 
                disabled={loading} 
                className={`w-full mt-4 py-4 rounded-xl text-[16px] font-black tracking-wide text-white transition-all duration-300 ${
                  loading 
                    ? 'opacity-50 cursor-not-allowed' 
                    : isAdminTab 
                      ? 'bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-500/30' 
                      : 'bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/30'
                }`}
              >
                {loading ? 'Authenticating...' : (isAdminTab ? 'Access Dashboard' : 'Sign In')}
              </button>
            </form>

            {!isAdminTab && (
              <div className="mt-8 text-center">
                <Typography variant="body2" className="text-slate-500 font-medium">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-blue-600 font-black hover:text-blue-700 transition-colors">
                    Sign up free
                  </Link>
                </Typography>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
