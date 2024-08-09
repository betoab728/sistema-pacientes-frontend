import { BrowserRouter as Router, Route,Routes,Navigate  } from 'react-router-dom';
import Login from './componentes/login/Login';
import  MainLayout  from './componentes/MainLayout';
import  {Dashboard}  from './componentes/dashboard/Dashboard';
import  Usuarios  from './componentes/usuarios/Usuarios';
import  {Pacientes } from './componentes/pacientes/Pacientes';
import  {Doctores}  from './componentes/doctores/Doctores';
import { Citas}  from './componentes/citas/Citas';
import { Ocupaciones}  from './componentes/ocupaciones/Ocupaciones';
import  NuevoUsuario from './componentes/usuarios/NuevoUsuario';
import ActualizarUsuario from './componentes/usuarios/ActualizarUsuario';

export const AppRouter = () => {
  return (
   
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main/*" element={<MainLayout />}>
      {/* Redirige a /dashboard por defecto */}
        <Route index element={<Navigate to="/main/dashboard" />} /> 
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="usuarios/nuevo" element={<NuevoUsuario />} />
        <Route path="usuarios/editar/:id" element={<ActualizarUsuario />} />
        <Route path="pacientes" element={<Pacientes />} />
        <Route path="doctores" element={<Doctores />} />
        <Route path="citas" element={<Citas />} />
        <Route path="ocupaciones" element={<Ocupaciones />} />
      </Route>
          <Route path="*" element={<Navigate to="/main/dashboard" />} />
    </Routes>
  
  )
}
