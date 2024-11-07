import DashboardService from "../services/DashboardService";
import { createContext, useContext, useState, useMemo, useCallback } from 'react';

const DashboardContext = createContext();

export const useDashboardContext = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {

    const [dashboardData, setDashboardData] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    const [error, setError] = useState(null);

    const fetchDashboardData = useCallback(async () => {
        if (isFetched) return dashboardData;
        try {
            console.log('Fetching dashboard data...DashboardContext');
            const fetchedDashboardData = await DashboardService.fetchDashboardData();
            setDashboardData(fetchedDashboardData);
            setIsFetched(true);
            setError(null);  // Resetea el error en caso de una nueva carga exitosa
            console.log('Datos recibidos de la API en dashboardcontext:', fetchedDashboardData);
            return fetchedDashboardData;
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setError(error);
            throw error;
        }
    }, [isFetched, dashboardData]);

    const value = useMemo(() => ({
        dashboardData,
        fetchDashboardData,
        isFetched,
        error
    }), [dashboardData, fetchDashboardData, isFetched, error]);

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
};