import React, { useState } from 'react';
import { Typography, Grid } from '@mui/material';
import Input from '../ui/Input';

const PassengerForm = ({ passengerCount, seatSelections, onSubmit, loading }) => {
  const [passengers, setPassengers] = useState(
    Array.from({ length: passengerCount }).map(() => ({ name: '', age: '' }))
  );

  const handleChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalPassengers = passengers.map((p, idx) => ({
      ...p,
      seatNumber: seatSelections[idx] || 'Unassigned'
    }));
    onSubmit(finalPassengers);
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 p-8 md:p-10">
      <Typography variant="h5" className="font-extrabold text-slate-900 mb-8 tracking-tight border-b border-slate-100 pb-5">
        Passenger Details
      </Typography>
      
      <form onSubmit={handleSubmit}>
        {passengers.map((p, idx) => (
          <div key={idx} className="mb-8">
            <Typography className="text-blue-600 mb-4 font-black uppercase tracking-widest text-[11px] flex items-center gap-3">
              Passenger {idx + 1} 
              {seatSelections[idx] && (
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100">
                  Seat {seatSelections[idx]}
                </span>
              )}
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={8}>
                <Input
                  label="Full Name (as per ID)"
                  required
                  value={p.name}
                  onChange={(e) => handleChange(idx, 'name', e.target.value)}
                  className="bg-slate-50 rounded-xl"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Input
                  label="Age"
                  type="number"
                  required
                  inputProps={{ min: 0, max: 120 }}
                  value={p.age}
                  onChange={(e) => handleChange(idx, 'age', e.target.value)}
                  className="bg-slate-50 rounded-xl"
                  fullWidth
                />
              </Grid>
            </Grid>
            {idx < passengers.length - 1 && <div className="h-px bg-slate-100 w-full mt-8" />}
          </div>
        ))}

        <div className="pt-4 border-t border-slate-100 mt-4">
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-4 rounded-xl text-[16px] font-black tracking-wide text-white transition-all duration-200 ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/25 active:-translate-y-0.5'}`}
          >
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PassengerForm;
