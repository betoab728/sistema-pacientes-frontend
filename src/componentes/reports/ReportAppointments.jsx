// Objetivo: Mostrar un listado de citas en un rango de fechas

import React, { useState, useContext } from 'react';
import { useAppointmentContext } from '../../contexts/AppointmentContext'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ReportAppointments = () => {
    const { findAppointmentsByDate } = useAppointmentContext()
    const [citas, setCitas] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const formatToISO = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses son 0-indexados
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      //defino este objeto para poder mapear el estado de la cita
    const statusMap = {
        scheduled : "Programada",
        completed  : "Atendida",
        canceled: "Cancelada"
    };



    //funcion para imprimir el listado de citas
    const handleImprimir = () => {
        console.log('Imprimir citas')
     //   navigate('/main/citas/imprimir')
    }


    const handleBuscar = async () => {
        if (!startDate || !endDate) {
            setError('Por favor, selecciona ambas fechas.');
            return;
        }
        setError('');
        try {
            const formattedFromDate = formatToISO(startDate);
            const formattedToDate = formatToISO(endDate);
            const response = await findAppointmentsByDate(formattedFromDate, formattedToDate);
            setCitas(response);
        } catch (err) {
            setError('Error al buscar las citas.');
        }
    }

    return (
        <div className='mt-12'>
            <h1 className="text-2xl font-bold mb-2 text-center">Consulta de Citas</h1>
           
            <div className="mb-4">
                <div>
                    <label className="text-sm">Fecha de Inicio</label>
                </div>
                <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                />
            </div>
            <div className="mb-4">
                <div>
                    <label className="text-sm">Fecha de Fin</label>
                </div>
             
                <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                />
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button onClick={handleBuscar} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Buscar
            </button>
            <button onClick={handleImprimir} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-1">
                Imprimir
            </button>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-left">Fecha</th>
                        <th className="py-2 px-4 border-b text-left">Hora</th>
                        <th className="py-2 px-4 border-b text-left">Paciente</th>
                        <th className="py-2 px-4 border-b text-left">Doctor</th>
                        <th className="py-2 px-4 border-b text-left">Consultorio</th>
                        <th className="py-2 px-4 border-b text-left">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {citas.length > 0 ? (
                        citas.map((cita,index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border-b text-left">{new Date(cita.date).toLocaleDateString('es-ES')}</td>
                                <td className="py-2 px-4 border-b text-left">{cita.hour}</td>
                                <td className="py-2 px-4 border-b text-left">{cita.patient}</td>
                                <td className="py-2 px-4 border-b text-left">{cita.doctor}</td>
                                <td className="py-2 px-4 border-b text-left">{cita.office}</td>
                                <td className="py-2 px-4 border-b text-left">{statusMap[cita.status]}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="py-2 px-4 border-b text-center">No hay citas en el rango seleccionado</td>
                        </tr>
                    )}
                </tbody>
            </table>



        </div>
    )
}

export default ReportAppointments;
