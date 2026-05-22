import { Outlet, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api.service';
import { LogOut, ShieldCheck, LayoutDashboard, Users, Settings } from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    apiService.logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-500 selection:text-white">
      {/* Navbar Superior */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2 rounded-xl shadow-md shadow-blue-500/20">
              <ShieldCheck size={22} className="stroke-[2.5]" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r应用 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                GuadaSecure
              </span>
              <span className="text-[10px] block font-bold text-blue-600 tracking-wider uppercase -mt-1">Console</span>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="group flex items-center gap-2 border border-slate-200 hover:border-red-200 hover:bg-red-50 text-slate-600 hover:text-red-600 font-semibold py-2 px-4 rounded-xl transition-all duration-200 text-sm shadow-sm"
          >
            <LogOut size={16} className="group-hover:translate-x-0.5 transition-transform" />
            <span>Salir del Sistema</span>
          </button>
        </div>
      </header>

      {/* Cuerpo Principal con Sidebar Opcional Incorporado */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        {/* Sidebar Lateral Izquierdo */}
        <aside className="w-64 shrink-0 hidden md:flex flex-col gap-1">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">Navegación</p>
          
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold bg-blue-50 text-blue-700 transition-all">
            <LayoutDashboard size={18} />
            <span>Dashboard Principal</span>
          </button>

          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all">
            <Users size={18} />
            <span>Usuarios Postgres</span>
          </button>

          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all">
            <Settings size={18} />
            <span>Configuración</span>
          </button>
        </aside>

        {/* Espacio Dinámico de la Ruta */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}