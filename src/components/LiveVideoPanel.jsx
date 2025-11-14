import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Box,
  Typography,
  IconButton,
  Chip
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  Stop,
  Fullscreen,
  VolumeUp,
  VolumeOff,
  Settings
} from '@mui/icons-material';

const LiveVideoPanel = ({ loading = false }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleDetection = () => {
    setDetectionEnabled(!detectionEnabled);
    // Cambiar entre stream con y sin detección
    const newUrl = detectionEnabled 
      ? 'http://localhost:8000/api/video_feed'
      : 'http://localhost:8000/api/video_feed';
    setStreamUrl(newUrl);
    console.log(`🔄 Cambiando a: ${detectionEnabled ? 'Video normal' : 'Video con detección'}`);
  };

  // Simulación de datos en tiempo real
  const [liveData, setLiveData] = useState({
    timestamp: new Date(),
    fps: 25,
    resolution: '1920x1080',
    bitrate: '4.2 Mbps'
  });

  // Stream en vivo desde Flask backend con detecciones
  const [streamUrl, setStreamUrl] = useState('http://localhost:8000/api/video_feed');
  const [detectionEnabled, setDetectionEnabled] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData({
        timestamp: new Date(),
        fps: 24 + Math.floor(Math.random() * 3),
        resolution: '1920x1080',
        bitrate: (3.8 + Math.random() * 0.8).toFixed(1) + ' Mbps'
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card 
      sx={{ 
        backgroundColor: '#1e1e1e',
        border: '1px solid #404040',
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Box 
              sx={{ 
                width: 12, 
                height: 12, 
                borderRadius: '50%', 
                backgroundColor: '#4caf50',
                animation: 'pulse 2s infinite'
              }} 
            />
            <Typography variant="h6" sx={{ color: '#00e676', fontWeight: 'bold' }}>
              📹 Cámara en Vivo - Vista Principal
            </Typography>
            <Chip 
              label="EN VIVO" 
              size="small" 
              sx={{ 
                backgroundColor: '#d32f2f', 
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.7rem'
              }} 
            />
          </Box>
        }
        sx={{ 
          backgroundColor: '#2a2a2a',
          borderBottom: '1px solid #404040',
          textAlign: 'center'
        }}
      />
      
      <CardContent sx={{ p: 3 }}>
        {/* Video principal centrado */}
        <Box sx={{ 
          position: 'relative', 
          maxWidth: '600px',
          margin: '0 auto',
          paddingTop: '33.75%', 
          backgroundColor: '#000',
          borderRadius: 2,
          overflow: 'hidden'
        }}>
          {/* Video en vivo real */}
          {isPlaying ? (
            <img
              src={streamUrl}
              alt="Video en vivo OcluTrack"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '8px'
              }}
              onError={(e) => {
                console.warn('Error cargando stream, usando placeholder');
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
              onLoad={() => {
                console.log('✅ Stream de video conectado');
              }}
            />
          ) : null}
          
          {/* Placeholder de fallback */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(45deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)',
              display: isPlaying ? 'none' : 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            <Box 
              sx={{ 
                width: 80, 
                height: 80, 
                borderRadius: '50%', 
                backgroundColor: 'rgba(0, 230, 118, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
                animation: isPlaying ? 'pulse 2s infinite' : 'none'
              }}
            >
              <Typography variant="h1" sx={{ color: '#00e676', fontSize: '2.5rem' }}>📹</Typography>
            </Box>
            <Typography variant="h6" sx={{ color: '#00e676', textAlign: 'center', mb: 1, fontWeight: 'bold' }}>
              Entrada Principal
            </Typography>
            <Typography variant="body1" sx={{ color: '#b0bec5', textAlign: 'center' }}>
              {liveData.timestamp.toLocaleTimeString()}
            </Typography>
          </Box>

          {/* Overlay de estado */}
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              display: 'flex',
              gap: 1,
              flexDirection: 'column'
            }}
          >
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip 
                label="HD" 
                size="small" 
                sx={{ backgroundColor: '#4caf50', color: 'white' }}
              />
              <Chip 
                label={`${liveData.fps} FPS`} 
                size="small" 
                sx={{ backgroundColor: '#2196f3', color: 'white' }}
              />
            </Box>
            <Chip 
              label={detectionEnabled ? 'DETECCIÓN ON' : 'DETECCIÓN OFF'} 
              size="small" 
              sx={{ 
                backgroundColor: detectionEnabled ? '#00e676' : '#ff5722', 
                color: detectionEnabled ? 'black' : 'white',
                fontWeight: 'bold'
              }}
            />
          </Box>

          {/* Controles de video */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              padding: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2
            }}
          >
            <IconButton 
              onClick={handlePlayPause}
              sx={{ color: 'white', fontSize: '1.5rem' }}
            >
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton sx={{ color: 'white', fontSize: '1.5rem' }}>
              <Stop />
            </IconButton>
            <IconButton 
              onClick={handleMute}
              sx={{ color: 'white', fontSize: '1.5rem' }}
            >
              {isMuted ? <VolumeOff /> : <VolumeUp />}
            </IconButton>
            <IconButton 
              onClick={toggleDetection}
              sx={{ 
                color: detectionEnabled ? '#00e676' : 'white', 
                fontSize: '1.5rem',
                backgroundColor: detectionEnabled ? 'rgba(0, 230, 118, 0.2)' : 'transparent'
              }}
              title={detectionEnabled ? 'Desactivar detección' : 'Activar detección'}
            >
              <Settings />
            </IconButton>
            <IconButton sx={{ color: 'white', fontSize: '1.5rem' }}>
              <Fullscreen />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LiveVideoPanel;