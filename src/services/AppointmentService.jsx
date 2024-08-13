//se implementan los servicios de citas a partir de los metodos de apiClient
import { getAppointments, createAppointment, getAppointmentById, 
    updateAppointment, getAppointmentsByDate } from '../api/AppointmentApiClient';

const AppointmentService = {

    fetchAppointments: async () => {
        try {
            const appointments = await getAppointments();
            return appointments;
        } catch (error) {
            console.error('Error in AppointmentService fetching appointments:', error);
            throw error;
        }
    },

    createAppointment: async (appointmentData) => {
        try {
            const appointment = await createAppointment(appointmentData);
            console.log('Appointment created in AppointmentService:', appointment);
            return appointment;
        } catch (error) {
            console.error('Error in AppointmentService creating appointment:', error);
            throw error;
        }
    },

    getAppointmentById: async (appointmentId) => {
        try {
            const appointment = await getAppointmentById(appointmentId);
            return appointment;
        } catch (error) {
            console.error('Error in AppointmentService fetching appointment by ID:', error);
            throw error;
        }
    },

    updateAppointment: async (appointmentId, appointmentData) => {
        try {
            const updatedAppointmentService = await updateAppointment(appointmentId, appointmentData);
            return updatedAppointmentService;
        } catch (error) {
            console.error('Error in AppointmentService updating appointment:', error);
            throw error;
        }
    },

    getAppointmentsByDate: async (from, to) => {
        try {
            const appointments = await getAppointmentsByDate(from, to);
            return appointments;
        } catch (error) {
            console.error('Error in AppointmentService fetching appointments by date:', error);
            throw error;
        }
    }
};

export default AppointmentService;