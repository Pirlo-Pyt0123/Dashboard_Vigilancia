import axios from 'axios';

// Configuración base para conectar a tu Flask backend
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Servicio para obtener resumen de estadísticas (KPIs)
 * GET /api/summary
 */
export const getSummary = async () => {
  try {
    const response = await api.get('/summary');
    return response.data;
  } catch (error) {
    console.warn('⚠️ Error al obtener summary:', error.message);
    return {
      personsDetected: 0,
      activeAlerts: 0,
      capturesGenerated: 0
    };
  }
};

/**
 * Servicio para obtener lista de alertas
 * GET /api/alerts
 */
export const getAlerts = async () => {
  try {
    const response = await api.get('/alerts');
    // Mapear al formato esperado si es necesario
    return response.data.map((alert, index) => ({
      id: alert.id || String(index + 1).padStart(3, '0'),
      tipo: alert.type || 'oclusion-reaparecido',
      timestamp: alert.timestamp,
      imageURL: alert.image_path ? `http://localhost:8000${alert.image_path}` : null
    }));
  } catch (error) {
    console.warn('⚠️ Error al obtener alertas:', error.message);
    return [];
  }
};

/**
 * Servicio para obtener galería de capturas
 * GET /api/captures
 */
export const getCaptures = async () => {
  try {
    const response = await api.get('/captures');
    // Ajustar formato para galería si es necesario
    return response.data.map((capture) => ({
      id: capture.id,
      src: capture.src.startsWith('http')
        ? capture.src
        : `http://localhost:8000${capture.src}`,
      timestamp: capture.timestamp,
      tipo: capture.tipo
    }));
  } catch (error) {
    console.warn('⚠️ Error al obtener capturas:', error.message);
    return [];
  }
};

/**
 * URL para el stream de video PROCESADO por IA (para usar en <img src=... />)
 */
export const VIDEO_FEED_URL = 'http://localhost:8000/api/video_feed';

/**
 * URL para el snapshot actual de la cámara procesada por IA
 */
export const SNAPSHOT_URL = 'http://localhost:8000/api/snapshot';

// Exportar instancia axios por si se necesita uso avanzado
export default api;
