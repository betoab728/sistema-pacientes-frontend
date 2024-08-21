import axios from 'axios';
import { CLINIC_ENDPOINT } from './endpoints';


const DoctorsApiClient = axios.create({
    baseURL: `${process.env.API_BASE_URL}${CLINIC_ENDPOINT}`,
    headers: {
        'Content-Type': 'application/json'
    }
});
