import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
  Paper
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
  Security,
  VideoCall
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext.jsx';

/**
 * Componente de Login para el Dashboard de Vigilancia
 */
const Login = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error al escribir
    if (error) setError('');
  };

  // Manejar submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!credentials.username || !credentials.password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await login(credentials);
      if (!result.success) {
        setError(result.error || 'Credenciales incorrectas. Prueba: admin/123456 o operador/123456');
      }
    } catch (err) {
      setError('Error de conexión. Verifica el servidor.');
    } finally {
      setLoading(false);
    }
  };

  // Toggle mostrar/ocultar contraseña
  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #2d2d2d 50%, #1a1a1a 75%, #0a0a0a 100%)',
        padding: 2,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animación de partículas flotantes */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          zIndex: 0
        }}
      >
        {/* Círculos animados grandes */}
        {[...Array(5)].map((_, i) => (
          <Box
            key={`circle-${i}`}
            sx={{
              position: 'absolute',
              width: `${200 + i * 50}px`,
              height: `${200 + i * 50}px`,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(0,230,118,${0.1 - i * 0.015}) 0%, transparent 70%)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-${i} ${15 + i * 3}s ease-in-out infinite`,
              '@keyframes float-0': {
                '0%, 100%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
                '33%': { transform: 'translate(-30%, -70%) rotate(120deg)' },
                '66%': { transform: 'translate(-70%, -30%) rotate(240deg)' },
              },
              '@keyframes float-1': {
                '0%, 100%': { transform: 'translate(-50%, -50%) rotate(0deg) scale(1)' },
                '50%': { transform: 'translate(-80%, -20%) rotate(180deg) scale(1.2)' },
              },
              '@keyframes float-2': {
                '0%, 100%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
                '25%': { transform: 'translate(-20%, -80%) rotate(90deg)' },
                '50%': { transform: 'translate(-80%, -80%) rotate(180deg)' },
                '75%': { transform: 'translate(-80%, -20%) rotate(270deg)' },
              },
              '@keyframes float-3': {
                '0%, 100%': { transform: 'translate(-50%, -50%) scale(1) rotate(0deg)' },
                '33%': { transform: 'translate(-70%, -70%) scale(0.8) rotate(120deg)' },
                '66%': { transform: 'translate(-30%, -30%) scale(1.1) rotate(240deg)' },
              },
              '@keyframes float-4': {
                '0%, 100%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
                '50%': { transform: 'translate(-20%, -20%) rotate(180deg)' },
              },
            }}
          />
        ))}

        {/* Líneas conectoras animadas */}
        {[...Array(8)].map((_, i) => (
          <Box
            key={`line-${i}`}
            sx={{
              position: 'absolute',
              width: '2px',
              height: `${150 + i * 30}px`,
              background: `linear-gradient(to bottom, transparent, rgba(33,150,243,${0.3 - i * 0.03}), transparent)`,
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 90}%`,
              transformOrigin: 'center',
              animation: `line-pulse-${i} ${8 + i}s ease-in-out infinite`,
              '@keyframes line-pulse-0': {
                '0%, 100%': { transform: 'rotate(0deg) scaleY(1)', opacity: 0.3 },
                '50%': { transform: 'rotate(45deg) scaleY(1.5)', opacity: 0.7 },
              },
              '@keyframes line-pulse-1': {
                '0%, 100%': { transform: 'rotate(90deg) scaleY(0.8)', opacity: 0.2 },
                '50%': { transform: 'rotate(135deg) scaleY(1.2)', opacity: 0.6 },
              },
              '@keyframes line-pulse-2': {
                '0%, 100%': { transform: 'rotate(180deg) scaleY(1)', opacity: 0.4 },
                '50%': { transform: 'rotate(225deg) scaleY(0.7)', opacity: 0.8 },
              },
              '@keyframes line-pulse-3': {
                '0%, 100%': { transform: 'rotate(270deg) scaleY(1.1)', opacity: 0.3 },
                '50%': { transform: 'rotate(315deg) scaleY(0.9)', opacity: 0.6 },
              },
              '@keyframes line-pulse-4': {
                '0%, 100%': { transform: 'rotate(45deg) scaleY(1)', opacity: 0.5 },
                '50%': { transform: 'rotate(90deg) scaleY(1.3)', opacity: 0.2 },
              },
              '@keyframes line-pulse-5': {
                '0%, 100%': { transform: 'rotate(135deg) scaleY(0.9)', opacity: 0.4 },
                '50%': { transform: 'rotate(180deg) scaleY(1.1)', opacity: 0.7 },
              },
              '@keyframes line-pulse-6': {
                '0%, 100%': { transform: 'rotate(225deg) scaleY(1.2)', opacity: 0.3 },
                '50%': { transform: 'rotate(270deg) scaleY(0.8)', opacity: 0.6 },
              },
              '@keyframes line-pulse-7': {
                '0%, 100%': { transform: 'rotate(315deg) scaleY(1)', opacity: 0.5 },
                '50%': { transform: 'rotate(360deg) scaleY(1.4)', opacity: 0.2 },
              },
            }}
          />
        ))}

        {/* Puntos pequeños animados */}
        {[...Array(15)].map((_, i) => (
          <Box
            key={`dot-${i}`}
            sx={{
              position: 'absolute',
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              borderRadius: '50%',
              background: i % 3 === 0 
                ? 'rgba(0,230,118,0.6)' 
                : i % 3 === 1 
                  ? 'rgba(33,150,243,0.6)' 
                  : 'rgba(255,152,0,0.6)',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle-${i % 3} ${3 + Math.random() * 4}s ease-in-out infinite`,
              '@keyframes twinkle-0': {
                '0%, 100%': { opacity: 0.3, transform: 'scale(1)' },
                '50%': { opacity: 1, transform: 'scale(1.5)' },
              },
              '@keyframes twinkle-1': {
                '0%, 100%': { opacity: 0.5, transform: 'scale(0.8)' },
                '50%': { opacity: 0.2, transform: 'scale(1.2)' },
              },
              '@keyframes twinkle-2': {
                '0%, 100%': { opacity: 0.4, transform: 'scale(1.1)' },
                '50%': { opacity: 0.8, transform: 'scale(0.7)' },
              },
            }}
          />
        ))}
      </Box>

      {/* Efecto de ondas desde el centro */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          border: '1px solid rgba(0,230,118,0.1)',
          borderRadius: '50%',
          animation: 'pulse-ring 6s ease-in-out infinite',
          '@keyframes pulse-ring': {
            '0%': {
              transform: 'translate(-50%, -50%) scale(0.5)',
              opacity: 0.8,
              borderColor: 'rgba(0,230,118,0.3)',
            },
            '50%': {
              transform: 'translate(-50%, -50%) scale(1)',
              opacity: 0.5,
              borderColor: 'rgba(33,150,243,0.2)',
            },
            '100%': {
              transform: 'translate(-50%, -50%) scale(1.5)',
              opacity: 0,
              borderColor: 'rgba(0,230,118,0.1)',
            },
          },
          zIndex: 0
        }}
      />

      {/* Segundo anillo de pulso */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          border: '1px solid rgba(33,150,243,0.1)',
          borderRadius: '50%',
          animation: 'pulse-ring-2 8s ease-in-out infinite',
          '@keyframes pulse-ring-2': {
            '0%': {
              transform: 'translate(-50%, -50%) scale(0.3)',
              opacity: 1,
              borderColor: 'rgba(33,150,243,0.4)',
            },
            '70%': {
              transform: 'translate(-50%, -50%) scale(1.2)',
              opacity: 0.3,
              borderColor: 'rgba(0,230,118,0.2)',
            },
            '100%': {
              transform: 'translate(-50%, -50%) scale(1.8)',
              opacity: 0,
              borderColor: 'rgba(33,150,243,0.1)',
            },
          },
          zIndex: 0
        }}
      />

      {/* Grid pattern animado */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(0,230,118,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,230,118,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite',
          '@keyframes grid-move': {
            '0%': { transform: 'translate(0, 0)' },
            '100%': { transform: 'translate(50px, 50px)' },
          },
          zIndex: 0
        }}
      />

      {/* Tarjeta de login */}
      <Card
        elevation={24}
        sx={{
          maxWidth: 400,
          width: '100%',
          backgroundColor: 'rgba(20, 20, 20, 0.95)',
          border: '1px solid #404040',
          borderRadius: 3,
          position: 'relative',
          zIndex: 1,
          backdropFilter: 'blur(20px)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,230,118,0.1)',
          animation: 'card-entrance 1.5s ease-out',
          '@keyframes card-entrance': {
            '0%': {
              opacity: 0,
              transform: 'translateY(50px) scale(0.9)',
              filter: 'blur(10px)',
            },
            '100%': {
              opacity: 1,
              transform: 'translateY(0) scale(1)',
              filter: 'blur(0px)',
            },
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(0,230,118,0.1) 0%, transparent 50%, rgba(33,150,243,0.1) 100%)',
            borderRadius: 'inherit',
            zIndex: -1,
            animation: 'border-glow 4s ease-in-out infinite',
          },
          '@keyframes border-glow': {
            '0%, 100%': { opacity: 0.3 },
            '50%': { opacity: 0.8 },
          },
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ 
            textAlign: 'center', 
            mb: 4,
            animation: 'header-fade-in 2s ease-out 0.5s both',
            '@keyframes header-fade-in': {
              '0%': {
                opacity: 0,
                transform: 'translateY(-20px)',
              },
              '100%': {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
          }}>
            <Paper
              elevation={3}
              sx={{
                display: 'inline-flex',
                p: 2,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #00e676 0%, #00c862 100%)',
                mb: 2,
                position: 'relative',
                animation: 'icon-pulse 3s ease-in-out infinite',
                '@keyframes icon-pulse': {
                  '0%, 100%': { 
                    transform: 'scale(1) rotate(0deg)',
                    boxShadow: '0 0 20px rgba(0,230,118,0.3)',
                  },
                  '50%': { 
                    transform: 'scale(1.1) rotate(5deg)',
                    boxShadow: '0 0 30px rgba(0,230,118,0.6)',
                  },
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: -2,
                  left: -2,
                  right: -2,
                  bottom: -2,
                  background: 'linear-gradient(45deg, #00e676, #2196f3, #00e676)',
                  borderRadius: '50%',
                  zIndex: -1,
                  animation: 'rotate-border 3s linear infinite',
                },
                '@keyframes rotate-border': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' },
                },
              }}
            >
              <Security sx={{ fontSize: 32, color: '#000' }} />
            </Paper>
            
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #00e676 0%, #2196f3 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
                animation: 'title-glow 2s ease-in-out infinite',
                '@keyframes title-glow': {
                  '0%, 100%': { filter: 'drop-shadow(0 0 5px rgba(0,230,118,0.3))' },
                  '50%': { filter: 'drop-shadow(0 0 15px rgba(0,230,118,0.8))' },
                },
              }}
            >
              OcluTrack Vision
            </Typography>
            
            <Typography variant="body2" sx={{ 
              color: '#b0bec5',
              animation: 'subtitle-slide 1s ease-out 1s both',
              '@keyframes subtitle-slide': {
                '0%': {
                  opacity: 0,
                  transform: 'translateX(-30px)',
                },
                '100%': {
                  opacity: 1,
                  transform: 'translateX(0)',
                },
              },
            }}>
              Sistema de Vigilancia Inteligente
            </Typography>
          </Box>

          {/* Formulario */}
          <form onSubmit={handleSubmit}>
            {/* Campo Usuario */}
            <Box sx={{
              animation: 'field-slide-in 1s ease-out 1.2s both',
              '@keyframes field-slide-in': {
                '0%': {
                  opacity: 0,
                  transform: 'translateX(-30px)',
                },
                '100%': {
                  opacity: 1,
                  transform: 'translateX(0)',
                },
              },
            }}>
              <TextField
                fullWidth
                name="username"
                label="Usuario"
                value={credentials.username}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ 
                        color: '#00e676',
                        animation: 'icon-bounce 2s ease-in-out infinite',
                        '@keyframes icon-bounce': {
                          '0%, 100%': { transform: 'translateY(0)' },
                          '50%': { transform: 'translateY(-2px)' },
                        },
                      }} />
                    </InputAdornment>
                  ),
                  sx: {
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    transition: 'all 0.3s ease',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#404040',
                      transition: 'all 0.3s ease',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(0,230,118,0.05)',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#00e676',
                        boxShadow: '0 0 10px rgba(0,230,118,0.3)',
                      }
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'rgba(0,230,118,0.08)',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#00e676',
                        borderWidth: '2px',
                        boxShadow: '0 0 15px rgba(0,230,118,0.5)',
                      }
                    }
                  }
                }}
                InputLabelProps={{
                  sx: { color: '#b0bec5' }
                }}
              />
            </Box>

            {/* Campo Contraseña */}
            <Box sx={{
              animation: 'field-slide-in 1s ease-out 1.4s both',
              '@keyframes field-slide-in': {
                '0%': {
                  opacity: 0,
                  transform: 'translateX(-30px)',
                },
                '100%': {
                  opacity: 1,
                  transform: 'translateX(0)',
                },
              },
            }}>
              <TextField
                fullWidth
                name="password"
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ 
                        color: '#00e676',
                        animation: 'icon-wiggle 3s ease-in-out infinite',
                        '@keyframes icon-wiggle': {
                          '0%, 100%': { transform: 'rotate(0deg)' },
                          '25%': { transform: 'rotate(-3deg)' },
                          '75%': { transform: 'rotate(3deg)' },
                        },
                      }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePassword}
                        edge="end"
                        disabled={loading}
                        sx={{ 
                          color: '#b0bec5',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            color: '#00e676',
                            transform: 'scale(1.1)',
                          }
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    transition: 'all 0.3s ease',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#404040',
                      transition: 'all 0.3s ease',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(0,230,118,0.05)',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#00e676',
                        boxShadow: '0 0 10px rgba(0,230,118,0.3)',
                      }
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'rgba(0,230,118,0.08)',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#00e676',
                        borderWidth: '2px',
                        boxShadow: '0 0 15px rgba(0,230,118,0.5)',
                      }
                    }
                  }
                }}
                InputLabelProps={{
                  sx: { color: '#b0bec5' }
                }}
              />
            </Box>

            {/* Mensaje de error */}
            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mt: 2,
                  backgroundColor: 'rgba(244, 67, 54, 0.1)',
                  border: '1px solid rgba(244, 67, 54, 0.3)',
                  animation: 'error-shake 0.6s ease-in-out',
                  '@keyframes error-shake': {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '25%': { transform: 'translateX(-5px)' },
                    '75%': { transform: 'translateX(5px)' },
                  },
                }}
              >
                {error}
              </Alert>
            )}

            {/* Botón de login */}
            <Box sx={{
              animation: 'button-fade-in 1s ease-out 1.6s both',
              '@keyframes button-fade-in': {
                '0%': {
                  opacity: 0,
                  transform: 'translateY(20px)',
                },
                '100%': {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  mt: 3,
                  py: 1.5,
                  background: 'linear-gradient(135deg, #00e676 0%, #00d169 100%)',
                  color: '#000',
                  fontWeight: 'bold',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s ease',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    transition: 'left 0.6s ease',
                  },
                  '&:hover': {
                    background: 'linear-gradient(135deg, #00d169 0%, #00c862 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 30px rgba(0,230,118,0.4), 0 0 0 1px rgba(0,230,118,0.3)',
                    '&::before': {
                      left: '100%',
                    }
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                    boxShadow: '0 8px 20px rgba(0,230,118,0.3)',
                  },
                  '&:disabled': {
                    background: '#424242',
                    color: '#757575',
                    transform: 'none',
                    boxShadow: 'none',
                  },
                  animation: loading ? 'button-pulse 1.5s ease-in-out infinite' : 'none',
                  '@keyframes button-pulse': {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.7 },
                  },
                }}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <VideoCall />}
              >
                {loading ? 'Verificando...' : 'Acceder al Dashboard'}
              </Button>
            </Box>
          </form>

          {/* Info adicional */}
          <Box sx={{ 
            mt: 3, 
            textAlign: 'center',
            animation: 'info-fade-in 1s ease-out 1.8s both',
            '@keyframes info-fade-in': {
              '0%': {
                opacity: 0,
                transform: 'translateY(15px)',
              },
              '100%': {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
          }}>
            <Typography variant="caption" sx={{ 
              color: '#757575', 
              display: 'block',
              animation: 'text-glow 3s ease-in-out infinite',
              '@keyframes text-glow': {
                '0%, 100%': { textShadow: '0 0 5px rgba(117,117,117,0.3)' },
                '50%': { textShadow: '0 0 15px rgba(0,230,118,0.5)' },
              },
            }}>
              Credenciales de prueba:
            </Typography>
            <Typography variant="caption" sx={{ 
              color: '#b0bec5', 
              display: 'block',
              transition: 'color 0.3s ease',
              '&:hover': { color: '#00e676' },
            }}>
              admin / 123456 (Administrador)
            </Typography>
            <Typography variant="caption" sx={{ 
              color: '#b0bec5',
              transition: 'color 0.3s ease',
              '&:hover': { color: '#2196f3' },
            }}>
              operador / 123456 (Operador)
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;