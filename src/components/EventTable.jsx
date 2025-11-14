import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  Typography,
  Chip,
  IconButton,
  Box,
  Tooltip
} from '@mui/material';
import {
  Visibility,
  Download,
  Delete,
  Edit
} from '@mui/icons-material';

const EventTable = ({ alerts = [], loading = false }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('timestamp');
  const [order, setOrder] = useState('desc');

  // Mapeo de tipos de alerta a colores
  const getAlertColor = (tipo) => {
    const colors = {
      'oclusión': '#ff5722',
      'persona_detectada': '#2196f3',
      'movimiento': '#ff9800',
      'objeto_sospechoso': '#9c27b0'
    };
    return colors[tipo] || '#757575';
  };

  // Función para formatear fecha
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString('es-ES'),
      time: date.toLocaleTimeString('es-ES', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };
  };

  // Manejar cambio de página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Manejar ordenamiento
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Ordenar datos
  const sortedAlerts = React.useMemo(() => {
    return [...alerts].sort((a, b) => {
      if (orderBy === 'timestamp') {
        const aTime = new Date(a.timestamp).getTime();
        const bTime = new Date(b.timestamp).getTime();
        return order === 'desc' ? bTime - aTime : aTime - bTime;
      }
      
      const aValue = a[orderBy]?.toString().toLowerCase() || '';
      const bValue = b[orderBy]?.toString().toLowerCase() || '';
      
      if (order === 'desc') {
        return bValue.localeCompare(aValue);
      }
      return aValue.localeCompare(bValue);
    });
  }, [alerts, order, orderBy]);

  // Paginar datos
  const paginatedAlerts = sortedAlerts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (loading) {
    return (
      <Card sx={{ backgroundColor: '#1e1e1e', border: '1px solid #404040' }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: '#00e676', textAlign: 'center' }}>
            Cargando historial de eventos...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      sx={{ 
        backgroundColor: '#1e1e1e',
        border: '1px solid #404040',
        borderRadius: 2
      }}
    >
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" sx={{ color: '#00e676', fontWeight: 'bold' }}>
              📊 Historial de Eventos
            </Typography>
            <Chip 
              label={`${alerts.length} eventos`}
              size="small"
              sx={{ 
                backgroundColor: '#2196f3',
                color: 'white',
                fontWeight: 'bold'
              }}
            />
          </Box>
        }
        sx={{ 
          backgroundColor: '#2a2a2a',
          borderBottom: '1px solid #404040'
        }}
      />
      
      <CardContent sx={{ p: 0 }}>
        <TableContainer component={Paper} sx={{ backgroundColor: 'transparent' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#2a2a2a' }}>
                <TableCell sx={{ color: '#00e676', fontWeight: 'bold', borderBottom: '1px solid #404040' }}>
                  <TableSortLabel
                    active={orderBy === 'id'}
                    direction={orderBy === 'id' ? order : 'asc'}
                    onClick={() => handleRequestSort('id')}
                    sx={{ color: '#00e676', '&.Mui-active': { color: '#00e676' } }}
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ color: '#00e676', fontWeight: 'bold', borderBottom: '1px solid #404040' }}>
                  <TableSortLabel
                    active={orderBy === 'tipo'}
                    direction={orderBy === 'tipo' ? order : 'asc'}
                    onClick={() => handleRequestSort('tipo')}
                    sx={{ color: '#00e676', '&.Mui-active': { color: '#00e676' } }}
                  >
                    Tipo de Alerta
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ color: '#00e676', fontWeight: 'bold', borderBottom: '1px solid #404040' }}>
                  <TableSortLabel
                    active={orderBy === 'timestamp'}
                    direction={orderBy === 'timestamp' ? order : 'asc'}
                    onClick={() => handleRequestSort('timestamp')}
                    sx={{ color: '#00e676', '&.Mui-active': { color: '#00e676' } }}
                  >
                    Fecha y Hora
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ color: '#00e676', fontWeight: 'bold', borderBottom: '1px solid #404040', textAlign: 'center' }}>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedAlerts.map((alert) => {
                const dateInfo = formatDate(alert.timestamp);
                return (
                  <TableRow 
                    key={alert.id}
                    sx={{ 
                      '&:hover': { backgroundColor: '#2a2a2a' },
                      borderBottom: '1px solid #404040'
                    }}
                  >
                    <TableCell sx={{ color: 'white', borderBottom: '1px solid #404040' }}>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 'bold', fontSize: '1rem' }}>
                        #{alert.id}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #404040' }}>
                      <Chip
                        label={alert.tipo.replace('_', ' ').toUpperCase()}
                        size="medium"
                        sx={{
                          backgroundColor: getAlertColor(alert.tipo),
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '0.8rem'
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ color: 'white', borderBottom: '1px solid #404040' }}>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          📅 {dateInfo.date}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#b0bec5' }}>
                          🕐 {dateInfo.time}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #404040' }}>
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <Tooltip title="Ver detalles">
                          <IconButton size="medium" sx={{ color: '#2196f3' }}>
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar evento">
                          <IconButton size="medium" sx={{ color: '#ff9800' }}>
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Descargar reporte">
                          <IconButton size="medium" sx={{ color: '#4caf50' }}>
                            <Download />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                          <IconButton size="medium" sx={{ color: '#f44336' }}>
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={alerts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            color: '#b0bec5',
            backgroundColor: '#2a2a2a',
            borderTop: '1px solid #404040',
            '& .MuiTablePagination-toolbar': {
              color: '#b0bec5'
            },
            '& .MuiTablePagination-selectIcon': {
              color: '#b0bec5'
            }
          }}
          labelRowsPerPage="Filas por página:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`
          }
        />
      </CardContent>
    </Card>
  );
};

export default EventTable;