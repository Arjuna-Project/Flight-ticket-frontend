import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // blue-600
      light: '#60a5fa',
      dark: '#1e40af',
    },
    secondary: {
      main: '#10b981', // emerald-500
      light: '#34d399',
      dark: '#047857',
    },
    background: {
      default: '#f8fafc', // slate-50
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a', // slate-900
      secondary: '#475569', // slate-600
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica Neue", "Arial", sans-serif',
    h1: { fontSize: '3rem', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.02em' },
    h2: { fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.3, letterSpacing: '-0.01em' },
    h3: { fontSize: '2rem', fontWeight: 700, lineHeight: 1.3 },
    h4: { fontSize: '1.75rem', fontWeight: 600, lineHeight: 1.4 },
    h5: { fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.4 },
    h6: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.4 },
    body1: { fontSize: '1.125rem', lineHeight: 1.6, color: '#334155' },
    body2: { fontSize: '1rem', lineHeight: 1.6, color: '#475569' },
    button: { textTransform: 'none', fontWeight: 600, fontSize: '1.1rem' },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
          fontWeight: 600,
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        }
      }
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
