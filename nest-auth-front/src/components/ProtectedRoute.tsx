import { Navigate, Outlet } from 'react-router-dom';
import { apiService } from '../services/api.service';

export default function ProtectedRoute() {
  const token = apiService.getToken();

  // Si no hay token, lo mandamos al login de una vez
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si hay token, renderiza la ruta hija (el contenido privado)
  return <Outlet />;
}