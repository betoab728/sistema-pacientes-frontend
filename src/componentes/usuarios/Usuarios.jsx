import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom'; // Solo importamos useNavigate

const Usuarios = () => {
  const { fetchUsers } = useUserContext();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Definir navigate aquí

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        console.log('Cargando usuarios...ListadoUsuarios');
        const response = await fetchUsers();
        setUsers(response);
      } catch (error) {
        console.error('Error al cargar los usuarios en ListadoUsuarios:', error);
      }
    };

    cargarUsuarios();
  }, []); // Dependencia vacía para ejecutar solo una vez al montar el componente

  const handleCrear = () => {
    console.log('Crear nuevo usuario');
    navigate('/main/usuarios/nuevo'); // Navegar a la ruta de creación de usuario
  };

  const handleModificar = (id) => {
    console.log(`Modificar usuario con id: ${id}`);
    navigate(`/main/usuarios/editar/${id}`); // Navegar a la ruta de edición de usuario
  };

  return (
    <div className='mt-12'>
      <h1 className="text-2xl font-bold mb-2 text-center">Usuarios del sistema</h1>
      <h2 className="text-xl font-bold mb-4">Listado de Usuarios</h2>
      <button onClick={handleCrear} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Crear Usuario
      </button>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">_id</th>
            <th className="py-2 px-4 border-b text-left">Nombre</th>
            <th className="py-2 px-4 border-b text-left">Correo</th>
            <th className="py-2 px-4 border-b text-left">FechaRegistro</th>
            <th className="py-2 px-4 border-b text-left">Estado</th>
            <th className="py-2 px-4 border-b text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((usuario) => (
            <tr key={usuario._id}>
              <td className="py-2 px-4 border-b text-left">{usuario._id}</td>
              <td className="py-2 px-4 border-b text-left">{usuario.nombre}</td>
              <td className="py-2 px-4 border-b text-left">{usuario.correo}</td>
              <td className="py-2 px-4 border-b text-left">{new Date(usuario.fechaRegistro).toLocaleString()}</td>
              <td className="py-2 px-4 border-b text-left">{usuario.activo ? "Activo" : "Inactivo"}</td>
              <td className="py-2 px-4 border-b text-left">
                <button onClick={() => handleModificar(usuario._id)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                  <i className="fas fa-pen mr-2"></i> Modificar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;
