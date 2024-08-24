//se implementa el componente para visualizar el detalle de una historia clinica, este es el modelo de json que devuelve la api:
/*
 "_id": "66c91908d5dd278fbc81620d",
    "patientId": "66b63e4b4cd409a8dbb48038",
    "doctor": "maria fernanda  galvez mendez",
    "date": "2024-08-16T00:00:00.000Z",
    "hour": "14:30",
    "symptoms": "Dolor en el pecho, dificultad para respirar",
    "diagnosis": "Angina de pecho",
    "tests": "Electrocardiograma, prueba de esfuerzo",
    "treatment": "Medicamentos para el dolor, cambio en la dieta",
    "notes": "Revisar los resultados de las pruebas la próxima semana"...tengo que hacer uso de clinicalHistoryContext para obtener la historia clinica por id

*/
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useClinicalHistoryContext } from '../../contexts/ClinicalHistoryContext';

const ClinicalHistoryDetail = () => {
    
        const { findClinicalHistoryById } = useClinicalHistoryContext();
        const { id } = useParams();
        const navigate = useNavigate();
        const [clinicalHistory, setClinicalHistory] = useState(null);
    
        useEffect(() => {
            const loadRecord = async () => {
                try {
                    const fetchedClinicalHistory = await findClinicalHistoryById(id);
                    console.log('Historia clinica encontrada:', fetchedClinicalHistory);
                    setClinicalHistory(fetchedClinicalHistory);
                } catch (error) {
                    console.error('Error fetching clinical history:', error);
                }
            }
            loadRecord();
        }, [id, findClinicalHistoryById]);
    
        return (
            <div className='mt-12'>
            <   h1 className="text-2xl font-bold mb-4 text-center">Detalle de la Consulta</h1>
                 {clinicalHistory ? (
              <div className="bg-white py-5 px-8 border-t-4 border-blue-700 rounded-md shadow-lg">
         
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Paciente:</label>
                  <p className="text-gray-700 text-base">{clinicalHistory.patient}</p>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Doctor:</label>
                  <p className="text-gray-700 text-base">{clinicalHistory.doctor}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Fecha:</label>
                  <p className="text-gray-700 text-base">
                  {new Date(clinicalHistory.date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Hora:</label>
                  <p className="text-gray-700 text-base">
                  {new Date(`1970-01-01T${clinicalHistory.hour}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Síntomas:</label>
                  <p className="text-gray-700 text-base">{clinicalHistory.symptoms}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Diagnóstico:</label>
                  <p className="text-gray-700 text-base">{clinicalHistory.diagnosis}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Pruebas:</label>
                  <p className="text-gray-700 text-base">{clinicalHistory.tests}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Tratamiento:</label>
                  <p className="text-gray-700 text-base">{clinicalHistory.treatment}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Notas:</label>
                  <p className="text-gray-700 text-base">{clinicalHistory.notes}</p>
                </div>
                <div className="flex justify-center">
                    <button
                        className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => navigate('/main/pacientes')}
                    >
                        Volver
                    </button>
                  </div>  


              </div>
            
             
            ) : (
              <p className="text-center">Cargando...</p>
            )}
          </div>
          
        );
    }

export default ClinicalHistoryDetail;