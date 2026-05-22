import { useEffect, useState } from 'react';
import { apiService } from '../services/api.service';
import { Users, RefreshCw, Calendar, Shield } from 'lucide-react';

interface User {
  id: string;
  email: string;
  Audit_CreatedBy?: string;
  Audit_CreatedAt?: string;
}

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getAuth('/users');
      setUsers(data);
    } catch (err: any) {
      setError(err.message || 'Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchUsers(); 
  }, []);

  return (
    <div className="space-y-6">
      {/* Encabezado de la Sección */}
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users className="text-blue-600" size={24} />
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Módulo de Usuarios</h1>
          </div>
          <p className="text-sm text-slate-500">Administra las credenciales activas del ecosistema.</p>
        </div>
        <button
          onClick={fetchUsers}
          className="p-2.5 bg-white text-slate-600 hover:text-blue-600 rounded-xl border border-slate-200 hover:border-blue-200 shadow-sm transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 text-sm font-medium">
          ⚠️ {error}
        </div>
      )}

      {/* Tabla Estilizada */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-sm font-medium text-slate-400 shadow-sm">
          Cargando registros desde PostgreSQL...
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-500 text-xs uppercase font-bold tracking-wider">
                  <th className="p-4 pl-6">ID del Registro</th>
                  <th className="p-4">Correo Electrónico</th>
                  <th className="p-4">Origen / Creador</th>
                  <th className="p-4 pr-6">Fecha de Alta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-400 font-medium">
                      No hay usuarios registrados en la base de datos.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 pl-6 font-mono text-xs text-slate-400 select-all">{user.id}</td>
                      <td className="p-4 font-semibold text-slate-900">{user.email}</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200/60">
                          <Shield size={12} />
                          {user.Audit_CreatedBy || 'REST API'}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <Calendar size={13} className="text-slate-400" />
                          {user.Audit_CreatedAt ? new Date(user.Audit_CreatedAt).toLocaleDateString() : 'N/A'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
