// La URL base apunta estrictamente al puerto del backend
const BASE_URL = 'http://localhost:3000';

export const apiService = {
  // Guardar token en el navegador
  setToken: (token: string) => {
    localStorage.setItem('token', token);
  },

  // Obtener token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Cerrar sesión
  logout: () => {
    localStorage.removeItem('token');
  },

  // Peticiones POST públicas (como Login o Registro)
  post: async (endpoint: string, data: any) => {
    // Esto unirá 'http://localhost:3000' + '/auth/login' de forma perfecta
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error en la petición');
    }

    return response.json();
  },

  // Peticiones GET autenticadas (como la lista de usuarios del Dashboard)
  getAuth: async (endpoint: string) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Enviamos el JWT en las cabeceras
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'No autorizado');
    }

    return response.json();
  },
};