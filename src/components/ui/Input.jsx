import React from 'react';
import { TextField } from '@mui/material';

const Input = ({ className = '', ...props }) => {
  return (
    <TextField
      variant="outlined"
      fullWidth
      className={`rounded-md bg-white ${className}`}
      {...props}
    />
  );
};

export default Input;
