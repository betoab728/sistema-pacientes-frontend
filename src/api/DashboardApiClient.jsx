import axios from 'axios';
import { DASHBOARD_ENDPOINT } from './endpoints';

const DashboardApiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}${DASHBOARD_ENDPOINT}`,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getDashboardData = async () => { 
    try {
       // console.log('Fetching dashboard data...apiClient');
        const response = await DashboardApiClient.get('/');
        return response.data;
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        throw error;
    }
}