import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import ShieldIcon from '@mui/icons-material/Shield';
import Button from '../ui/Button';
import authService from '../../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  const isAdmin = authService.isAdmin();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <AppBar position="sticky" color="inherit" elevation={0} className="bg-white/95 backdrop-blur-lg border-b border-slate-100 z-50">
      <Toolbar className="container mx-auto flex justify-between items-center py-2 min-h-[72px]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 no-underline group outline-none focus:ring-2 focus:ring-blue-500 rounded-lg pr-2">
          <Box className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-md group-hover:shadow-blue-500/30 transition-all duration-300 group-hover:-translate-y-0.5">
            <FlightTakeoffIcon className="text-white text-[20px] group-hover:-rotate-12 transition-transform duration-300" />
          </Box>
          <Typography variant="h6" className="font-extrabold tracking-tight text-slate-800 group-hover:text-blue-600 transition-colors">
            SkyBooker
          </Typography>
        </Link>

        {/* Actions */}
        <Box className="flex items-center gap-4">
          {user ? (
            <>
              <Typography variant="body2" className="font-medium text-slate-500 hidden sm:block mr-2">
                Hello, <span className="text-slate-900 font-bold">{user.name}</span>
              </Typography>

              {isAdmin && (
                <Button 
                  component={Link} 
                  to="/admin" 
                  variant="outlined" 
                  size="small"
                  className="rounded-full px-4 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 flex items-center gap-1.5 font-bold tracking-wide transition-all shadow-sm"
                >
                  <ShieldIcon className="text-[16px]" /> Admin
                </Button>
              )}

              <Button 
                onClick={handleLogout} 
                variant="text" 
                className="text-slate-500 hover:text-red-600 hover:bg-red-50 font-bold px-4 rounded-full transition-colors"
              >
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button 
                component={Link} 
                to="/login" 
                variant="text" 
                className="text-slate-600 hover:text-blue-600 font-bold tracking-wide transition-colors"
              >
                Log in
              </Button>
              <Button 
                component={Link} 
                to="/register" 
                variant="contained" 
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-7 py-2.5 font-bold shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all"
              >
                Sign up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
