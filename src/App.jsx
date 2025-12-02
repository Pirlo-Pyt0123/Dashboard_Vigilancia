import React from 'react';
import {
  ThemeProvider,
  CssBaseline,
  CircularProgress,
  Box
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import Login from './components/Login.jsx';
import Navbar from './components/Navbar.jsx';
import Dashboard from './components/Dashboard.jsx';

// Tema oscuro completo
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00e676',
      light: '#5efc82',
      dark: '#00b248'
    },
    secondary: {
      main: '#2196f3',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e'
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    }
  },
});

/**
 * Componente que maneja la lógica de autenticación
 */
const AppContent = () => {
  const { user, loading } = useAuth();

  // Mostrar loading mientras se verifica la sesión
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#121212'
        }}
      >
        <CircularProgress sx={{ color: '#00e676' }} />
      </Box>
    );
  }

  // Si no hay usuario autenticado, mostrar login
  if (!user) {
    return <Login />;
  }

  // Si hay usuario autenticado, mostrar dashboard
  return (
    <>
      <Navbar />
      <Dashboard />
    </>
  );
};

/**
 * Componente principal de la aplicación
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;