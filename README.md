# OcluTrack Vision Dashboard

Dashboard web moderno para el sistema de videovigilancia inteligente **OcluTrackVision**. Este dashboard React se conecta a tu sistema OcluTrackVision existente para mostrar detecciones, estadísticas y video en tiempo real.

## 🚀 Características

- **Dashboard Web Moderno**: Interfaz React con Material-UI y tema oscuro
- **Integración OcluTrackVision**: Se conecta a tu sistema Python existente
- **Video en Vivo**: Stream de cámara con activación/desactivación de detecciones
- **Monitoreo en Tiempo Real**: Alertas y estadísticas actualizadas automáticamente
- **Responsive**: Diseño adaptable a diferentes dispositivos

## 📦 Estructura del Proyecto

```
OcluTrack-Vision-Dashboard/          # Dashboard React (frontend)
├── src/
│   ├── components/
│   │   ├── LiveVideoPanel.jsx      # Panel de video en vivo
│   │   ├── StatsCards.jsx          # Tarjetas de estadísticas
│   │   ├── AlertGallery.jsx        # Galería de alertas
│   │   └── EventTable.jsx          # Tabla de eventos
│   ├── services/
│   │   └── api.js                  # Conexión a OcluTrackVision
│   └── App.jsx
└── README.md

OcluTrackVision/                     # Tu sistema existente (separado)
├── main.py                         # Arranque principal del sistema
├── detection.py                    # Detección y lógica de poses/personas
├── alerting.py                     # Módulo de alertas
├── config.py                       # Configuración general
├── utils.py                        # Funciones auxiliares
├── captures/                       # Capturas guardadas
└── logs/                          # Logs del sistema
```

## 🛠️ Configuración

### 1. Dashboard React (Frontend)

```bash
cd "C:\Users\elmer\Documents\OcluTrack-Vision-Dashboard"
npm install
```

### 2. Sistema OcluTrackVision (Backend)

**Asegúrate de que tu sistema OcluTrackVision esté ejecutándose** en el puerto estándar. El dashboard espera estos endpoints:

#### Endpoints Requeridos en OcluTrackVision:

**API de Datos:**
- `GET /api/stats` - Estadísticas del sistema
- `GET /api/detections` - Lista de detecciones/alertas  
- `GET /api/captures` - Galería de capturas

**Video Streaming:**
- `GET /video_feed` - Stream de video normal
- `GET /video_feed_with_detection` - Stream con detecciones visuales

### 3. Configuración de Puertos

El dashboard está configurado para conectarse al puerto **5000** por defecto. Si tu OcluTrackVision usa un puerto diferente, actualiza:

**En `src/services/api.js`:**
```javascript
const api = axios.create({
  baseURL: 'http://localhost:XXXX', // Cambiar XXXX por tu puerto
  // ...
});
```

**En `src/components/LiveVideoPanel.jsx`:**
```javascript
const [streamUrl, setStreamUrl] = useState('http://localhost:XXXX/video_feed_with_detection');
```

## 🚀 Ejecución

### 1. Iniciar Sistema OcluTrackVision (Terminal 1)

```bash
cd "ruta/a/tu/OcluTrackVision"
python main.py
```

### 2. Iniciar Dashboard React (Terminal 2)

```bash
cd "C:\Users\elmer\Documents\OcluTrack-Vision-Dashboard"
npm run dev
```

El dashboard estará disponible en **http://localhost:3000**

## 🎯 Uso del Dashboard

### Funciones Principales

1. **Monitoreo de Video**:
   - Ver stream en vivo desde tu cámara
   - Activar/desactivar overlay de detecciones con el botón ⚙️
   - Botón verde = detección activa

2. **Estadísticas en Tiempo Real**:
   - Personas detectadas hoy
   - Alertas activas
   - Capturas generadas

3. **Historial de Eventos**:
   - Tabla con últimas detecciones
   - Timestamps y tipos de evento
   - Estado de cada alerta

4. **Galería de Capturas**:
   - Imágenes guardadas por el sistema
   - Vista previa de detecciones
   - Información de contexto

## 🔧 Personalización

### Cambiar Intervalo de Actualización

En `src/App.jsx`, línea ~65:
```javascript
useEffect(() => {
  const interval = setInterval(loadData, 15000); // 15 segundos
  // Cambiar 15000 por el valor deseado en milisegundos
}, []);
```

### Modificar Tema Visual

El dashboard usa Material-UI con tema oscuro. Para personalizar colores, edita `src/App.jsx`:

```javascript
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#00e676' },    // Verde principal
    secondary: { main: '#ff5722' },  // Naranja secundario
    // ... personalizar más colores
  }
});
```

## 📡 Formato de Datos Esperado

Tu sistema OcluTrackVision debe retornar datos en estos formatos:

### `/api/stats`
```json
{
  "personsDetected": 127,
  "activeAlerts": 8, 
  "capturesGenerated": 342
}
```

### `/api/detections`
```json
[
  {
    "id": "001",
    "tipo": "persona_detectada",
    "zona": "Entrada Principal", 
    "timestamp": "2024-01-15T10:30:00Z",
    "estado": "activa",
    "confidence": 0.95
  }
]
```

### `/api/captures`
```json
[
  {
    "id": "1",
    "src": "/captures/imagen001.jpg",
    "tipo": "deteccion",
    "zona": "Cámara Principal",
    "timestamp": "2024-01-15T10:30:00Z"
  }
]
```

## 🐛 Solución de Problemas

### Dashboard No Se Conecta

1. **Verificar que OcluTrackVision esté ejecutándose**
```bash
curl http://localhost:5000/api/stats
```

2. **Revisar puerto en configuración**
   - Comprobar puerto de OcluTrackVision
   - Actualizar `api.js` y `LiveVideoPanel.jsx`

3. **Verificar CORS en OcluTrackVision**
   - Asegurar que permite conexiones desde localhost:3000

### Video No Se Muestra

1. **Verificar endpoints de video**:
   - `http://localhost:5000/video_feed`
   - `http://localhost:5000/video_feed_with_detection`

2. **Comprobar formato de stream**:
   - Debe ser multipart MJPEG
   - Verificar headers HTTP correctos

### Datos No Se Actualizan

1. **Revisar consola del navegador** (F12)
2. **Verificar formato de respuesta de APIs**
3. **Comprobar endpoints en OcluTrackVision**

## 📞 Integración con OcluTrackVision

Para que tu sistema OcluTrackVision sea compatible con este dashboard, asegúrate de implementar:

1. **Servidor web** (Flask recomendado) con los endpoints mencionados
2. **CORS habilitado** para localhost:3000  
3. **Video streaming** en formato MJPEG
4. **APIs REST** que retornen JSON en el formato especificado

### Ejemplo de integración en tu main.py:

```python
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permitir conexiones desde el dashboard React

@app.route('/api/stats')
def get_stats():
    return jsonify({
        'personsDetected': get_daily_detections(),
        'activeAlerts': get_active_alerts(),
        'capturesGenerated': get_total_captures()
    })

@app.route('/api/detections')
def get_detections():
    # Leer tus logs/ CSV y retornar como JSON
    return jsonify(load_recent_detections())

@app.route('/api/captures')
def get_captures():
    # Listar archivos en captures/ y retornar metadatos
    return jsonify(load_capture_gallery())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

---

**Dashboard para OcluTrack Vision**  
Desarrollado con React + Material-UI para integración con sistemas de videovigilancia inteligente.

💡 **Tip**: Este dashboard es completamente independiente de tu sistema OcluTrackVision. Solo necesita que implementes los endpoints web mencionados para funcionar correctamente.