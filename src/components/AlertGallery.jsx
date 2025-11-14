import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Skeleton
} from '@mui/material';
import {
  Close,
  Warning,
  Schedule,
  LocationOn,
  ZoomIn
} from '@mui/icons-material';

/**
 * Componente de galería de alertas
 * Muestra miniaturas de imágenes de alertas/capturas usando Grid y CardMedia
 */
const AlertGallery = ({ captures = [], loading = false }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleImageClick = (capture) => {
    setSelectedImage(capture);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedImage(null);
  };

  const getAlertTypeColor = (type) => {
    const colors = {
      'oclusión': '#ff5722',
      'movimiento': '#ff9800', 
      'persona_detectada': '#2196f3',
      'objeto_sospechoso': '#f44336',
      'default': '#757575'
    };
    return colors[type?.toLowerCase()] || colors.default;
  };

  const formatDateTime = (timestamp) => {
    return new Date(timestamp).toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const GallerySkeleton = () => (
    <Grid container spacing={2}>
      {[...Array(8)].map((_, index) => (
        <Grid item xs={6} sm={4} md={3} key={index}>
          <Card sx={{ backgroundColor: '#2a2a2a' }}>
            <Skeleton 
              variant="rectangular" 
              height={160}
              sx={{ backgroundColor: '#404040' }}
            />
            <CardContent>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  if (loading) {
    return (
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'white', 
            mb: 2,
            fontWeight: 'bold'
          }}
        >
          Galería de Alertas Recientes
        </Typography>
        <GallerySkeleton />
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography 
        variant="h6" 
        sx={{ 
          color: 'white', 
          mb: 2,
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <Warning sx={{ color: '#ff9800' }} />
        Galería de Alertas Recientes
        <Chip 
          label={`${captures.length} capturas`}
          size="small"
          sx={{ 
            backgroundColor: '#424242',
            color: 'white',
            ml: 1
          }}
        />
      </Typography>

      {captures.length === 0 ? (
        <Box 
          sx={{ 
            textAlign: 'center',
            py: 6,
            backgroundColor: '#2a2a2a',
            borderRadius: 2,
            border: '2px dashed #555'
          }}
        >
          <Warning sx={{ fontSize: 48, color: '#757575', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#757575', mb: 1 }}>
            No hay capturas disponibles
          </Typography>
          <Typography variant="body2" sx={{ color: '#999' }}>
            Las nuevas alertas aparecerán aquí automáticamente
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {captures.map((capture, index) => (
            <Grid item xs={6} sm={4} md={3} key={capture.id || index}>
              <Card 
                sx={{ 
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #404040',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
                    borderColor: '#666',
                    '& .zoom-overlay': {
                      opacity: 1
                    }
                  }
                }}
                onClick={() => handleImageClick(capture)}
              >
                {/* Overlay de zoom */}
                <Box
                  className="zoom-overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    zIndex: 1,
                    borderRadius: '4px'
                  }}
                >
                  <ZoomIn sx={{ color: 'white', fontSize: 32 }} />
                </Box>

                <CardMedia
                  component="img"
                  height="160"
                  image={capture.src || capture.imageURL || '/api/placeholder/300/200'}
                  alt={`Alerta ${capture.id || index + 1}`}
                  sx={{ 
                    objectFit: 'cover',
                    backgroundColor: '#404040'
                  }}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNDA0MDQwIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmaWxsPSIjNzU3NTc1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pgo8L3N2Zz4K';
                  }}
                />
                
                <CardContent sx={{ p: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Chip
                      label={capture.tipo || capture.type || 'Alerta'}
                      size="small"
                      sx={{
                        backgroundColor: getAlertTypeColor(capture.tipo || capture.type),
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.7rem',
                        height: '20px'
                      }}
                    />
                  </Box>
                  
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: '#b0bec5',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      mb: 0.5
                    }}
                  >
                    <Schedule sx={{ fontSize: 12 }} />
                    {capture.timestamp ? formatDateTime(capture.timestamp) : 'Tiempo no disponible'}
                  </Typography>
                  
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: '#999',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <LocationOn sx={{ fontSize: 12 }} />
                    {capture.zona || capture.zone || 'Zona desconocida'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Modal para imagen ampliada */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#1a1a1a',
            color: 'white'
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: '1px solid #404040'
        }}>
          <Typography variant="h6">
            Detalles de Alerta - ID: {selectedImage?.id || 'N/A'}
          </Typography>
          <IconButton onClick={handleCloseDialog} sx={{ color: 'white' }}>
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ p: 0 }}>
          {selectedImage && (
            <Box>
              <CardMedia
                component="img"
                image={selectedImage.src || selectedImage.imageURL || '/api/placeholder/600/400'}
                alt={`Alerta ${selectedImage.id}`}
                sx={{ 
                  width: '100%',
                  maxHeight: '70vh',
                  objectFit: 'contain',
                  backgroundColor: '#000'
                }}
              />
              
              <Box sx={{ p: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" sx={{ color: '#b0bec5', mb: 0.5 }}>
                      Tipo de Alerta
                    </Typography>
                    <Chip
                      label={selectedImage.tipo || selectedImage.type || 'Alerta'}
                      sx={{
                        backgroundColor: getAlertTypeColor(selectedImage.tipo || selectedImage.type),
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" sx={{ color: '#b0bec5', mb: 0.5 }}>
                      Zona
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'white' }}>
                      {selectedImage.zona || selectedImage.zone || 'Zona desconocida'}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ color: '#b0bec5', mb: 0.5 }}>
                      Fecha y Hora
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'white' }}>
                      {selectedImage.timestamp ? formatDateTime(selectedImage.timestamp) : 'Tiempo no disponible'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AlertGallery;