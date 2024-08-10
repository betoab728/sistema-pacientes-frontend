// aca se implementan los servicios de la api de trabajos o jobs segun los metodos de la api
//
import { getJobs, createJob, getJobById, updateJob } from '../api/JobsApiClient';

const JobService = {
    fetchJobs: async () => {
        try {
        const jobs = await getJobs();
        return jobs;
        } catch (error) {
        console.error('Error in JobService fetching jobs:', error);
        throw error;
        }
    },
    
    createJob: async (jobData) => {
        try {
        const job = await createJob(jobData);
        console.log('Job created in JobService:', job);
        return job;
        } catch (error) {
        console.error('Error in JobService creating job:', error);
        throw error;
        }
    },
    
    getJobById: async (jobId) => {
        try {
        const job = await getJobById(jobId);
        return job;
        } catch (error) {
        console.error('Error in JobService fetching job by ID:', error);
        throw error;
        }
    },
    
    updateJob: async (jobId, jobData) => {
        try {
        const updatedJobService = await updateJob(jobId, jobData);
        return updatedJobService;
        } catch (error) {
        console.error('Error in JobService updating job:', error);
        throw error;
        }
    }
    };

export default JobService;
// Fin de los metodos de la api de trabajos o jobs