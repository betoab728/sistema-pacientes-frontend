// se implementa el componente para listar las historias clinicas de un paciente ordenadas por fecha y un boton para ver el detalle de la historia clinica, hago uso del contexto de historias clinicas

import {  useEffect,useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useClinicalHistoryContext } from '../../contexts/ClinicalHistoryContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const ClinicalHistoryList = () => {

    const {  findClinicalHistoriesByPatientId } = useClinicalHistoryContext();
    //state apra guardar las historias clinicas
    const [clinicalHistories, setClinicalHistories] = useState([]);
      

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      
        //uso async await y try catch para manejar los errores
        const loadRecords = async () => {
            try {
                const fetchedClinicalHistories = await findClinicalHistoriesByPatientId(id);
                console.log('Historias clinicas del paciente:', fetchedClinicalHistories);
                setClinicalHistories(fetchedClinicalHistories);
             
            } catch (error) {
                console.error('Error fetching clinical histories:', error);
            }
        }
        loadRecords();
       
    }, [id,findClinicalHistoriesByPatientId]);

    const handleDetail = (id) => {
        console.log(`Ver detalle de la historia clinica con id: ${id}`);
        navigate(`/main/historiasclinicas/detalle/${id}`);
    }

    const handleEdit = (id) => {
        console.log(`Modificar la historia clinica con id: ${id}`);
        //navigate(`/main/historiasclinicas/editar/${id}`);
    }

    const handleDelete = (id) => {
        console.log(`Eliminar la historia clinica con id: ${id}`);
        //navigate(`/main/historiasclinicas/eliminar/${id}`);

    }
    //agrergar un nuevo registro

    const handleAdd = () => {
        const patientName = clinicalHistories.length > 0 ? clinicalHistories[0].patient : 'N/A';
        navigate(`/main/historiasclinicas/nuevo/${id}`, { state: { patientName } });
    }

    return (
        <div className='mt-12'>
            <h1 className="text-2xl font-bold mb-2 text-center">Visitas Realizadas del paciente: {clinicalHistories.length > 0 ? clinicalHistories[0].patient : 'N/A'} </h1>
           
            <button
                onClick={handleAdd}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Agregar Nuevo Registro
            </button>
            
           
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600 border-b border-gray-200">Fecha</th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600 border-b border-gray-200">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clinicalHistories.map((clinicalHistory) => (
                    <tr key={clinicalHistory._id} className="hover:bg-gray-50">
                        <td className="text-left py-3 px-4 border-b border-gray-200">
                        {new Date(clinicalHistory.date).toLocaleString('es-ES', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        })}
                        </td>
                        <td className="text-left py-3 px-4 border-b border-gray-200">
                        <button
                            onClick={() => handleDetail(clinicalHistory._id)}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-1"
                        >
                             <FontAwesomeIcon icon={faSearch} className="mr-2" />
                          
                        </button>
                     
                        <button
                            onClick={() => handleEdit(clinicalHistory._id)}
                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-1"

                        >
                            <FontAwesomeIcon icon={faEdit} className="mr-2" />
                            
                        </button>
                  
                        <button
                            onClick={() => handleDelete(clinicalHistory._id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            <FontAwesomeIcon icon={faTrash} className="mr-2" />
                         
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


