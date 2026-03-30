import React from 'react';
import { Container as MuiContainer } from '@mui/material';

const Container = ({ children, className = '', maxWidth = 'lg', ...props }) => {
  return (
    <MuiContainer maxWidth={maxWidth} className={`px-4 sm:px-6 lg:px-8 mx-auto ${className}`} {...props}>
      {children}
    </MuiContainer>
  );
};

export default Container;
