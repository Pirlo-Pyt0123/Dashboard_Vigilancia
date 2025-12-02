import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Chip,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Videocam,
  Settings,
  Notifications,
  AccountCircle,
  Logout,
  Person,
  AdminPanelSettings
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext.jsx';

/**
 * Componente de barra de navegación superior
 * Muestra el logo, nombre del sistema, información del usuario y controles
 */
const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };
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
          
          {/* Info del usuario */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: '#b0bec5' }}>
              {user?.name || user?.username}
            </Typography>
            <Chip 
              label={isAdmin() ? 'Admin' : 'Operador'} 
              size="small"
              variant="outlined"
              sx={{ 
                color: isAdmin() ? '#ff9800' : '#2196f3',
                borderColor: isAdmin() ? '#ff9800' : '#2196f3'
              }}
            />
          </Box>
          
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

          {/* Avatar del usuario */}
          <IconButton 
            onClick={handleMenuOpen}
            sx={{ 
              '&:hover': { 
                backgroundColor: 'rgba(255,255,255,0.1)' 
              }
            }}
          >
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32,
                backgroundColor: isAdmin() ? '#ff9800' : '#2196f3'
              }}
            >
              {isAdmin() ? <AdminPanelSettings /> : <Person />}
            </Avatar>
          </IconButton>

          {/* Menú del usuario */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                backgroundColor: '#2a2a2a',
                border: '1px solid #404040',
                minWidth: 200
              }
            }}
          >
            <MenuItem disabled>
              <ListItemIcon>
                <AccountCircle sx={{ color: '#b0bec5' }} />
              </ListItemIcon>
              <ListItemText 
                primary={user?.name || user?.username}
                secondary={user?.role === 'administrator' ? 'Administrador' : 'Operador'}
                primaryTypographyProps={{ color: 'white' }}
                secondaryTypographyProps={{ color: '#b0bec5' }}
              />
            </MenuItem>
            
            <Divider sx={{ backgroundColor: '#404040' }} />
            
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout sx={{ color: '#f44336' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Cerrar Sesión"
                primaryTypographyProps={{ color: '#f44336' }}
              />
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;