import React, { useState, useEffect } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Grid,
  Box,
  Typography,
  Fab,
  Alert,
  Chip
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar.jsx';
import StatsCards from './components/StatsCards.jsx';
import AlertGallery from './components/AlertGallery.jsx';
import EventTable from './components/EventTable.jsx';
import LiveVideoPanel from './components/LiveVideoPanel.jsx';
import { getSummary, getAlerts, getCaptures } from './services/api.js';

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

function App() {
  // Estados del dashboard
  const [summary, setSummary] = useState({
    personsDetected: 0,
    activeAlerts: 0,
    capturesGenerated: 0
  });
  const [alerts, setAlerts] = useState([]);
  const [captures, setCaptures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Función para cargar todos los datos
  const loadData = async () => {
    try {
      setLoading(true);
      
      // Cargar datos en paralelo
      const [summaryData, alertsData, capturesData] = await Promise.all([
        getSummary(),
        getAlerts(),
        getCaptures()
      ]);

      setSummary(summaryData);
      setAlerts(alertsData);
      setCaptures(capturesData);
      setLastUpdate(new Date());
      
      console.log('✅ Datos cargados desde OcluTrack Vision:', {
        summary: summaryData,
        alerts: alertsData.length,
        captures: capturesData.length
      });
      
    } catch (error) {
      console.error('❌ Error cargando datos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para refresh manual
  const refreshData = () => {
    loadData();
  };

  // Cargar datos iniciales
  useEffect(() => {
    loadData();
  }, []);

  // Auto-refresh cada 15 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading) {
        loadData();
      }
    }, 15000);
    
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Navbar superior */}
      <Navbar />

      {/* Contenido principal */}
      <Container 
        maxWidth={false} 
        sx={{ 
          py: 3,
          backgroundColor: '#121212',
          minHeight: 'calc(100vh - 64px)',
          px: { xs: 2, sm: 3 }
        }}
      >
        <Grid container spacing={3}>
          {/* Tarjetas de estadísticas */}
          <Grid item xs={12}>
            <StatsCards summary={summary} loading={loading} />
          </Grid>


          {/* Panel de video en vivo */}
          <Grid item xs={12}>
            <LiveVideoPanel loading={loading} />
          </Grid>

          {/* Layout de dos columnas */}
          <Grid item xs={12} lg={8}>
            <AlertGallery captures={captures} loading={loading} />
          </Grid>

          <Grid item xs={12} lg={4}>
            <Box sx={{ 
              backgroundColor: '#1e1e1e',
              border: '1px solid #404040',
              borderRadius: 2,
              p: 3,
              textAlign: 'center'
            }}>
              <Typography variant="h6" sx={{ color: '#00e676', mb: 2 }}>
                📊 Estado del Sistema
              </Typography>
              <Typography variant="body2" sx={{ color: '#b0bec5', mb: 1 }}>
                Servidor Python: {loading ? 'Conectando...' : 'Online'}
              </Typography>
              <Typography variant="body2" sx={{ color: '#b0bec5', mb: 1 }}>
                API Endpoint: localhost:8000
              </Typography>
              <Typography variant="body2" sx={{ color: '#b0bec5' }}>
                Última sync: {lastUpdate.toLocaleString()}
              </Typography>
            </Box>
          </Grid>

          {/* Tabla de eventos históricos */}
          <Grid item xs={12}>
            <EventTable alerts={alerts} loading={loading} />
          </Grid>
        </Grid>

        {/* Botón flotante para refresh manual */}
        <Fab
          color="primary"
          aria-label="refresh"
          onClick={refreshData}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000,
            '&:hover': {
              transform: 'scale(1.1)',
              boxShadow: '0 8px 25px rgba(0,230,118,0.3)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          <RefreshIcon />
        </Fab>
      </Container>
    </ThemeProvider>
  );
}

export default App;