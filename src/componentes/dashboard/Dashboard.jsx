import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'tailwindcss/tailwind.css'; 
import './Dashboard.css'; 
import { Link, Routes, Route } from 'react-router-dom';
import ListadoUsuarios from '../registroUsuario/ListadoUsuarios'; // Asegúrate de importar ListadoUsuarios

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleToggle = () => {
    setSidebarOpen(!isSidebarOpen);
    console.log('Button clicked');
    console.log(isSidebarOpen);
  };

  return (
    <>
      {/* Header */}
      <header className="fixed w-full h-14 bg-white shadow-md flex items-center justify-between px-4 z-20">
        <button onClick={handleToggle} className="text-2xl cursor-pointer focus:outline-none">
          <i className="fas fa-bars"></i>
        </button>
        <h1 className="text-xl font-bold">Dashboard</h1>
      </header>
      <input type="checkbox" id="toggle" className="hidden" checked={isSidebarOpen} onChange={handleToggle} />

      {/* Sidebar */}
      <aside className="sidebar fixed top-14 left-0 h-full w-64 text-white flex flex-col bg-blue-700">
        <nav className="nav-menu">
          <ul className="ml z-0">
            <li className="p-4 flex items-center">
              <Link to="/dashboard" className="flex items-center">
                <i className="fas fa-tachometer-alt mr-2"></i>
                <p>Dashboard</p>
              </Link>
            </li>
            <li className="p-4 flex items-center"><i className="fas fa-users mr-2"></i>
              <p>Pacientes</p>
            </li>
            <li className="p-4 flex items-center"><i className="fas fa-calendar-alt mr-2"></i>
              <p>Citas</p>
            </li>
            <li className="p-4 flex items-center"><i className="fas fa-user-md mr-2"></i>
              <p>Doctores</p>
            </li>
            <li className="p-4 flex items-center"><i className="fas fa-briefcase-medical mr-2"></i>
              <p>Ocupaciones</p>
            </li>
            <li className="p-4 flex items-center">
              <Link to="listado-usuarios" className="flex items-center">
                <i className="fas fa-users-cog mr-2"></i>
                <p>Usuarios</p>     
              </Link>
            </li>
            <li className="p-4 flex items-center"><i className="fas fa-chart-line mr-2"></i>
              <p>Reportes</p>
            </li>
            <li className="p-4 flex items-center"><i className="fas fa-cog mr-2"></i>
              <p>Configuración</p>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-4">
        <Routes>
          <Route path="/" element={
            <>
              {/* Cards */}
              <div className="mt-14 mb-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Card Total de Pacientes */}
                <div className="bg-blue-700 p-4 rounded-lg shadow-md grid grid-flow-col justify-items-between items-center text-white">
                  <div>
                    <h2 className="text-xl font-bold mb-2">Total pacientes</h2>
                    <p className="m-1">Registrados hasta hoy</p>
                    <h1 className="text-4xl font-bold">100</h1>
                  </div>
                  <div className="flex justify-center">
                    <i className="fas fa-users text-5xl"></i>
                  </div>
                </div>
                {/* Card Citas Programadas */}
                <div className="bg-blue-700 p-4 rounded-lg shadow-md grid grid-flow-col justify-items-between items-center text-white">
                  <div>
                    <h2 className="text-xl font-bold mb-2">Citas Programadas</h2>
                    <p className="m-1">Hasta hoy</p>
                    <h1 className="text-4xl font-bold">100</h1>
                  </div>
                  <div className="flex justify-center">
                    <i className="fas fa-calendar-alt text-5xl"></i>
                  </div>
                </div>
                {/* Card Citas Hoy */}
                <div className="bg-blue-700 p-4 rounded-lg shadow-md grid grid-flow-col justify-items-between items-center text-white">
                  <div>
                    <h2 className="text-xl font-bold mb-2">Citas Hoy</h2>
                    <p className="m-1">Registradas</p>
                    <h1 className="text-4xl font-bold">100</h1>
                  </div>
                  <div className="flex justify-center">
                    <i className="fas fa-calendar-day text-5xl"></i>
                  </div>
                </div>
                {/* Card Recordatorio de citas */}
                <div className="bg-blue-700 p-4 rounded-lg shadow-md grid grid-flow-col justify-items-between items-center text-white">
                  <div>
                    <h2 className="text-xl font-bold mb-2">Recordatorio</h2>
                    <p className="m-1">Pacientes para atender hoy</p>
                    <h1 className="text-4xl font-bold">100</h1>
                  </div>
                  <div className="flex justify-center">
                    <i className="fas fa-bell text-5xl"></i>
                  </div>
                </div>
              </div>

              {/* Tables */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h2 className="text-xl font-bold mb-4">Últimas 10 citas</h2>
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b">Fecha</th>
                        <th className="py-2 px-4 border-b">Paciente</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-4 border-b">2024-07-10</td>
                        <td className="py-2 px-4 border-b">John Doe</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">2024-07-11</td>
                        <td className="py-2 px-4 border-b">Jane Smith</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h2 className="text-xl font-bold mb-4">Citas por atender hoy</h2>
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b">Fecha</th>
                        <th className="py-2 px-4 border-b">Paciente</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-4 border-b">2024-07-12</td>
                        <td className="py-2 px-4 border-b">Alice Johnson</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">2024-07-13</td>
                        <td className="py-2 px-4 border-b">Bob Brown</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          } />
          <Route path="listado-usuarios" element={<ListadoUsuarios />} />
          {/* Otras rutas dentro del dashboard pueden ir aquí */}
        </Routes>
      </main>
    </>
  );
};

export default Dashboard;
