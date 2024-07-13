import { BrowserRouter as Router, Route,Routes,Navigate  } from 'react-router-dom';
import Login from './componentes/login/Login';
import NuevoUsuario from './componentes/registroUsuario/NuevoUsuario';
import Dashboard from './componentes/dashboard/Dashboard';

export const AppRouter = () => {
  return (
   
    <Routes>
      <Route path="/" element={ <Login />} />
      <Route path="/nuevo-usuario" element={ <NuevoUsuario />} />
      <Route path="/dashboard" element={ <Dashboard />} />
      <Route path="*" element={ <Navigate to="/" />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  
  )
}
