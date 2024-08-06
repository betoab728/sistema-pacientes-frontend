import React from 'react';

// Datos de ejemplo para las tarjetas
const resumen = [
  { title: 'Pacientes', count: 120, icon: '👥' },
  { title: 'Citas Programadas', count: 35, icon: '📅' },
  { title: 'Doctores', count: 10, icon: '👨‍⚕️' },
  { title: 'Ocupaciones', count: 8, icon: '💼' },
];

// Datos de ejemplo para la tabla de citas
const citas = [
  { id: 1, paciente: 'Juan Pérez', doctor: 'Dr. Gómez', fecha: '2024-08-10', hora: '10:00 AM' },
  { id: 2, paciente: 'María López', doctor: 'Dr. Fernández', fecha: '2024-08-12', hora: '11:00 AM' },
  { id: 3, paciente: 'Carlos Ruiz', doctor: 'Dr. Martínez', fecha: '2024-08-15', hora: '02:00 PM' },
  { id: 4, paciente: 'Ana García', doctor: 'Dr. Morales', fecha: '2024-08-18', hora: '03:00 PM' },
];

export const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Tarjetas de Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {resumen.map((item) => (
          <div key={item.title} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-2xl font-bold">{item.count}</p>
            </div>
            <div className="text-3xl">{item.icon}</div>
          </div>
        ))}
      </div>

      {/* Tabla de Citas */}
      <div className="overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Últimas Citas</h2>
        <table className="min-w-full divide-y divide-gray-300 bg-white shadow-md rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {citas.map((cita) => (
              <tr key={cita.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cita.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cita.paciente}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cita.doctor}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cita.fecha}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cita.hora}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
