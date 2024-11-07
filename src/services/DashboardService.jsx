//importamosel metodo de dashboardApiClient
import { getDashboardData } from '../api/DashboardApiClient';

const DashboardService = {
    fetchDashboardData: async () => {
        try {
            const dashboardData = await getDashboardData();
            return dashboardData;
        } catch (error) {
            console.error('Error in DashboardService fetching dashboard data:', error);
            throw error;
        }
    }
};

export default DashboardService;
