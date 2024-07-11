import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Hook para usar el contexto de autenticación
export const useAuth = () => {
    return useContext(AuthContext);
};

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');

    const login = async (email, password) => {
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
                // Autenticación exitosa
                setUser(data.user);
                setMessage('Usuario autenticado correctamente');
                localStorage.setItem('token', data.token);
            } else {
                // Error de autenticación
                setMessage(data.message);
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error al conectar con la API', error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, message }}>
            {children}
        </AuthContext.Provider>
    );
};
