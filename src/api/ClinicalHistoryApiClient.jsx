import axios from 'axios';
import { CLINIC_ENDPOINT } from './endpoints';


const MedicalRecord = axios.create({
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
        const response = await DoctorsApiClient.get('/');
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
        const response = await DoctorsApiClient.post('/', clinicalHistoryData);
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
        const response = await DoctorsApiClient.put(`/${clinicalHistoryId}`, clinicalHistoryData);
        return response.data;
    } catch (error) {
        console.error(`Error updating clinical history ${clinicalHistoryId}:`, error);
        throw error;
    }
};

//obtener una historia clinica por id

export const getClinicalHistoryById = async (clinicalHistoryId) => {
    try {
        const response = await DoctorsApiClient.get(`/${clinicalHistoryId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching clinical history ${clinicalHistoryId}:`, error);
        throw error;
    }
};

//borrar una historia clinica por id
export const deleteClinicalHistory = async (clinicalHistoryId) => {
    try {
        const response = await DoctorsApiClient.delete(`/${clinicalHistoryId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting clinical history ${clinicalHistoryId}:`, error);
        throw error;
    }
};

//obtener todas las historias clinicas de un paciente por id

export const getClinicalHistoriesByPatientId = async (patientId) => {
    try {
        const response = await DoctorsApiClient.get(`/patient/${patientId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching clinical histories by patient ${patientId}:`, error);
        throw error;
    }
};

//exportar las funciones para ser usadas en otros archivos
export default MedicalRecord;






