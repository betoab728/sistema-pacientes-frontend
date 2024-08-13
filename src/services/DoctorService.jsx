//se implementa los servicios de la api de doctores segun los metodos de la api
import { getDoctors, createDoctor, getDoctorById, updateDoctor, deleteDoctor,getDoctorsByDni,getDoctorsByName } from '../api/DoctorsApiClient';

const DoctorService = {
    fetchDoctors: async () => {
        try {
            const doctors = await getDoctors();
            return doctors;
        } catch (error) {
            console.error('Error in DoctorService fetching doctors:', error);
            throw error;
        }
    },

    createDoctor: async (doctorData) => {
        try {
            const doctor = await createDoctor(doctorData);
            console.log('Doctor created in DoctorService:', doctor);
            return doctor;
        } catch (error) {
            console.error('Error in DoctorService creating doctor:', error);
            throw error;
        }
    },

    getDoctorById: async (doctorId) => {
        try {
            const doctor = await getDoctorById(doctorId);
            return doctor;
        } catch (error) {
            console.error('Error in DoctorService fetching doctor by ID:', error);
            throw error;
        }
    },

    updateDoctor: async (doctorId, doctorData) => {
        try {
            const updatedDoctorService = await updateDoctor(doctorId, doctorData);
            return updatedDoctorService;
        } catch (error) {
            console.error('Error in DoctorService updating doctor:', error);
            throw error;
        }
    },
    deleteDoctor: async (doctorId) => {
        try {
            const deletedDoctor = await deleteDoctor(doctorId);
            return deletedDoctor;
        } catch (error) {
            console.error('Error in DoctorService deleting doctor:', error);
            throw error;
        }
    },
    getDoctorsByDni: async (dni) => {
        try {
            const doctors = await getDoctorsByDni(dni);
            return doctors;
        } catch (error) {
            console.error('Error in DoctorService fetching doctors by DNI:', error);
            throw error;
        }
    },
    getDoctorsByName: async (name) => {
        try {
            const doctors = await getDoctorsByName(name);
            return doctors;
        } catch (error) {
            console.error('Error in DoctorService fetching doctors by Name:', error);
            throw error;
        }
    },
};

export default DoctorService;