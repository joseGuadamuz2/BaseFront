interface Props {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
        <h1 className="text-2xl font-bold text-green-600 mb-2">¡Ingreso Exitoso!</h1>
        <p className="text-gray-600 mb-6">
          Bienvenido al Panel de Control. Tu API de NestJS y tu Frontend en React ya están conectados con éxito.
        </p>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition duration-200 text-sm"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}