import React, { useState } from 'react';
import { Typography, MenuItem, Autocomplete, TextField } from '@mui/material';
import Input from '../ui/Input';
import SearchIcon from '@mui/icons-material/Search';

const airports = [
  { code: 'DEL', name: 'Indira Gandhi International, Delhi' },
  { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj, Mumbai' },
  { code: 'BLR', name: 'Kempegowda International, Bengaluru' },
  { code: 'HYD', name: 'Rajiv Gandhi International, Hyderabad' },
  { code: 'CCU', name: 'Netaji Subhas Chandra Bose, Kolkata' },
  { code: 'MAA', name: 'Chennai International, Chennai' },
  { code: 'JFK', name: 'John F. Kennedy, New York' },
  { code: 'LHR', name: 'Heathrow, London' },
];

const SearchForm = ({ onSearch }) => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [travelClass, setTravelClass] = useState('Economy');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (from && to && date && passengers) {
      onSearch({
        from: from.code,
        to: to.code,
        date,
        passengers,
        class: travelClass
      });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 lg:px-8">
      <div className="bg-white/95 backdrop-blur-xl rounded-[32px] shadow-2xl shadow-blue-900/10 border border-white p-6 md:p-10 relative">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100">
            <SearchIcon className="text-blue-600 font-bold text-[24px]" />
          </div>
          <div>
            <Typography variant="h5" className="text-slate-900 font-black tracking-tight leading-none">Find your next flight</Typography>
            <Typography variant="body2" className="text-slate-500 font-medium mt-1">Book premium seats at the best prices.</Typography>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <Autocomplete
              options={airports}
              getOptionLabel={(option) => `${option.name} (${option.code})`}
              value={from}
              onChange={(e, val) => setFrom(val)}
              className="w-full"
              renderInput={(params) => <TextField {...params} label="From" variant="outlined" required className="bg-slate-50 rounded-xl" />}
            />
            <Autocomplete
              options={airports}
              getOptionLabel={(option) => `${option.name} (${option.code})`}
              value={to}
              onChange={(e, val) => setTo(val)}
              className="w-full"
              renderInput={(params) => <TextField {...params} label="To" variant="outlined" required className="bg-slate-50 rounded-xl" />}
            />
            <Input
              type="date"
              label="Departure"
              InputLabelProps={{ shrink: true }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full bg-slate-50 rounded-xl"
            />
            <TextField
              select
              label="Travelers"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              fullWidth
              variant="outlined"
              className="bg-slate-50 rounded-xl"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <MenuItem key={num} value={num} className="font-bold">{num} Adult{num > 1 ? 's' : ''}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Cabin Class"
              value={travelClass}
              onChange={(e) => setTravelClass(e.target.value)}
              fullWidth
              variant="outlined"
              className="bg-slate-50 rounded-xl"
            >
              <MenuItem value="Economy" className="font-bold">Economy</MenuItem>
              <MenuItem value="Premium Economy" className="font-bold">Premium</MenuItem>
              <MenuItem value="Business" className="font-bold">Business</MenuItem>
              <MenuItem value="First" className="font-bold">First Class</MenuItem>
            </TextField>
          </div>
          <div className="flex justify-center md:justify-end mt-8">
            <button
              type="submit"
              className="w-full md:w-auto px-12 py-4 rounded-xl text-base font-black tracking-wide text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-200"
            >
              Search Flights
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
