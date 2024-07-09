import React from 'react'
import { useState } from 'react'
import './Login.css' 
import fondoLogin from '../../assets/fondo-login.jpg';


export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {

        e.preventDefault();
        try {
            const response = await fetch('url_de_tu_api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
            });
      
            const data = await response.json();
      
            if (response.ok) {
              // Manejar la respuesta exitosa
              setMessage(data.message);
              console.log('Usuario autenticado correctamente');
              // Aquí puedes guardar el token en localStorage o sessionStorage
              localStorage.setItem('token', data.token);
              // Redirigir a la página principal, por ejemplo:
              // history.push('/dashboard');
            } else {
              // Manejar errores de autenticación
              setMessage(data.message);
              console.error('Credenciales inválidas');
            }
          } catch (error) {
            console.error('Error al conectar con la API', error);
          }

    }

    return (
      <div className="h-screen flex items-center justify-center" >
        <div className="bg-white py-5 px-8 border-t-4 border-blue-700 rounded-md shadow-lg">
          <h2 className="text-3xl text-gray-400 mb-3">Iniciar sesion</h2>
  
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
            <label htmlFor="password" className="text-sm">contraseña</label>
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
            className="border-none bg-blue-800 py-2 px-3 text-white rounded-sm w-full mt-2 rounded-md hover:bg-blue-700 mb-5"
            type="submit"
            onClick={handleLogin}
          >
            Ingresar
          </button>
          <a href="#" className="text-sm text-blue-400 mr-3">Registrarse </a>
          <a href="#" className="text-sm text-blue-400">Olvide mi contraseña </a>
        </div>
      </div>
    );
} 

export default Login;
