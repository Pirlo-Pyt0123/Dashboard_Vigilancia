import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Contexto de autenticación para el dashboard
 */
const AuthContext = createContext();

/**
 * Hook personalizado para usar el contexto de autenticación
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

/**
 * Proveedor de autenticación
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar sesión guardada al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('oclutrack_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error al cargar usuario guardado:', error);
        localStorage.removeItem('oclutrack_user');
      }
    }
    setLoading(false);
  }, []);

  /**
   * Función para iniciar sesión
   */
  const login = async (credentials) => {
    try {
      // Aquí irá la llamada real a tu API de autenticación
      // const response = await api.post('/auth/login', credentials);
      // const userData = response.data;
      
      // Simulación temporal con usuarios predefinidos
      const userData = {
        id: credentials.username === 'admin' ? 1 : 2,
        username: credentials.username,
        role: credentials.username === 'admin' ? 'administrator' : 'operator',
        name: credentials.username === 'admin' ? 'Administrador' : 'Operador',
        loginTime: new Date().toISOString(),
        permissions: credentials.username === 'admin' 
          ? ['read', 'write', 'delete', 'admin'] 
          : ['read']
      };

      // Guardar en localStorage
      localStorage.setItem('oclutrack_user', JSON.stringify(userData));
      
      // Actualizar estado
      setUser(userData);
      
      return { success: true, user: userData };
    } catch (error) {
      console.error('Error en login:', error);
      return { 
        success: false, 
        error: 'Credenciales incorrectas o error de servidor' 
      };
    }
  };

  /**
   * Función para cerrar sesión
   */
  const logout = () => {
    localStorage.removeItem('oclutrack_user');
    setUser(null);
  };

  /**
   * Verificar si el usuario tiene un permiso específico
   */
  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission) || false;
  };

  /**
   * Verificar si el usuario está autenticado
   */
  const isAuthenticated = () => {
    return !!user;
  };

  /**
   * Verificar si el usuario es administrador
   */
  const isAdmin = () => {
    return user?.role === 'administrator';
  };

  const value = {
    user,
    loading,
    login,
    logout,
    hasPermission,
    isAuthenticated,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;