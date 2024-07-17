import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { getUsers, createUser, loginUser } from '../api/apiClient';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  const fetchUsers = useCallback(async () => {
    if (isFetched) return users; // Retorna los usuarios si ya se han cargado
    try {
      console.log('Fetching users...UserContext');
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
      setIsFetched(true);
      console.log('Datos recibidos de la API en usercontext:', fetchedUsers);
      return fetchedUsers; // Retorna los usuarios
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }, [isFetched, users]); // Agregado isFetched y users como dependencias

  const handleLoginUser = useCallback(async (email, password) => {
    try {
      const response = await loginUser(email, password);
      return response;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }, []);

  const handleCreateUser = useCallback(async (userData) => {
    try {
      const createdUser = await createUser(userData);
      setUsers(prevUsers => [...prevUsers, createdUser]); // Actualización basada en el estado anterior
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }, []);

  const value = useMemo(() => ({
    fetchUsers,
    createUser: handleCreateUser,
    loginUser: handleLoginUser,
    users,
  }), [fetchUsers, handleCreateUser, handleLoginUser, users]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
