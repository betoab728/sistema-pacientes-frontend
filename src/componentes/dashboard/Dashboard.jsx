import React, { useEffect } from 'react';
import { useDashboardContext } from '../../contexts/DashboardContext';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Importación de Chart.js para el gráfico
//uso de css
 import './Dashboard.css';


export const Dashboard = () => {
  const { dashboardData, fetchDashboardData } = useDashboardContext();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Datos de ejemplo de dashboard extraídos del contexto
  const { totalPatients, totalAppointments, pendingAppointments, totalDoctors, lastAppointments, appointmentsByMonth } = dashboardData;

  // Configuración de datos para el gráfico
  const chartData = {
    labels: appointmentsByMonth?.map(item => item.month) || [],
    datasets: [
      {
        label: 'Total Citas',
        data: appointmentsByMonth?.map(item => item.totalAppointments) || [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Citas Completadas',
        data: appointmentsByMonth?.map(item => item.completedAppointments) || [],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
      {
        label: 'Citas Pendientes',
        data: appointmentsByMonth?.map(item => item.pendingAppointments) || [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  //mapear el campo status de la cita para mostrarlo en la tabla en español 'scheduled', 'completed', 'canceled'

  lastAppointments?.map((cita) => {
    if (cita.status === 'scheduled') {
      cita.status = 'Agendada';
    } else if (cita.status === 'completed') {
      cita.status = 'Completada';
    } else if (cita.status === 'canceled') {
      cita.status = 'Cancelada';
    }
    return cita;
  });

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Tarjetas de Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <SummaryCard title="Total Pacientes" count={totalPatients} icon="👥" />
        <SummaryCard title="Total Citas" count={totalAppointments} icon="📅" />
        <SummaryCard title="Citas Pendientes" count={pendingAppointments} icon="⏳" />
        <SummaryCard title="Doctores" count={totalDoctors} icon="👨‍⚕️" />
      </div>

      {/* Tabla de Citas */}
      <div className="overflow-x-auto mb-6">
        <h2 className="text-xl font-semibold mb-4">Últimas Citas</h2>
        <table className="min-w-full divide-y divide-gray-300 bg-white shadow-md rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {lastAppointments?.slice(0, 10).map((cita) => (
              <tr key={cita.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cita.patientName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cita.doctorName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(cita.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cita.hour}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cita.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Gráfico de Citas por Mes */}
        <div className="w-full h-full max-w-4xl mx-auto p-4"> {/* Contenedor principal con ancho máximo */}
          <div className="aspect-w-16 aspect-h-9 w-full h-full"> {/* Contenedor responsivo */}
            <Line data={chartData} />
          </div>
        </div>
    </div>
  );
};

// Componente Tarjeta de Resumen
const SummaryCard = ({ title, count, icon }) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
    <div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-2xl font-bold">{count}</p>
    </div>
    <div className="text-3xl">{icon}</div>
  </div>
);
