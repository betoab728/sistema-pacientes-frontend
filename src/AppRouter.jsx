import { Switch, Route } from 'react-router-dom';
import Login from './componentes/login/Login';
import NuevoUsuario from './componentes/registroUsuario/nuevoUsuario';
import Dashboard from './componentes/dashboard/Dashboard';

export const AppRouter = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      <Route path="/nuevo-usuario">
        <NuevoUsuario />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      {/* Manejo de rutas no encontradas (opcional) */}
      <Route>
        <p>Ruta no encontrada</p>
      </Route>
    </Switch>
  )
}
