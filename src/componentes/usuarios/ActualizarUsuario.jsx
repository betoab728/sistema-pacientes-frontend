import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useUserContext } from '../../contexts/UserContext';

const ActualizarUsuario = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { findUserById, updateUser } = useUserContext();

    const [user, setUser] = useState({
        nombre: '',
        correo: '',
        //tambien se carga el estado del usuario
        activo: true,
      

    });
    const [loading, setLoading] = useState(true);
    //la busqueda del usuario por id se hace con el id que se obtiene de los parametros y se usa useEffect para cargar el usuario
    //la ventaja de useEffect es que se ejecuta despues de que el componente se renderiza y asi se puede cargar el usuario por id
    // si no se usara useEffect se cargaria el usuario por id antes de que el componente se renderize y no se podria cargar el usuario
    //otra ventaja de useEffect es que se puede cargar el usuario por id cuando el id cambie y se actualice el usuario
    useEffect(() => {
        const loadUser = async () => {
            try {
                const fetchedUser = await findUserById(id);
                setUser({
                    nombre: fetchedUser.nombre,
                    correo: fetchedUser.correo,
                    activo: fetchedUser.activo,
                 
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al cargar el usuario',
                    confirmButtonText: 'Cerrar'
                });
            }
        };

        loadUser();
    }, [id, findUserById]);

    const handleChange = (e) => {
      const { id, value } = e.target;
      setUser((prevUser) => ({
        ...prevUser,
        [id]: value,
      }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      // Función para mostrar mensajes de error
      const mostrarError = (mensaje) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: mensaje,
          confirmButtonText: 'Cerrar'
        });
      };
      // Validar correo
      if (!user.correo.includes('@')) {
        mostrarError('Correo inválido');
        return;
      }
      // Validar que el nombre no esté vacío
      if (user.nombre.trim() === '') {
        mostrarError('El nombre no puede estar vacío');
        return;
      }

      //mensaje de confirmación sweetalert
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas actualizar a este usuario?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        }).then( async (result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma, se envían los datos
                console.log('Datos enviados:', user);
                
                try {
                  await updateUser(id, user);
                  Swal.fire({
                      icon: 'success',
                      title: 'Éxito',
                      text: 'Usuario actualizado con éxito',
                      confirmButtonText: 'Cerrar'
                  });
                  navigate('/usuarios'); // Redirige a la lista de usuarios o a otra página
              } catch (error) {
                  Swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: 'Error al actualizar el usuario',
                      confirmButtonText: 'Cerrar'
                  });
                  console.error('Error updating user:', error);
              }

            }
        });
      
    };

    //definir handleCancelar
    const handleCancelar = () => {
        navigate('/dashboard/');
    };

    if (loading) return <div>Loading...</div>;

    return (
      <div className="h-[90%] flex items-center justify-center">
      <div className="bg-white py-5 px-8 border-t-4 border-blue-700 rounded-md shadow-lg"  >
        <h2 className="text-3xl text-gray-400 mb-3"> Actualizar Usuario</h2>
        <form onSubmit={handleSubmit} className=''>
          <div className="mb-2">
            <label htmlFor="nombre" className="text-sm">Nombre</label>
            <input
              type="text"
              id="nombre"
              placeholder="Nombre"
              className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
              value={user.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="correo" className="text-sm">Correo</label>
            <input
              type="email"
              id="correo"
              placeholder="Correo"
              className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
              value={user.correo}
              onChange={handleChange}
              required
            />
          </div>
        
          <div className="mb-2">
            <label htmlFor="activo" className="text-sm">Estado</label>
            <select
              id="activo"
              className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
              value={user.activo}
              onChange={handleChange}
              required
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>

      
          <button
            className="border-none bg-blue-800 py-2 px-3 text-white w-full mt-2 rounded-md hover:bg-blue-700 mb-3"
            type="submit"
          >
            Guardar
          </button>

          <button
            className="border border-gray-300 py-2 px-3 text-gray-700 w-full mt-2 rounded-md hover:bg-gray-200"
            type="button"
            onClick={handleCancelar}
          >
            Cancelar
          </button>
        </form>
  
      </div>
    </div>
    );
};

export default ActualizarUsuario;
