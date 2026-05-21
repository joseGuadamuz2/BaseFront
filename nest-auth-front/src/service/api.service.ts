const BASE_URL = 'http://localhost:3000';

export const apiService = {
  // Manejo del JWT en el almacenamiento local
  setToken: (token: string) => localStorage.setItem('token', token),
  getToken: () => localStorage.getItem('token'),
  logout: () => localStorage.removeItem('token'),

  // Petición POST para endpoints públicos (Login o Registro)
  async post(endpoint: string, data: any) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en la solicitud');
    }
    return response.json();
  },

  // Petición GET para endpoints protegidos (Envía el Bearer Token automáticamente)
  async getAuth(endpoint: string) {
    const token = this.getToken();
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      if (response.status === 401) this.logout(); // Si el token expiró, limpia la sesión
      throw new Error('Sesión expirada o acceso no autorizado');
    }
    return response.json();
  }
};