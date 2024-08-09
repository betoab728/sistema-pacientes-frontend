import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import UserService from '../services/UserService';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  const fetchUsers = useCallback(async () => {
    if (isFetched) return users; // Retorna los usuarios si ya se han cargado
    try {
      console.log('Fetching users...UserContext');
      const fetchedUsers = await UserService.fetchUsers();
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
      const response = await UserService.loginUser(email, password);
      return response;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }, []);

  const handleCreateUser = useCallback(async (userData) => {
    try {
      console.log('Registrando usuario en usercontext: ', userData);
      const createdUser = await UserService.addUser(userData);
      setUsers(prevUsers => [...prevUsers, createdUser]); // Actualización basada en el estado anterior
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }, []);

  // Implemento buscar usuario por id que hice en el UserService
  const handleFindUserById = useCallback(async (userId) => {
    try {
      console.log('Buscando usuario por id en usercontext: ', userId);
      const foundUser = await UserService.getUserById(userId);
      return foundUser;
    } catch (error) {
      console.error('Error buscando usuario por id:', error);
      throw error;
    }
  }, []);

  // Actualizar usuario por id
  const handleUpdateUser = useCallback(async (userId, userData) => {
    try {
      console.log('Actualizando usuario en usercontext: ', userId, userData);
      const updatedUser = await UserService.updateUser(userId, userData);
      setUsers(prevUsers => {
        const index = prevUsers.findIndex(user => user._id === userId);
        if (index === -1) return prevUsers;
        const updatedUsers = [...prevUsers];
        updatedUsers[index] = updatedUser;
        return updatedUsers;
      });
    } catch (error) {
      console.error('Error actualizando usuario:', error);
      throw error;
    }
  }, []);

  const value = useMemo(() => ({
    fetchUsers,
    createUser: handleCreateUser,
    loginUser: handleLoginUser,
    findUserById: handleFindUserById,
    updateUser: handleUpdateUser,
    users,
  }), [fetchUsers, handleCreateUser, handleLoginUser, handleFindUserById, handleUpdateUser, users]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
