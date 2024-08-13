// se implementas los servicios de la api de pacientes segun los metodos de la api
import { getPatients, createPatient, getPatientById, updatePatient, deletePatient, getPatientsByJob, 
getPatientsByName, getPatientsByPaternalSurname, getPatientsByMaternalSurname, getPatientsByDni } from '../api/PatientsApiClient';

const PatientService = {
    fetchPatients: async () => {
        try {
        const patients = await getPatients();
        return patients;
        } catch (error) {
        console.error('Error in PatientService fetching patients:', error);
        throw error;
        }
    },
    
    createPatient: async (patientData) => {
        try {
        const patient = await createPatient(patientData);
        console.log('Patient created in PatientService:', patient);
        return patient;
        } catch (error) {
        console.error('Error in PatientService creating patient:', error);
        throw error;
        }
    },
    
    getPatientById: async (patientId) => {
        try {
        const patient = await getPatientById(patientId);
        return patient;
        } catch (error) {
        console.error('Error in PatientService fetching patient by ID:', error);
        throw error;
        }
    },
    
    updatePatient: async (patientId, patientData) => {
        try {
        const updatedPatientService = await updatePatient(patientId, patientData);
        return updatedPatientService;
        } catch (error) {
        console.error('Error in PatientService updating patient:', error);
        throw error;
        }
    },
    deletePatient: async (patientId) => {
        try {
        const deletedPatient = await deletePatient(patientId);
        return deletedPatient;
        } catch (error) {
        console.error('Error in PatientService deleting patient:', error);
        throw error;
        }
    },
    getPatientsByJob: async (jobId) => {
        try {
        const patients = await getPatientsByJob(jobId);
        return patients;
        } catch (error) {
        console.error('Error in PatientService fetching patients by Job:', error);
        throw error;
        }
    },
    getPatientsByName: async (name) => {
        try {
        const patients = await getPatientsByName(name);
        return patients;
        } catch (error) {
        console.error('Error in PatientService fetching patients by Name:', error);
        throw error;
        }
    },
    getPatientsByPaternalSurname: async (paternalSurname) => {
        try {
        const patients = await getPatientsByPaternalSurname(paternalSurname);
        return patients;
        } catch (error) {
        console.error('Error in PatientService fetching patients by Paternal Surname:', error);
        throw error;
        }
    },
    getPatientsByMaternalSurname: async (maternalSurname) => {
        try {
        const patients = await getPatientsByMaternalSurname(maternalSurname);
        return patients;
        } catch (error) {
        console.error('Error in PatientService fetching patients by Maternal Surname:', error);
        throw error;
        }
    }
    ,
    getPatientsByDni: async (dni) => {
        try {
        const patients = await getPatientsByDni(dni);
        return patients;
        } catch (error) {
        console.error('Error in PatientService fetching patients by Dni:', error);
        throw error;
        }
    }
    };
export default PatientService;