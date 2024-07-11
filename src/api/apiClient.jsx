// apiClient.js

import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api/users',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Funciones para interactuar con la API

export const getUsers = async () => {
    try {
        const response = await apiClient.get('USERS_ENDPOINT');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const createUser = async (userData) => {
    try {
        const response = await apiClient.post('/users', userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const updateUser = async (userId, userData) => {
    try {
        const response = await apiClient.put(`/users/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error(`Error updating user ${userId}:`, error);
        throw error;
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await apiClient.post('/users/login', { email, password });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

// Funciones para clientes, doctores, citas, etc.

// Ejemplo para gestionar clientes
export const getClients = async () => {
    try {
        const response = await apiClient.get('/clients');
        return response.data;
    } catch (error) {
        console.error('Error fetching clients:', error);
        throw error;
    }
};

// Puedes definir más funciones según las rutas y controladores en tu backend


export default apiClient;
