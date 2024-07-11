// UserContext.js

import React, { createContext, useContext, useState } from 'react';
import apiClient from '../api/apiClient'; // Importa apiClient 

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await apiClient.getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const createUser = async (userData) => {
    try {
      const createdUser = await apiClient.createUser(userData);
      setUsers([...users, createdUser]); // Actualiza la lista de usuarios localmente
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await apiClient.loginUser(email, password);
      return response;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ users, fetchUsers, createUser,loginUser }}>
      {children}
    </UserContext.Provider>
  );
};
