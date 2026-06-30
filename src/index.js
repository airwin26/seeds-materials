import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9E5E4B',
      light: '#C4A090',
      dark: '#4D2D2A',
      contrastText: '#F8F1E9',
    },
    secondary: {
      main: '#96C98D',
      light: '#B5D9AE',
      dark: '#6FA865',
      contrastText: '#4D2D2A',
    },
    background: {
      default: '#F8F1E9',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#4D2D2A',
      secondary: '#787878',
    },
    grey: {
      500: '#bdbdbd',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      color: '#4D2D2A',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5rem',
      color: '#4D2D2A',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
      color: '#4D2D2A',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      color: '#4D2D2A',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      color: '#4D2D2A',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      color: '#4D2D2A',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 24px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
          borderRadius: 12,
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
); 