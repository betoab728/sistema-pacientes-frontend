// se implementa el context usando clinicalHistoryService
import React, { createContext, useState, useMemo, useCallback, useContext } from 'react';
import ClinicalHistoryService from '../services/ClinicalHistoryService';

const ClinicalHistoryContext = createContext();

export const useClinicalHistoryContext = () => useContext(ClinicalHistoryContext);

export const ClinicalHistoryProvider = ({ children }) => {
    const [clinicalHistories, setClinicalHistories] = useState([]);
    // const [isFetched, setIsFetched] = useState(false);

    const fetchClinicalHistories = useCallback(async () => {
        // if (isFetched) return clinicalHistories;
        try {
            console.log('cargando historias clinicas...ClinicalHistoryContext');
            const fetchedClinicalHistories = await ClinicalHistoryService.fetchClinicalHistories();

            setClinicalHistories(fetchedClinicalHistories);
            // setIsFetched(true);
            return fetchedClinicalHistories;
        } catch (error) {
            console.error('Error fetching clinical histories:', error);
            throw error;
        }
    }, []);

    const handleCreateClinicalHistory = useCallback(async (clinicalHistoryData) => {
        try {
            console.log('Creating clinical history in ClinicalHistoryContext: ', clinicalHistoryData);
            const createdClinicalHistory = await ClinicalHistoryService.createClinicalHistory(clinicalHistoryData);
            console.log('Clinical history created :', createdClinicalHistory);
            const response = await fetchClinicalHistories();
            console.log('Datos nuevos de la API en clinicalhistorycontext:', response);
            setClinicalHistories(response);
            return response;
        } catch (error) {
            console.error('Error creating clinical history:', error);
            throw error;
        }
    }, []);

    const handleFindClinicalHistoryById = useCallback(async (clinicalHistoryId) => {
        try {
            console.log('Finding clinical history by ID in ClinicalHistoryContext: ', clinicalHistoryId);
            const foundClinicalHistory = await ClinicalHistoryService.getClinicalHistoryById(clinicalHistoryId);
            return foundClinicalHistory;
        } catch (error) {
            console.error('Error finding clinical history by ID:', error);
            throw error;
        }
    }
        , []);

    const handleUpdateClinicalHistory = useCallback(async (clinicalHistoryId, clinicalHistoryData) => {
        try {
            console.log('update clinicalhistorycontext : ', clinicalHistoryData);
            await ClinicalHistoryService.updateClinicalHistory(clinicalHistoryId, clinicalHistoryData);
            const response = await fetchClinicalHistories();
            setClinicalHistories(response);
        } catch (error) {
            console.error('Error updating clinical history:', error);
            throw error;
        }
    }, []);

    const handleDeleteClinicalHistory = useCallback(async (clinicalHistoryId) => {
        try {
            console.log('delete clinicalhistorycontext : ', clinicalHistoryId);
            await ClinicalHistoryService.deleteClinicalHistory(clinicalHistoryId);
            const response = await fetchClinicalHistories();
            setClinicalHistories(response);
        } catch (error) {
            console.error('Error deleting clinical history:', error);
            throw error;
        }
    }
        , []);

        // metodo para listar las historias clinicas de un paciente

        const handleFindClinicalHistoriesByPatientId = useCallback(async (patientId) => {
            try {
                console.log('Finding clinical histories by patient ID in ClinicalHistoryContext: ', patientId);
                const foundClinicalHistories = await ClinicalHistoryService.getClinicalHistoriesByPatientId(patientId);
                return foundClinicalHistories;
            } catch (error) {
                console.error('Error finding clinical histories by patient ID:', error);
                throw error;
            }
        }
        , []);

        // se usa usememo para que no se vuelva a ejecutar la funcion cada vez que se renderiza el componente pero se renombra para que no se confunda con la funcion

        const value = useMemo(() => ({
        //los metodos son renombrados para que no se confundan con los metodos de la api
        fetchClinicalHistories: fetchClinicalHistories,
        createClinicalHistory: handleCreateClinicalHistory,
        findClinicalHistoryById: handleFindClinicalHistoryById,
        updateClinicalHistory: handleUpdateClinicalHistory,
        deleteClinicalHistory: handleDeleteClinicalHistory,
        findClinicalHistoriesByPatientId: handleFindClinicalHistoriesByPatientId,
        clinicalHistories: clinicalHistories,
    }), [fetchClinicalHistories, handleCreateClinicalHistory, handleFindClinicalHistoryById, handleUpdateClinicalHistory, handleDeleteClinicalHistory
        ,handleFindClinicalHistoriesByPatientId, clinicalHistories]);

    return (    
        <ClinicalHistoryContext.Provider value={value}>
            {children}
        </ClinicalHistoryContext.Provider>
    );
};






