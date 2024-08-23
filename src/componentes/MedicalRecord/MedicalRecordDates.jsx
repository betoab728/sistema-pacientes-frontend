// se implementa el componente para listar las historias clinicas de un paciente ordenadas por fecha y un boton para ver el detalle de la historia clinica, hago uso del contexto de historias clinicas

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClinicalHistoryContext } from '../../contexts/ClinicalHistoryContext';

const ClinicalHistoryList = () => {
    const { clinicalHistories, fetchClinicalHistories, handleFindClinicalHistoriesByPatientId } = useContext(ClinicalHistoryContext);
    const [patientId, setPatientId] = useState();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setPatientId(id);
        handleFindClinicalHistoriesByPatientId(id);
    }, [id]);

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


