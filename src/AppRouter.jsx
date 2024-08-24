import { BrowserRouter as Router, Route,Routes,Navigate  } from 'react-router-dom';
import Login from './componentes/login/Login';
import  MainLayout  from './componentes/MainLayout';
import  {Dashboard}  from './componentes/dashboard/Dashboard';
import  Usuarios  from './componentes/usuarios/Usuarios';
import  Citas  from './componentes/citas/Citas';
import  Ocupaciones  from './componentes/ocupaciones/Ocupaciones';
import  NuevoUsuario from './componentes/usuarios/NuevoUsuario';
import ActualizarUsuario from './componentes/usuarios/ActualizarUsuario';
import Pacientes from './componentes/pacientes/Pacientes';
import AddPatient from './componentes/pacientes/AddPatient';
import EditPatient from './componentes/pacientes/EditPatient';
import Doctores from './componentes/doctores/Doctores';
import AddDoctor from './componentes/doctores/AddDoctor';
import EditDoctor from './componentes/doctores/EditDoctor';
import AddCita from './componentes/citas/AddCita';
import EditCita from './componentes/citas/EditCita';
import MedicalRecordDates from './componentes/MedicalRecord/MedicalRecordDates';
import MedicalRecordDetail from './componentes/MedicalRecord/MedicalRecordDetail';
import AddMedicalRecord from './componentes/MedicalRecord/AddMedicalRecord';


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
        <Route path="pacientes/nuevo" element={<AddPatient />} />
        <Route path="pacientes/editar/:id" element={<EditPatient />} />
        <Route path="doctores" element={<Doctores />} />
        <Route path="doctores/nuevo" element={<AddDoctor />} />
        <Route path="doctores/editar/:id" element={<EditDoctor />} />
        <Route path="citas" element={<Citas />} />
        <Route path="citas/nuevo" element={<AddCita />} />
        <Route path="citas/editar/:id" element={<EditCita />} />
        <Route path="citas/fechas/:id" element={<MedicalRecordDates />} />
        <Route path="historiasclinicas/detalle/:id" element={<MedicalRecordDetail />} />
        <Route path="historiasclinicas/nuevo/:id" element={<AddMedicalRecord />} />
        <Route path="ocupaciones" element={<Ocupaciones />} />
      </Route>
          <Route path="*" element={<Navigate to="/main/dashboard" />} />
    </Routes>
  
  )
}
