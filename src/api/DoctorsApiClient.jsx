import axios from 'axios';
import { DOCTOR_ENDPOINT } from './endpoints';


const DoctorsApiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}${DOCTOR_ENDPOINT}`,
    headers: {
        'Content-Type': 'application/json'
    }
});

//METODOS PARA INTERACTUAR CON LA API SEGUN LAS RUTAS 
/*
router.get('/', getDoctors);
router.post('/', createDoctor);
router.get('/:id', getDoctorById);
router.put('/:id', updateDoctor);
router.delete('/:id', deleteDoctor);
router.get('/name/:name', getDoctorsByName);
router.get('/dni/:dni', getDoctorsByDni);
*/

//lista de doctores
export const getDoctors = async () => {
    try {
        console.log('Fetching doctors...apiClient');
        const response = await DoctorsApiClient.get('/');
        return response.data;
    } catch (error) {
        console.error('Error fetching doctors:', error);
        throw error;
    }
};

//crear un doctor
export const createDoctor = async (doctorData) => {
    try {
        console.log('Creating doctor...apiClient: ', doctorData);
        const response = await DoctorsApiClient.post('/', doctorData);
        console.log('Doctor created en api:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating doctor:', error);
        throw error;
    }
};

//actualizar un doctor
export const updateDoctor = async (doctorId, doctorData) => {
    try {
        const response = await DoctorsApiClient.put(`/${doctorId}`, doctorData);
        return response.data;
    } catch (error) {
        console.error(`Error updating doctor ${doctorId}:`, error);
        throw error;
    }
};

//obtener un doctor por id
export const getDoctorById = async (doctorId) => {
    try {
        const response = await DoctorsApiClient.get(`/${doctorId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching doctor ${doctorId}:`, error);
        throw error;
    }
};

//borrar un doctor por id
export const deleteDoctor = async (doctorId) => {
    try {
        const response = await DoctorsApiClient.delete(`/${doctorId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting doctor ${doctorId}:`, error);
        throw error;
    }
};

//obtener doctores por nombre
export const getDoctorsByName = async (name) => {
    try {
        const response = await DoctorsApiClient.get(`/name/${name}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching doctors by name ${name}:`, error);
        throw error;
    }
};

//obtener doctores por dni
export const getDoctorsByDni = async (dni) => {
    try {
        const response = await DoctorsApiClient.get(`/dni/${dni}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching doctors by dni ${dni}:`, error);
        throw error;
    }
};

//exportar
export default DoctorsApiClient;
