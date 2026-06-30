import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#327C81',
      light: '#83C5BE',
      dark: '#1d474a',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#F472B6',
      light: '#ff92d3',
      dark: '#fab9db',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1d474a',
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
      color: '#1d474a',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5rem',
      color: '#1d474a',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
      color: '#1d474a',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      color: '#1d474a',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      color: '#1d474a',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      color: '#1d474a',
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