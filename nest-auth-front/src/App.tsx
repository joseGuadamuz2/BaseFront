import { useState } from 'react';
import { apiService } from './services/api.service';
import Login from './components/Login'; // <-- Verifica que esta ruta apunte bien a tus componentes
import Dashboard from './components/Dashboard';

export default function App() {
  // Evaluamos si ya hay un token en el navegador para decidir qué componente mostrar
  const [isLogged, setIsLogged] = useState<boolean>(!!apiService.getToken());

  return (
    <>
      {isLogged ? (
        <Dashboard onLogout={() => setIsLogged(false)} />
      ) : (
        <Login onLoginSuccess={() => setIsLogged(true)} />
      )}
    </>
  );
}
