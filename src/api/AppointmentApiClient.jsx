import axios from 'axios';
import { APPOINTMENT_ENDPOINT} from './endpoints';


const AppointmentApiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}${APPOINTMENT_ENDPOINT}`,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getAppointments = async () => {
    try {
        console.log('Fetching appointments...apiClient');
        const response = await AppointmentApiClient.get('/');
        return response.data;
    } catch (error) {
        console.error('Error fetching appointments:', error);
        throw error;
    }
};

//crear un appointment
export const createAppointment = async (appointmentData) => {
    try {
        console.log('Creating appointment...apiClient: ', appointmentData);
        const response = await AppointmentApiClient.post('/', appointmentData);
        console.log('Appointment created en api:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating appointment:', error);
        throw error;
    }
};

//actualizar un appointment
export const updateAppointment = async (appointmentId, appointmentData) => {
    try {
        console.log('actualizando en la api.apiClient: ', appointmentData);
        const response = await AppointmentApiClient.put(`/${appointmentId}`, appointmentData);

        return response.data;
    } catch (error) {
        console.error(`Error updating appointment ${appointmentId}:`, error);
        throw error;
    }
};

//obtener un appointment por id
export const getAppointmentById = async (appointmentId) => {
    try {
        const response = await AppointmentApiClient.get(`/${appointmentId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching appointment ${appointmentId}:`, error);
        throw error;
    }
};

//buscar por fecha desde hasta
export const getAppointmentsByDate = async (from, to) => {
    try {
        const response = await AppointmentApiClient.get(`/date/${from}/${to}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching appointments from ${from} to ${to}:`, error);
        throw error;
    }
};

//actualizar un appointment con el id y el estado: programado, cancelado, completado

export const updateAppointmentStatus = async (appointmentId, status) => {
   //la url es de tipo :http://localhost:3001/appointments/status/66b7f9dcddffb99ef1c87f83
    try {
        console.log('actualizando en la api.apiClient: ', status);
        const response = await AppointmentApiClient.put(`/status/${appointmentId}`, { status });

        return response.data;
    } catch (error) {
        console.error(`Error updating appointment ${appointmentId}:`, error);
        throw error;
    }
}

// Función para obtener el reporte de citas en PDF
export const getAppointmentsReport = async (from, to) => {
    try {
        const response = await AppointmentApiClient.get(`/report/${from}/${to}`, {
            responseType: 'blob', // Importante para manejar el PDF como un archivo binario
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching appointments report from ${from} to ${to}:`, error);
        throw error;
    }
};

// fin de metodos de apiClient
// exportar 
export default AppointmentApiClient;





