// se implementa el contexto de pacientes a partir de los servicios de la api de pacientes

import React, { createContext, useContext, useState, useCallback } from 'react';
import PatientService from '../services/PatientService';

const PatientContext = createContext();

export const usePatientContext = () => useContext(PatientContext);

export const PatientProvider = ({ children }) => {
    const [patients, setPatients] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    const fetchPatients = useCallback(async () => {
        if (isFetched) return patients;
        try {
            console.log('Fetching patients...PatientContext');
            const fetchedPatients = await PatientService.fetchPatients();
            setPatients(fetchedPatients);
            setIsFetched(true);
            return fetchedPatients;
        } catch (error) {
            console.error('Error fetching patients:', error);
            throw error;
        }
    }, [isFetched, patients]);  

    const handleCreatePatient = useCallback(async (patientData) => {
        try {
            console.log('Creating patient in PatientContext: ', patientData);
            const createdPatient = await PatientService.createPatient(patientData);
            console.log('paciente registrado :', createdPatient);
            //como ya se creo el paciente vuelvo a cargar los pacientes desde la api para tener la lsita actualizada
            const response = await fetchPatients();
            console.log('Datos nuevos de la API en patientcontext:', response);
            // actualizo el estado y tambien retorno la lista de pacientes actualizada
            setPatients(response);
            return response; // Asegúrate de retornar el paciente creado
        } catch (error) {
            console.error('Error creating patient:', error);
            throw error;
        }
    }, []);

    const handleFindPatientById = useCallback(async (patientId) => {
        try {
            console.log('Finding patient by ID in PatientContext: ', patientId);
            const foundPatient = await PatientService.getPatientById(patientId);
            return foundPatient;
        } catch (error) {
            console.error('Error finding patient by ID:', error);
            throw error;
        }
    }, []);

    const handleUpdatePatient = useCallback(async (patientId, patientData) => {
        try {
            console.log('Updating patient in PatientContext: ', patientData);
            const updatedPatient = await PatientService.updatePatient(patientId, patientData);
            //como ya se actualizo el paciente vuelvo a cargar los pacientes desde la api para tener la lsita actualizada
            const response = await fetchPatients();
            console.log('Datos nuevos de la API en patientcontext:', response);
            // actualizo el estado y tambien retorno la lista de pacientes actualizada
            setPatients(response);
            return response; // Asegúrate de retornar el paciente actualizado
        } catch (error) {
            console.error('Error updating patient:', error);
            throw error;
        }
    }
    , []);

    const handleDeletePatient = useCallback(async (patientId) => {
        try {
            console.log('Deleting patient in PatientContext: ', patientId);
            const deletedPatient = await PatientService.deletePatient(patientId);
            //como ya se elimino el paciente vuelvo a cargar los pacientes desde la api para tener la lsita actualizada
            const response = await fetchPatients();
            console.log('Datos nuevos de la API en patientcontext:', response);
            // actualizo el estado y tambien retorno la lista de pacientes actualizada
            setPatients(response);
            return response; // Asegúrate de retornar el paciente eliminado
        } catch (error) {
            console.error('Error deleting patient:', error);
            throw error;
        }
    }, []);

    const handleFindPatientsByJob = useCallback(async (jobId) => {
        try {
            console.log('Finding patients by Job in PatientContext: ', jobId);
            const foundPatients = await PatientService.getPatientsByJob(jobId);
            return foundPatients;
        } catch (error) {
            console.error('Error finding patients by Job:', error);
            throw error;
        }
    }, []);

    const handleFindPatientsByName = useCallback(async (name) => {
        try {
            console.log('Finding patients by Name in PatientContext: ', name);
            const foundPatients = await PatientService.getPatientsByName(name);
            return foundPatients;
        } catch (error) {
            console.error('Error finding patients by Name:', error);
            throw error;
        }
    }
    , []);

    const handleFindPatientsByPaternalSurname = useCallback(async (paternalSurname) => {
        try {
            console.log('Finding patients by Paternal Surname in PatientContext: ', paternalSurname);
            const foundPatients = await PatientService.getPatientsByPaternalSurname(paternalSurname);
            return foundPatients;
        } catch (error) {
            console.error('Error finding patients by Paternal Surname:', error);
            throw error;
        }
    }
    , []);

    const handleFindPatientsByMaternalSurname = useCallback(async (maternalSurname) => {
        try {
            console.log('Finding patients by Maternal Surname in PatientContext: ', maternalSurname);
            const foundPatients = await PatientService.getPatientsByMaternalSurname(maternalSurname);
            return foundPatients;
        } catch (error) {
            console.error('Error finding patients by Maternal Surname:', error);
            throw error;
        }
    }
    , []);

    const handleFindPatientsByDni = useCallback(async (dni) => {
        try {
            console.log('Finding patients by Dni in PatientContext: ', dni);
            const foundPatients = await PatientService.getPatientsByDni(dni);
            return foundPatients;
        } catch (error) {
            console.error('Error finding patients by Dni:', error);
            throw error;
        }
    }
    , []);

    //se hace uso de usememo con renombramiento para evitar que se renderize el componente si no hay cambios en el estado
    //de los pacientes

    const value = React.useMemo(() => ({
        patients,
        fetchPatients,
        createPatient: handleCreatePatient,
        findPatientById: handleFindPatientById,
        updatePatient: handleUpdatePatient,
        deletePatient: handleDeletePatient,
        findPatientsByJob: handleFindPatientsByJob,
        findPatientsByName: handleFindPatientsByName,
        findPatientsByPaternalSurname: handleFindPatientsByPaternalSurname,
        findPatientsByMaternalSurname: handleFindPatientsByMaternalSurname,
        findPatientsByDni: handleFindPatientsByDni
    }), [patients, fetchPatients, handleCreatePatient, handleFindPatientById, handleUpdatePatient, handleDeletePatient,
         handleFindPatientsByJob, handleFindPatientsByName, handleFindPatientsByPaternalSurname, handleFindPatientsByMaternalSurname,
          handleFindPatientsByDni]);

    return (
        <PatientContext.Provider value={value}>
            {children}
        </PatientContext.Provider>
    );
}