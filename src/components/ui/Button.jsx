import React from 'react';
import { Button as MuiButton } from '@mui/material';

const Button = ({ children, className = '', variant = 'contained', color = 'primary', ...props }) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      className={`font-semibold py-2 px-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
