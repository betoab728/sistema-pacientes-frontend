
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NuevoUsuario = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');

  const handleRegistro = () => {
    // Validar que las contraseñas coincidan
    if (contrasena !== confirmarContrasena) {
      alert('Las contraseñas no coinciden');
      return;
    }

     // Limpiar los campos
     setNombre('');
     setCorreo('');
     setContrasena('');
     setConfirmarContrasena('');

      // Redirigir al login después de un registro exitoso
    navigate('/');


  };

  const handleCancelar = () => {
   
      // Limpiar los campos
      setNombre('');
      setCorreo('');
      setContrasena('');
      setConfirmarContrasena('');
  
    // Redirigir a la página de inicio de sesión
      
    navigate('/');

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white py-5 px-8 border-t-4 border-blue-700 rounded-md shadow-lg">
        <h2 className="text-3xl text-gray-400 mb-3">Registro de Nuevo Usuario</h2>

        <div className="mb-2">
          <label htmlFor="nombre" className="text-sm">Nombre</label>
          <input
            type="text"
            id="nombre"
            placeholder="Nombre"
            className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
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
          />
        </div>

        <button
          className="border-none bg-blue-800 py-2 px-3 text-white w-full mt-2 rounded-md hover:bg-blue-700 mb-3"
          type="button"
          onClick={handleRegistro}
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
      </div>
    </div>
  );
};

export default NuevoUsuario;
