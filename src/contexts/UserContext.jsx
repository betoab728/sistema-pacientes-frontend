import { createContext, useState } from 'react';
import { getUsers, createUser, loginUser } from '../api/apiClient'; // Importa las funciones directamente

const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      const createdUser = await createUser(userData);
      setUsers([...users, createdUser]); // Actualiza la lista de usuarios localmente
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleLoginUser = async (email, password) => {
    try {
      const response = await loginUser(email, password);
      return response;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ users, fetchUsers, createUser: handleCreateUser, loginUser: handleLoginUser }}>
      {children}
    </UserContext.Provider>
  );
};
