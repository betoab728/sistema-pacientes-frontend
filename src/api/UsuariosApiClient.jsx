import axios from 'axios';
import { USUARIOS_ENDPOINT } from './endpoints';



const UsuariosApiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}${USUARIOS_ENDPOINT}`,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Funciones para interactuar con la API
export const getUsers = async () => {
    try {
      //  console.log('Fetching users...apiClient');
        const response = await UsuariosApiClient.get('/');
        return response.data;
    } catch (error) {
       // console.error('Error fetching users:', error);
        throw error;
    }
};

export const createUser = async (userData) => {
    try {
      //  console.log('Creating user...apiClient: ', userData);
        const response = await UsuariosApiClient.post('/', userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const updateUser = async (userId, userData) => {
    try {
        const response = await UsuariosApiClient.put(`/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error(`Error updating user ${userId}:`, error);
        throw error;
    }
};

export const loginUser = async (correo, clave) => {
    try {
       // console.log('Logging in...apiClient');
       // console.log('email:', correo);
       // console.log('password length:', clave.length);

         // Construye la URL completa para la petición
         const url = `${UsuariosApiClient.defaults.baseURL}/login`;
    //     console.log('Request URL:', url);
 
         //  el cuerpo de la solicitud
         const requestBody = { correo, clave };
      //   console.log('Request Body:', requestBody);
 

        const response = await UsuariosApiClient.post('/login', { correo, clave });
        if (response.status === 200) {
       //     console.log('Login successful:', response.data);
        } else {
         //   console.error('Login failed:', response.data);
        }

        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};


// Funcion para listar usuario por id
export const getUserById = async (userId) => {
    try {
        const response = await UsuariosApiClient.get(`/${userId}`);
       // console.log('Datos recibidos de la API en usercontext:', response.data);
        return response.data;
      
    } catch (error) {
        console.error(`Error fetching user ${userId}:`, error);
        throw error;
    }
};

export default UsuariosApiClient;

