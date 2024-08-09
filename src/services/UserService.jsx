import { getUsers, createUser, loginUser, getUserById, updateUser } from '../api/UsuariosApiClient';

const UserService = {
  fetchUsers: async () => {
    try {
      const users = await getUsers();
      return users;
    } catch (error) {
      console.error('Error in UserService fetching users:', error);
      throw error;
    }
  },

  createUser: async (userData) => {
    try {
      const user = await createUser(userData);
      return user;
    } catch (error) {
      console.error('Error in UserService creating user:', error);
      throw error;
    }
  },

  loginUser: async (email, password) => {
    try {
      const response = await loginUser(email, password);
      return response;
    } catch (error) {
      console.error('Error in UserService logging in:', error);
      throw error;
    }
  },

  getUserById: async (userId) => {
    try {
      const user = await getUserById(userId);
      return user;
    } catch (error) {
      console.error('Error in UserService fetching user by ID:', error);
      throw error;
    }
  },

  updateUser: async (userId, userData) => {
    try {
      const updatedUser = await updateUser(userId, userData);
      return updatedUser;
    } catch (error) {
      console.error('Error in UserService updating user:', error);
      throw error;
    }
  }
};

export default UserService;