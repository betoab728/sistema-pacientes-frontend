import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import fondoLogin from '../../assets/fondo-login.jpg';
import { useUserContext } from '../../contexts/UserContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { loginUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      if (response.token) {
        setMessage('Usuario autenticado correctamente');
       // console.log('Usuario autenticado correctamente');
        localStorage.setItem('token', response.token);
        navigate('/main');
      } else {
        setMessage('Error de autenticación');
      //  console.error('Error de autenticación');
      }
    } catch (error) {
      //console.error('Error al conectar con la API', error);
      setMessage('Error al conectar con la API');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${fondoLogin})` }}
    >
      <div className="bg-white py-5 px-8 border-t-4 border-blue-700 rounded-md shadow-lg">
        <h2 className="text-3xl text-gray-400 mb-3">Iniciar sesión</h2>

        <div className="mb-2">
          <label htmlFor="email" className="text-sm">Correo</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mt-2 mb-3">
          <label htmlFor="password" className="text-sm">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="border-none bg-blue-800 py-2 px-3 text-white  w-full mt-2 rounded-md hover:bg-blue-700 mb-5"
          type="submit"
          onClick={handleLogin}
        >
          Ingresar
        </button>
        {/*
        <Link to="/nuevo-usuario" className="text-sm text-blue-400 mr-3">
          Soy nuevo usuario
        </Link> 
        
        <a href="#" className="text-sm text-blue-400">Olvidé mi contraseña</a>  
      */}
      <p className='text-xs text-gray-600'>Demo: postman@gmail.com - clave: 12345</p>
        {message && <p className="text-red-500 mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
