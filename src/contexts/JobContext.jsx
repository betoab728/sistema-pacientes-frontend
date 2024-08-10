//aca se implemenra el contexto de trabajos o jobs a partir de los servicios de la api jobs
import React, { createContext, useContext, useState, useCallback,useMemo } from 'react';
import JobService from '../services/JobService';


const JobContext = createContext();

export const useJobContext = () => useContext(JobContext);

export const JobProvider = ({ children }) => {

    const [jobs, setJobs] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    const fetchJobs = useCallback(async () => {
        if (isFetched) return jobs;
        try {
            console.log('Fetching jobs...JobContext');
            const fetchedJobs = await JobService.fetchJobs();
            setJobs(fetchedJobs);
            setIsFetched(true);
            return fetchedJobs;
        } catch (error) {
            console.error('Error fetching jobs:', error);
            throw error;
        }
    }, [isFetched, jobs]);

    const handleCreateJob = useCallback(async (jobData) => {
        try {
            console.log('Creating job in JobContext: ', jobData);
            const createdJob = await JobService.createJob(jobData);
            console.log('ocupacion registrada :', createdJob);
            //como ya se creo el trabajo vuelvo a cargar los trabajos desde la api para tener la lsita actualizada
            const response = await fetchJobs();
            console.log('Datos nuevos de la API en jobcontext:', response);
              // actualizo el estado y tambien retorno la lista de trabajos actualizada
            setJobs(response);
            return response; // Asegúrate de retornar el trabajo creado
        } catch (error) {
            console.error('Error creating job:', error);
            throw error;
        }
    }, []);

    const handleFindJobById = useCallback(async (jobId) => {
        try {
            console.log('Finding job by ID in JobContext: ', jobId);
            const foundJob = await JobService.getJobById(jobId);
            return foundJob;
        } catch (error) {
            console.error('Error finding job by ID:', error);
            throw error;
        }
    }, []);

    const handleUpdateJob = useCallback(async (jobId, jobData) => {
        try {
            console.log('Updating job in JobContext: ', jobData);
            const updatedJob = await JobService.updateJob(jobId, jobData);
            
            //actualizo el estado de los trabajos
            const response = await fetchJobs();
            setJobs(response);
            return response;
         
        } catch (error) {
            console.error('Error updating job:', error);
            throw error;
        }
    }, []);

    //se hace uso de usememo con renombramiento para evitar que se renderize el componente si no hay cambios en el estado
    //de los trabajos

    const value = useMemo(() => ({
        jobs,
        fetchJobs,
        createJob: handleCreateJob,
        findJobById: handleFindJobById,
        updateJob: handleUpdateJob
    }), [jobs, fetchJobs, handleCreateJob, handleFindJobById, handleUpdateJob]);
   
    return (
        <JobContext.Provider value={value}>
            {children}
        </JobContext.Provider>
    );

   
}


