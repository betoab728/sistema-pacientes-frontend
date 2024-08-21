import axios from 'axios';
import { JOB_ENDPOINT } from './endpoints';


const JobsApiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}${JOB_ENDPOINT}`,
    headers: {
        'Content-Type': 'application/json'
    }
});

/* Funciones para interactuar con la API segun las rutas :
router.get('/', getJobs);
router.post('/', createJob);
router.get('/:id', getJobById);
router.put('/:id', updateJob);*/
//lista de trabajos
export const getJobs = async () => {
    try {
        console.log('Fetching jobs...apiClient');
        const response = await JobsApiClient.get('/');
        return response.data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
};
//crear un trabajo
export const createJob = async (jobData) => {
    try {
        console.log('Creating job...apiClient: ', jobData);
        const response = await JobsApiClient.post('/', jobData);
        console.log('Job created en api:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating job:', error);
        throw error;
    }
};
//actualizar un trabajo
export const updateJob = async (jobId, jobData) => {
    try {
        const response = await JobsApiClient.put(`/${jobId}`, jobData);
        return response.data;
    } catch (error) {
        console.error(`Error updating job ${jobId}:`, error);
        throw error;
    }
};
//obtener un trabajo por id
export const getJobById = async (jobId) => {
    try {
        const response = await JobsApiClient.get(`/${jobId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching job ${jobId}:`, error);
        throw error;
    }
};

// fin de los metodos de la api de trabajos o jobs
// exportar
export default JobsApiClient;





