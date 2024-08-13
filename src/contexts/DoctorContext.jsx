//se implementa el context de doctores a partir de los servicios de doctores
import React, { createContext, useContext, useState, useCallback } from 'react';
import DoctorService from '../services/DoctorService';

const DoctorContext = createContext();

export const useDoctorContext = () => useContext(DoctorContext);

export const DoctorProvider = ({ children }) => {
    const [doctors, setDoctors] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    const fetchDoctors = useCallback(async () => {
        if (isFetched) return doctors;
        try {
            console.log('Fetching doctors...DoctorContext');
            const fetchedDoctors = await DoctorService.fetchDoctors();
            setDoctors(fetchedDoctors);
            setIsFetched(true);
            return fetchedDoctors;
        } catch (error) {
            console.error('Error fetching doctors:', error);
            throw error;
        }
    }, [isFetched, doctors]);

    const handleCreateDoctor = useCallback(async (doctorData) => {
        try {
            console.log('Creating doctor in DoctorContext: ', doctorData);
            const createdDoctor = await DoctorService.createDoctor(doctorData);
            console.log('Doctor created :', createdDoctor);
            //como ya se creo el doctor vuelvo a cargar los doctores desde la api para tener la lsita actualizada
            const response = await fetchDoctors();
            console.log('Datos nuevos de la API en doctorcontext:', response);
            // actualizo el estado y tambien retorno la lista de doctores actualizada
            setDoctors(response);
            return response; // Asegúrate de retornar el doctor creado
        } catch (error) {
            console.error('Error creating doctor:', error);
            throw error;
        }
    }, []);

    

    const handleFindDoctorById = useCallback(async (doctorId) => {
        try {
            console.log('Finding doctor by ID in DoctorContext: ', doctorId);
            const foundDoctor = await DoctorService.getDoctorById(doctorId);
            return foundDoctor;
        } catch (error) {
            console.error('Error finding doctor by ID:', error);
            throw error;
        }
    }, []);

    const handleUpdateDoctor = useCallback(async (doctorId, doctorData) => {
        try {
            console.log('Updating doctor in DoctorContext: ', doctorData);
            const updatedDoctor = await DoctorService.updateDoctor(doctorId, doctorData);
            //como ya se actualizo el doctor vuelvo a cargar los doctores desde la api para tener la lsita actualizada
            const response = await fetchDoctors();
            console.log('Datos nuevos de la API en doctorcontext:', response);
            // actualizo el estado y tambien retorno la lista de doctores actualizada
            setDoctors(response);
        } catch (error) {
            console.error('Error updating doctor:', error);
            throw error;
        }

    }, []);

    
    const handleDeleteDoctor = useCallback(async (doctorId) => {
        try {
            console.log('Deleting doctor in DoctorContext: ', doctorId);
            const deletedDoctor = await DoctorService.deleteDoctor(doctorId);
            //como ya se elimino el doctor vuelvo a cargar los doctores desde la api para tener la lsita actualizada
            const response = await fetchDoctors();
            console.log('Datos nuevos de la API en doctorcontext:', response);
            // actualizo el estado y tambien retorno la lista de doctores actualizada
            setDoctors(response);
        } catch (error) {
            console.error('Error deleting doctor:', error);
            throw error;
        }
    }, []);

    //busca por nombre
    const handleFindDoctorByName = useCallback(async (doctorName) => {
        try {
            console.log('Finding doctor by Name in DoctorContext: ', doctorName);
            const foundDoctor = await DoctorService.getDoctorByName(doctorName);
            return foundDoctor;
        } catch (error) {
            console.error('Error finding doctor by Name:', error);
            throw error;
        }
    }
    , []);

    //busca rpor dni
    const handleFindDoctorByDni = useCallback(async (doctorDni) => {
        try {
            console.log('Finding doctor by Dni in DoctorContext: ', doctorDni);
            const foundDoctor = await DoctorService.getDoctorByDni(doctorDni);
            return foundDoctor;
        } catch (error) {
            console.error('Error finding doctor by Dni:', error);
            throw error;
        }
    }
    , []);


        // se usa useMemo para que el valor del contexto solo se actualice cuando cambie el valor de los doctores
    const contextValue = React.useMemo(() => ({
        //metodos renombrados para que sean mas descriptivos
        fetchDoctors,
        createDoctor: handleCreateDoctor,
        findDoctorById: handleFindDoctorById,
        updateDoctor: handleUpdateDoctor,
        deleteDoctor: handleDeleteDoctor,
        findDoctorByName: handleFindDoctorByName,
        findDoctorByDni: handleFindDoctorByDni,
        doctors,
    }), [doctors, fetchDoctors, handleCreateDoctor, handleFindDoctorById, handleUpdateDoctor, handleDeleteDoctor, 
        handleFindDoctorByName, handleFindDoctorByDni]);

    return (
        <DoctorContext.Provider value={contextValue}>
            {children}
        </DoctorContext.Provider>

        
    );
}