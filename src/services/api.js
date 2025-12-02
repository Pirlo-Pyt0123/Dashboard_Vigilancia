import axios from 'axios';

// Configuración base para conectar a tu Flask backend
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar token de autenticación automáticamente
// TEMPORALMENTE DESHABILITADO para debugging - ¡YA FUNCIONA SIN ESTO!
/*
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('oclutrack_user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        // Agregar token si existe
        if (userData.token) {
          config.headers.Authorization = `Bearer ${userData.token}`;
        }
      } catch (error) {
        console.warn('Error al cargar token:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
*/

// Interceptor para manejar errores de autenticación
// TEMPORALMENTE DESHABILITADO para debugging
/*
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('oclutrack_user');
      window.location.reload(); // Redirigir al login
    }
    return Promise.reject(error);
  }
);
*/

/**
 * Servicios de autenticación
 */
export const authAPI = {
  /**
   * Iniciar sesión
   * POST /api/auth/login
   */
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error de autenticación');
    }
  },

  /**
   * Cerrar sesión
   * POST /api/auth/logout
   */
  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error) {
      console.warn('Error al cerrar sesión:', error);
    }
  },

  /**
   * Verificar token
   * GET /api/auth/verify
   */
  verifyToken: async () => {
    try {
      const response = await api.get('/auth/verify');
      return response.data;
    } catch (error) {
      throw new Error('Token inválido');
    }
  }
};

/**
 * Servicio para obtener resumen de estadísticas (KPIs)
 * GET /api/summary
 */
export const getSummary = async () => {
  try {
    console.log('📊 Intentando obtener summary desde:', `${api.defaults.baseURL}/summary`);
    const response = await api.get('/summary');
    console.log('📊 Respuesta de summary desde Flask:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al conectar con tu Flask backend:', {
      message: error.message,
      status: error.response?.status,
      url: error.config?.url
    });
    
    console.log('⚠️ Asegúrate de que tu Flask esté corriendo en el puerto 8000');
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
    console.log('🚨 Intentando obtener alertas desde:', `${api.defaults.baseURL}/alerts`);
    const response = await api.get('/alerts');
    console.log('🚨 Respuesta de alertas desde Flask:', response.data);
    
    // Mapear según la estructura de tu CSV/Flask backend
    const formattedAlerts = response.data.map((alert, index) => ({
      id: alert.id || String(index + 1).padStart(3, '0'),
      tipo: alert.type || 'objeto-detectado',
      timestamp: alert.timestamp || new Date().toISOString(),
      imageURL: alert.image_path ? `http://localhost:8000${alert.image_path}` : null,
      zona: 'Cámara Principal'
    }));
    
    console.log('🚨 Alertas formateadas desde tu Flask:', formattedAlerts);
    return formattedAlerts;
  } catch (error) {
    console.error('❌ Error al conectar con tu Flask backend:', {
      message: error.message,
      status: error.response?.status,
      url: error.config?.url
    });
    
    console.log('⚠️ Asegúrate de que tu Flask esté corriendo en el puerto 8000');
    return [];
  }
};

/**
 * Servicio para obtener galería de capturas
 * GET /api/captures
 */
export const getCaptures = async () => {
  try {
    console.log('📸 Intentando obtener capturas desde:', `${api.defaults.baseURL}/captures`);
    const response = await api.get('/captures');
    console.log('📸 Respuesta de capturas desde Flask:', response.data);
    
    // Formatear según la estructura de tu Flask backend
    const formattedCaptures = response.data.map((capture) => ({
      id: capture.id || 'unknown',
      src: capture.src.startsWith('http') 
        ? capture.src 
        : `http://localhost:8000${capture.src}`,
      timestamp: capture.timestamp || new Date().toISOString(),
      tipo: capture.tipo || 'desconocido',
      zona: 'Cámara Principal' // Agregar zona por defecto
    }));
    
    console.log('📸 Capturas formateadas desde tu Flask:', formattedCaptures);
    return formattedCaptures;
  } catch (error) {
    console.error('❌ Error al conectar con tu Flask backend:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url
    });
    
    console.log('⚠️ Asegúrate de que tu Flask esté corriendo en el puerto 8000');
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
