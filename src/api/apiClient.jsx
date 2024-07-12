import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3001/api/users',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Funciones para interactuar con la API
export const getUsers = async () => {
    try {
        const response = await apiClient.get('/');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const createUser = async (userData) => {
    try {
        const response = await apiClient.post('/', userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const updateUser = async (userId, userData) => {
    try {
        const response = await apiClient.put(`/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error(`Error updating user ${userId}:`, error);
        throw error;
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await apiClient.post('/login', { email, password });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

// Funciones para clientes, doctores, citas, etc.
export const getClients = async () => {
    try {
        const response = await apiClient.get('/clients');
        return response.data;
    } catch (error) {
        console.error('Error fetching clients:', error);
        throw error;
    }
};

export default apiClient;

