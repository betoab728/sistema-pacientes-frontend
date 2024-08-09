import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useUserContext } from '../../contexts/UserContext';

const NuevoUsuario = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');

  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { createUser } = useUserContext();



  const handleRegistro = async (e) => {
    e.preventDefault(); // Previene el comportamiento de envío por defecto

      // Función para mostrar mensajes de error
  const mostrarError = (mensaje) => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje,
      confirmButtonText: 'Cerrar'
    });
  };

  // Validar que las contraseñas coincidan
  if (contrasena !== confirmarContrasena) {
    mostrarError('Las contraseñas no coinciden');
    return;
  }

  // Validar correo
  if (!correo.includes('@')) {
    mostrarError('Correo inválido');
    return;
  }
  // Validar contraseña que tenga al menos 6 caracteres
  if (contrasena.length < 6) {
    mostrarError('La contraseña debe tener al menos 6 caracteres');
    return;
  }
     
    //se muestra un mensaje de confirmación sweetalert
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas registrar a este usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then( async(result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, se envían los datos
        console.log('Datos enviados:', { nombre, correo, contrasena });
        //enviarDatos();

        const userData = {
          nombre: nombre,
          correo: correo,
          clave: contrasena
      };

      try {
        // Usar el método del contexto para crear el usuario
        console.log('Registrando usuario: ', userData);

        await createUser(userData);
        console.log('Usuario registrado con éxito');

        // Limpiar los campos del formulario
        setNombre('');
        setCorreo('');
        setContrasena('');
        setConfirmarContrasena('');
        
        // Redirigir al dashboard
        navigate('/dashboard/');
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        // Aquí podrías manejar el error, mostrando un mensaje al usuario, etc.
    }

      }
    });

  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelar = () => {
    // Limpiar los campos
    setNombre('');
    setCorreo('');
    setContrasena('');
    setConfirmarContrasena('');

    // Redirigir al dashboard
    navigate('/dashboard/');
  };

  return (
    <div className="h-[90%] flex items-center justify-center">
      <div className="bg-white py-5 px-8 border-t-4 border-blue-700 rounded-md shadow-lg" >
        <h2 className="text-3xl text-gray-400 mb-3">Registro de Nuevo Usuario</h2>
        <form onSubmit={handleRegistro}>
          <div className="mb-2">
            <label htmlFor="nombre" className="text-sm">Nombre</label>
            <input
              type="text"
              id="nombre"
              placeholder="Nombre"
              className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
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
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="contrasena" className="text-sm">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              placeholder="Contraseña"
              className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmarContrasena" className="text-sm">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmarContrasena"
              placeholder="Confirmar Contraseña"
              className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
              value={confirmarContrasena}
              onChange={(e) => setConfirmarContrasena(e.target.value)}
              required
            />
          </div>

          <button
            className="border-none bg-blue-800 py-2 px-3 text-white w-full mt-2 rounded-md hover:bg-blue-700 mb-3"
            type="submit"
          >
            Registrarse
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

export default NuevoUsuario;
