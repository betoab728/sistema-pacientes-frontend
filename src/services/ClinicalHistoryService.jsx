//estos fueron los metodos en el archivo clicnicalHistoryApiClient.jsx :
/* se implementa las funciones para la historia clinica segun los metedos de la api que estan en el archivo clinicalHistoryApiClient.jsx
router.get('/', getClinicalHistories);
router.post('/', createClinicalHistory);
router.get('/:id', getClinicalHistoryById);
router.put('/:id', updateClinicalHistory);
router.delete('/:id', deleteClinicalHistory);
router.get('/patient/:patientId', getClinicalHistoriesByPatientId);
ahora se implementan los servicios */

import { getClinicalHistories, createClinicalHistory, getClinicalHistoryById, updateClinicalHistory, deleteClinicalHistory, 
    getClinicalHistoriesByPatientId } from '../api/ClinicalHistoryApiClient';

const ClinicalHistoryService = {
    fetchClinicalHistories: async () => {
        try {
            const clinicalHistories = await getClinicalHistories();
            return clinicalHistories;
        } catch (error) {
            console.error('Error in ClinicalHistoryService fetching clinical histories:', error);
            throw error;
        }
    },

    createClinicalHistory: async (clinicalHistoryData) => {
        try {
            const clinicalHistory = await createClinicalHistory(clinicalHistoryData);
            console.log('Clinical history created in ClinicalHistoryService:', clinicalHistory);
            return clinicalHistory;
        } catch (error) {
            console.error('Error in ClinicalHistoryService creating clinical history:', error);
            throw error;
        }
    },

    getClinicalHistoryById: async (clinicalHistoryId) => {
        try {
            const clinicalHistory = await getClinicalHistoryById(clinicalHistoryId);
            return clinicalHistory;
        } catch (error) {
            console.error('Error in ClinicalHistoryService fetching clinical history by ID:', error);
            throw error;
        }
    },

    updateClinicalHistory: async (clinicalHistoryId, clinicalHistoryData) => {
        try {
            const updatedClinicalHistoryService = await updateClinicalHistory(clinicalHistoryId, clinicalHistoryData);
            return updatedClinicalHistoryService;
        } catch (error) {
            console.error('Error in ClinicalHistoryService updating clinical history:', error);
            throw error;
        }
    },
    deleteClinicalHistory: async (clinicalHistoryId) => {
        try {
            const deletedClinicalHistory = await deleteClinicalHistory(clinicalHistoryId);
            return deletedClinicalHistory;
        } catch (error) {
            console.error('Error in ClinicalHistoryService deleting clinical history:', error);
            throw error;
        }
    },
    getClinicalHistoriesByPatientId: async (patientId) => {
        try {
            const clinicalHistories = await getClinicalHistoriesByPatientId(patientId);
            return clinicalHistories;
        } catch (error) {
            console.error('Error in ClinicalHistoryService fetching clinical histories by patient ID:', error);
            throw error;
        }
    }
};

export default ClinicalHistoryService;
