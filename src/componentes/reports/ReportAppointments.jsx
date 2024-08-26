import React, { useState } from 'react';
import { useAppointmentContext } from '../../contexts/AppointmentContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const ReportAppointments = () => {
    const { findAppointmentsByDate, getAppointmentsReport } = useAppointmentContext();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [error, setError] = useState('');
    const [pdfBlob, setPdfBlob] = useState(null);

    const formatToISO = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

      const handleImprimir = async () => {
        if (!startDate || !endDate) {
            setError('Por favor, selecciona ambas fechas.');
            return;
        }
        setError('');
        try {
            const formattedFromDate = formatToISO(startDate);
            const formattedToDate = formatToISO(endDate);
            const pdfBlob = await getAppointmentsReport(formattedFromDate, formattedToDate);
            setPdfBlob(pdfBlob);
        } catch (err) {
            setError('Error al generar el reporte.');
        }
    };

    return (
        <div className='mt-12'>
            <h1 className="text-2xl font-bold mb-2 text-center">Reporte de Citas</h1>
           
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

            <button onClick={handleImprimir} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-1">
                Generar Reporte
            </button>

            {pdfBlob && (
                <div className="border border-gray-300">
                    <div className="scale-70 origin-top-left">
                        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                            <Viewer fileUrl={URL.createObjectURL(pdfBlob)} />
                        </Worker>
                    </div>
                </div>
            )}

        
            {pdfBlob && (
                <a href={URL.createObjectURL(pdfBlob)} download="reporte-citas.pdf" className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 max-w-44">
                    Descargar Reporte
                </a>
            )}
        </div>
    );
}

export default ReportAppointments;
