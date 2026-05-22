import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { apiService } from '../services/api.service';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';

interface Props {
  onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setApiError(null);
    setLoading(true);
    try {
      // Consumimos el endpoint de autenticación que creaste en NestJS
      const res = await apiService.post('/auth/login', data);
      apiService.setToken(res.access_token); // Guardamos el JWT retornado
      onLoginSuccess();
    } catch (err: any) {
      setApiError(err.message || 'Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 border border-gray-200">
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full mb-2">
            <LogIn size={26} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Control de Acceso</h2>
          <p className="text-gray-500 text-sm">Ingresa a tu panel administrativo</p>
        </div>

        {apiError && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center gap-2 text-sm border border-red-100">
            <AlertCircle size={18} className="shrink-0" />
            <span>{apiError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Mail size={18} />
              </span>
              <input
                type="email"
                {...register('email', { required: 'El correo electrónico es requerido' })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="usuario@correo.com"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Lock size={18} />
              </span>
              <input
                type="password"
                {...register('password', { required: 'La contraseña es requerida' })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="******"
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message as string}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-200 disabled:bg-gray-400 text-sm mt-2"
          >
            {loading ? 'Validando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}