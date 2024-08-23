// se implementa el componente para listar las historias clinicas de un paciente ordenadas por fecha y un boton para ver el detalle de la historia clinica, hago uso del contexto de historias clinicas

import {  useEffect,useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useClinicalHistoryContext } from '../../contexts/ClinicalHistoryContext';

const ClinicalHistoryList = () => {

    const {  handleFindClinicalHistoriesByPatientId } = useClinicalHistoryContext();
    //state apra guardar las historias clinicas
    const [clinicalHistories, setClinicalHistories] = useState([]);
      

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      
        //uso async await y try catch para manejar los errores
        const loadRecords = async () => {
            try {
                const fetchedClinicalHistories = await handleFindClinicalHistoriesByPatientId(id);
                console.log('Historias clinicas del paciente:', fetchedClinicalHistories);
                setClinicalHistories(fetchedClinicalHistories);
             
            } catch (error) {
                console.error('Error fetching clinical histories:', error);
            }
        }
        loadRecords();
       
    }, [id,handleFindClinicalHistoriesByPatientId]);

    const handleDetail = (id) => {
        console.log(`Ver detalle de la historia clinica con id: ${id}`);
        navigate(`/main/historiasclinicas/detalle/${id}`);
    }

    return (
        <div className='mt-12'>
            <h1 className="text-2xl font-bold mb-2 text-center">Historias Clínicas</h1>
            <h2 className="text-xl font-bold mb-4">Listado de Historias Clínicas</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Fecha</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clinicalHistories.map((clinicalHistory) => (
                        <tr key={clinicalHistory._id}>
                            <td className="text-left py-3 px-4">{clinicalHistory.date}</td>
                            <td className="text-left py-3 px-4">
                                <button onClick={() => handleDetail(clinicalHistory._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Ver Detalle
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ClinicalHistoryList;


