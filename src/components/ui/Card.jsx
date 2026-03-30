import React from 'react';
import { Card as MuiCard, CardContent as MuiCardContent } from '@mui/material';

export const Card = ({ children, className = '', ...props }) => {
  return (
    <MuiCard
      className={`rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 ${className}`}
      {...props}
    >
      {children}
    </MuiCard>
  );
};

export const CardContent = ({ children, className = '', ...props }) => {
  return (
    <MuiCardContent className={`p-6 ${className}`} {...props}>
      {children}
    </MuiCardContent>
  );
};
