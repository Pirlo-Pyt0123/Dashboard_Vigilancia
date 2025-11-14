import { createTheme } from '@mui/material/styles';

/**
 * Configuración de tema oscuro para OcluTrack Vision
 * Tema personalizado con colores de la marca y diseño moderno
 */
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00e676',
      light: '#5efc82',
      dark: '#00b248',
      contrastText: '#000000'
    },
    secondary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
      contrastText: '#ffffff'
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
      contrastText: '#ffffff'
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: '#000000'
    },
    info: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
      contrastText: '#ffffff'
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
      contrastText: '#ffffff'
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e'
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
      disabled: '#757575'
    },
    divider: '#404040'
  },
  typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.2
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.2
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.2
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.2
    },
    h6: {
      fontSize: '1.1rem',
      fontWeight: 600,
      lineHeight: 1.2
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.66
    }
  },
  shape: {
    borderRadius: 8
  },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#404040 #121212',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: 8,
            height: 8
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#404040',
            '&:hover': {
              backgroundColor: '#555555'
            }
          },
          '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
            borderRadius: 8,
            backgroundColor: '#121212'
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a',
          borderBottom: '1px solid #404040'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#2a2a2a',
          border: '1px solid #404040',
          '&:hover': {
            borderColor: '#555555'
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#2a2a2a',
          border: '1px solid #404040'
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a'
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: '#404040'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.08)'
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 600
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1a1a1a',
          border: '1px solid #404040'
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#404040',
          color: '#ffffff',
          fontSize: '0.75rem'
        }
      }
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiSnackbarContent-root': {
            backgroundColor: '#2a2a2a',
            border: '1px solid #404040',
            color: '#ffffff'
          }
        }
      }
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: '#00e676',
            '& + .MuiSwitch-track': {
              backgroundColor: '#00e676',
              opacity: 0.5
            }
          }
        }
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: '#404040',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#00e676'
          }
        }
      }
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: '#404040'
        }
      }
    }
  }
});

export default theme;