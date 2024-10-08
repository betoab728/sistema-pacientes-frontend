import axios from 'axios';
import { CLINIC_ENDPOINT } from './endpoints';


const ClinicalHistoryApiClient  = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}${CLINIC_ENDPOINT}`,
    headers: {
        'Content-Type': 'application/json'
    }
});
/* se implementa las funciones para la historia clinica segun los metedos de la api 
router.get('/', getClinicalHistories);
router.post('/', createClinicalHistory);
router.get('/:id', getClinicalHistoryById);
router.put('/:id', updateClinicalHistory);
router.delete('/:id', deleteClinicalHistory);
router.get('/patient/:patientId', getClinicalHistoriesByPatientId);
*/

//lista de todas las historias clinicas

export const getClinicalHistories = async () => {
    try {
        console.log('Fetching clinical histories...apiClient');
        const response = await ClinicalHistoryApiClient.get('/');
        return response.data;
    } catch (error) {
        console.error('Error fetching clinical histories:', error);
        throw error;
    }
}

//crear una historia clinica
export const createClinicalHistory = async (clinicalHistoryData) => {
    try {
        console.log('Creating clinical history...apiClient: ', clinicalHistoryData);
        const response = await ClinicalHistoryApiClient.post('/', clinicalHistoryData);
        console.log('Clinical history created en api:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating clinical history:', error);
        throw error;
    }
};

//actualizar una historia clinica por id
export const updateClinicalHistory = async (clinicalHistoryId, clinicalHistoryData) => {
    try {
        const response = await ClinicalHistoryApiClient.put(`/${clinicalHistoryId}`, clinicalHistoryData);
        return response.data;
    } catch (error) {
        console.error(`Error updating clinical history ${clinicalHistoryId}:`, error);
        throw error;
    }
};

//obtener una historia clinica por id

export const getClinicalHistoryById = async (clinicalHistoryId) => {
    try {
        const response = await ClinicalHistoryApiClient.get(`/${clinicalHistoryId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching clinical history ${clinicalHistoryId}:`, error);
        throw error;
    }
};

//borrar una historia clinica por id
export const deleteClinicalHistory = async (clinicalHistoryId) => {
    try {
        const response = await ClinicalHistoryApiClient.delete(`/${clinicalHistoryId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting clinical history ${clinicalHistoryId}:`, error);
        throw error;
    }
};

//obtener todas las historias clinicas de un paciente por id

export const getClinicalHistoriesByPatientId = async (patientId) => {
    try {
        const response = await ClinicalHistoryApiClient.get(`/patient/${patientId}`);
        console.log('Historias clinicas del paciente en api:', response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching clinical histories by patient ${patientId}:`, error);
        throw error;
    }
};

//exportar las funciones para ser usadas en otros archivos




