import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../contexts/UserContext';

const ListadoUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const { users } = useUserContext(); // Accede a fetchUsers desde UserContext

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        console.log('Cargando usuarios...ListadoUsuarios');
        const usuariosCargados = await users; // Usa fetchUsers para obtener los usuarios
        console.log("Datos recibidos de la API:", usuariosCargados);
        setUsuarios(usuariosCargados);
      } catch (error) {
        console.error('Error al cargar los usuarios en ListadoUsuarios:', error);
      }
    };

    cargarUsuarios();
  }, [users]); // Añade fetchUsers como dependencia para re-ejecutar si fetchUsers cambia

  // Función para manejar la creación (podrías implementar la lógica de navegación o mostrar un modal, etc.)
  const handleCrear = () => {
    console.log('Crear nuevo usuario');
  };

  // Función para manejar la modificación (necesitarás identificar el usuario a modificar, por ejemplo)
  const handleModificar = (id) => {
    console.log(`Modificar usuario con id: ${id}`);
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
          {usuarios.map((usuario) => (
            <tr key={usuario._id}>
              <td className="py-2 px-4 border-b text-left">{usuario._id}</td>
              <td className="py-2 px-4 border-b text-left">{usuario.nombre}</td>
              <td className="py-2 px-4 border-b text-left">{usuario.correo}</td>
              <td className="py-2 px-4 border-b text-left">{usuario.fechaRegistro}</td>
              <td className="py-2 px-4 border-b text-left">{usuario.estado}</td>
              <td className="py-2 px-4 border-b text-left">
                <button onClick={() => handleModificar(usuario._id)}>Modificar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoUsuarios;


