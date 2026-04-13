import React from 'react';
import { Box, Typography } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

const Footer = () => {
  return (
    <Box component="footer" className="bg-slate-900 text-slate-300 py-12 mt-auto border-t border-slate-800">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2 pr-8">
          <div className="flex items-center gap-2 mb-4 text-white">
            <FlightTakeoffIcon fontSize="medium" className="text-blue-500" />
            <Typography variant="h6" className="font-bold tracking-tight">AeroHUB</Typography>
          </div>
          <Typography variant="body2" className="text-slate-400 leading-relaxed mb-6 max-w-sm">
            Your premium travel partner. We make exploring the world affordable, comfortable, and completely seamless.
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1" className="font-bold mb-4 text-white">Quick Links</Typography>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-blue-400 transition-colors block">Search Flights</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors block">Manage Booking</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors block">Travel Advisory</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors block">Contact Support</a></li>
          </ul>
        </div>
        <div>
          <Typography variant="subtitle1" className="font-bold mb-4 text-white">Legal</Typography>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-blue-400 transition-colors block">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors block">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors block">Cookie Policy</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors block">Refund Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800/60 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} AeroHUB. All rights reserved.</p>
        <p className="mt-4 md:mt-0">Designed with modern aesthetics.</p>
      </div>
    </Box>
  );
};

export default Footer;
