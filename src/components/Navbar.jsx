import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Chip
} from '@mui/material';
import {
  Videocam,
  Settings,
  Notifications
} from '@mui/icons-material';

/**
 * Componente de barra de navegación superior
 * Muestra el logo, nombre del sistema y controles básicos
 */
const Navbar = () => {
  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: '#1a1a1a',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo y nombre del sistema */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Videocam sx={{ fontSize: 32, color: '#00e676' }} />
          <Box>
            <Typography 
              variant="h5" 
              component="h1" 
              sx={{ 
                fontWeight: 'bold',
                color: 'white',
                letterSpacing: '0.5px'
              }}
            >
              OcluTrack Vision
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: '#b0bec5',
                fontSize: '0.75rem'
              }}
            >
              Sistema Inteligente de Videovigilancia
            </Typography>
          </Box>
        </Box>

        {/* Estado del sistema y controles */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip 
            label="Sistema Activo" 
            size="small"
            sx={{ 
              backgroundColor: '#00e676',
              color: '#000',
              fontWeight: 'bold'
            }}
          />
          
          <IconButton 
            color="inherit"
            sx={{ 
              '&:hover': { 
                backgroundColor: 'rgba(255,255,255,0.1)' 
              }
            }}
          >
            <Notifications />
          </IconButton>
          
          <IconButton 
            color="inherit"
            sx={{ 
              '&:hover': { 
                backgroundColor: 'rgba(255,255,255,0.1)' 
              }
            }}
          >
            <Settings />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;