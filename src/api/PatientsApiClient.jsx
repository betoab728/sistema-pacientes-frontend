//se implementa la api para los pacientes
import axios from 'axios';
import { PATIENT_ENDPOINT } from './endpoints';


const PatientsApiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}${PATIENT_ENDPOINT}`,
    headers: {
        'Content-Type': 'application/json'
    }
});
//metodos de la api para los pacientes segun las rutas :

//lista de pacientes
export const getPatients = async () => {
    try {
        console.log('Fetching patients...apiClient');
        const response = await PatientsApiClient.get('/');
        return response.data;
    } catch (error) {
        console.error('Error fetching patients:', error);
        throw error;
    }
};
//crear un paciente
export const createPatient = async (patientData) => {
    try {
        console.log('Creating patient...apiClient: ', patientData);
        const response = await PatientsApiClient.post('/', patientData);
        console.log('Patient created en api:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating patient:', error);
        throw error;
    }
};
//actualizar un paciente
export const updatePatient = async (patientId, patientData) => {
    try {
        const response = await PatientsApiClient.put(`/${patientId}`, patientData);
        return response.data;
    } catch (error) {
        console.error(`Error updating patient ${patientId}:`, error);
        throw error;
    }
};
//obtener un paciente por id
export const getPatientById = async (patientId) => {
    try {
        const response = await PatientsApiClient.get(`/${patientId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching patient ${patientId}:`, error);
        throw error;
    }
};
//eliminar un paciente por id
export const deletePatient = async (patientId) => {
    try {
        const response = await PatientsApiClient.delete(`/${patientId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting patient ${patientId}:`, error);
        throw error;
    }
};
//obtener pacientes por trabajo
export const getPatientsByJob = async (jobId) => {
    try {
        const response = await PatientsApiClient.get(`/job/${jobId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching patients by job ${jobId}:`, error);
        throw error;
    }
};
//obtener pacientes por nombre
export const getPatientsByName = async (name) => {
    try {
        const response = await PatientsApiClient.get(`/name/${name}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching patients by name ${name}:`, error);
        throw error;
    }
};
//obtener pacientes por apellido paterno
export const getPatientsByPaternalSurname = async (paternalSurname) => {
    try {
        const response = await PatientsApiClient.get(`/paternalSurname/${paternalSurname}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching patients by paternal surname ${paternalSurname}:`, error);
        throw error;
    }
};
//obtener pacientes por apellido materno
export const getPatientsByMaternalSurname = async (maternalSurname) => {
    try {
        const response = await PatientsApiClient.get(`/maternalSurname/${maternalSurname}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching patients by maternal surname ${maternalSurname}:`, error);
        throw error;
    }
};
//obtener pacientes por dni
export const getPatientsByDni = async (dni) => {
    try {
        const response = await PatientsApiClient.get(`/dni/${dni}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching patients by dni ${dni}:`, error);
        throw error;
    }
};

// fin de los metodos de la api de pacientes