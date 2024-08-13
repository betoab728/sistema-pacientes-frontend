// se implementa el contexto de citas
 import React, { createContext, useState, useMemo, useCallback,useContext } from 'react';
import AppointmentService from '../services/AppointmentService';

const AppointmentContext = createContext();

export const useAppointmentContext = () => useContext(AppointmentContext);

export const AppointmentProvider = ({ children }) => {
    const [appointments, setAppointments] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    const fetchAppointments = useCallback(async () => {
        if (isFetched) return appointments;
        try {
            console.log('Fetching appointments...AppointmentContext');
            const fetchedAppointments = await AppointmentService.fetchAppointments();
            setAppointments(fetchedAppointments);
            setIsFetched(true);
            return fetchedAppointments;
        } catch (error) {
            console.error('Error fetching appointments:', error);
            throw error;
        }
    }, [isFetched, appointments]);

    const handleCreateAppointment = useCallback(async (appointmentData) => {
        try {
            console.log('Creating appointment in AppointmentContext: ', appointmentData);
            const createdAppointment = await AppointmentService.createAppointment(appointmentData);
            console.log('Appointment created :', createdAppointment);
            const response = await fetchAppointments();
            console.log('Datos nuevos de la API en appointmentcontext:', response);
            setAppointments(response);
            return response;
        } catch (error) {
            console.error('Error creating appointment:', error);
            throw error;
        }
    }, []);

    const handleFindAppointmentById = useCallback(async (appointmentId) => {
        try {
            console.log('Finding appointment by ID in AppointmentContext: ', appointmentId);
            const foundAppointment = await AppointmentService.getAppointmentById(appointmentId);
            return foundAppointment;
        } catch (error) {
            console.error('Error finding appointment by ID:', error);
            throw error;
        }
    }
    , []);

    const handleUpdateAppointment = useCallback(async (appointmentId, appointmentData) => {
        try {
            console.log('Updating appointment in AppointmentContext: ', appointmentData);
            const updatedAppointment = await AppointmentService.updateAppointment(appointmentId, appointmentData);
            const response = await fetchAppointments();
            setAppointments(response);
            return response;
        } catch (error) {
            console.error('Error updating appointment:', error);
            throw error;
        }
    }, []); 

    const handleFindAppointmentsByDate = useCallback(async (from, to) => {
        try {
            console.log('Finding appointments by date in AppointmentContext: ', from, to);
            const foundAppointments = await AppointmentService.getAppointmentsByDate(from, to);
            return foundAppointments;
        } catch (error) {
            console.error('Error finding appointments by date:', error);
            throw error;
        }
    }, []);

    // se usa usememo para que no se vuelva a ejecutar la funcion cada vez que se renderiza el componente pero se renombra para que no se confunda con la funcion

    const value = useMemo(() => ({
        appointments,
        fetchAppointments,
        createAppointment: handleCreateAppointment,
        findAppointmentById: handleFindAppointmentById,
        updateAppointment: handleUpdateAppointment,
        findAppointmentsByDate: handleFindAppointmentsByDate
    }), [appointments, fetchAppointments, handleCreateAppointment, handleFindAppointmentById, handleUpdateAppointment, handleFindAppointmentsByDate]);

    return (
        <AppointmentContext.Provider value={value}>
            {children}
        </AppointmentContext.Provider>
    );
}

