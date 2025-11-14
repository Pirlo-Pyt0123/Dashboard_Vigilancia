import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Skeleton
} from '@mui/material';
import {
  People,
  Warning,
  CameraAlt,
  TrendingUp
} from '@mui/icons-material';

/**
 * Componente que muestra las tarjetas de estadísticas principales
 * Muestra personas detectadas, alertas activas y capturas generadas
 */
const StatsCards = ({ summary, loading = false }) => {
  // Configuración de las cards de estadísticas
  const statsConfig = [
    {
      title: 'Personas Detectadas',
      value: summary?.personsDetected || 0,
      icon: People,
      color: '#2196f3',
      bgColor: 'rgba(33, 150, 243, 0.1)',
      trend: '+12%',
      description: 'Últimas 24 horas'
    },
    {
      title: 'Alertas Activas',
      value: summary?.activeAlerts || 0,
      icon: Warning,
      color: '#ff5722',
      bgColor: 'rgba(255, 87, 34, 0.1)',
      trend: '-3%',
      description: 'Críticas y medias'
    },
    {
      title: 'Capturas Generadas',
      value: summary?.capturesGenerated || 0,
      icon: CameraAlt,
      color: '#4caf50',
      bgColor: 'rgba(76, 175, 80, 0.1)',
      trend: '+8%',
      description: 'Total del día'
    }
  ];

  const StatsCardSkeleton = () => (
    <Card 
      sx={{ 
        backgroundColor: '#2a2a2a',
        border: '1px solid #404040',
        height: '140px'
      }}
    >
      <CardContent>
        <Skeleton variant="circular" width={48} height={48} />
        <Skeleton variant="text" width="60%" height={32} sx={{ mt: 1 }} />
        <Skeleton variant="text" width="40%" height={20} />
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[1, 2, 3].map((index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StatsCardSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {statsConfig.map((stat, index) => {
        const IconComponent = stat.icon;
        
        return (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              sx={{ 
                backgroundColor: '#2a2a2a',
                border: '1px solid #404040',
                borderLeft: `4px solid ${stat.color}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 25px rgba(0,0,0,0.3)`,
                  borderColor: stat.color
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    sx={{ 
                      backgroundColor: stat.bgColor,
                      color: stat.color,
                      mr: 2,
                      width: 48,
                      height: 48
                    }}
                  >
                    <IconComponent />
                  </Avatar>
                  
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: 'white',
                        fontWeight: 'bold',
                        lineHeight: 1
                      }}
                    >
                      {stat.value.toLocaleString()}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <TrendingUp 
                        sx={{ 
                          fontSize: 16, 
                          color: stat.trend.includes('+') ? '#4caf50' : '#ff5722',
                          mr: 0.5
                        }} 
                      />
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: stat.trend.includes('+') ? '#4caf50' : '#ff5722',
                          fontWeight: 'bold'
                        }}
                      >
                        {stat.trend}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    color: '#b0bec5',
                    fontWeight: 'medium',
                    mb: 0.5
                  }}
                >
                  {stat.title}
                </Typography>
                
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: '#757575',
                    fontSize: '0.75rem'
                  }}
                >
                  {stat.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default StatsCards;