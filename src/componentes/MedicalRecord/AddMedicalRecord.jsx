//se implementa la ventana para registrar una historia clinica
import { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useClinicalHistoryContext } from '../../contexts/ClinicalHistoryContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";    
import Swal from 'sweetalert2';
import { useDoctorContext } from '../../contexts/DoctorContext';
import { useLocation } from 'react-router-dom';


const AddMedicalRecord = () => {

    const location = useLocation();
    const { patientName } = location.state || { patientName: 'N/A' };

    const { createClinicalHistory } = useClinicalHistoryContext();
    const { fetchDoctors } = useDoctorContext();
    const [doctors, setDoctors] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
   
    const nowd = new Date();
    const currentTime = nowd.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

    const [clinicalHistoryData, setClinicalHistoryData] = useState({
        patientId: id,
        doctorId: '',
        date:  new Date(),
        hour: currentTime,
        symptoms: '',
        diagnosis: '',
        tests: '',
        treatment: '',
        notes: ''
    });

  
    const handleChange = (e) => {
        setClinicalHistoryData({
            ...clinicalHistoryData,
            [e.target.name]: e.target.value
        });
    }

    const handleDateChange = (date) => {
        setClinicalHistoryData({
            ...clinicalHistoryData,
            date
        });
    };

    const handleTimeChange = (hour) => {
        setClinicalHistoryData({
            ...clinicalHistoryData,
            hour
        });
    };

    const handleDoctorChange = (doctorId) => {
        setClinicalHistoryData({
            ...clinicalHistoryData,
            doctorId
        });
    };

    useEffect(() => {
        const cargarDoctores = async () => {
            try {
                console.log('Cargando doctores...AddCita')
                const response = await fetchDoctors()
                setDoctors(response)
            } catch (error) {
                console.error('Error al cargar los doctores en AddCita:', error)
            }
        }

        cargarDoctores()
    }, [])

    const handleCancelar = () => {
        navigate('/main/citas');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const mostrarError = (mensaje) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: mensaje,
                confirmButtonText: 'Cerrar'
            });
        };

        
      //vaidar que se haya seleccionado  un doctor
      if( clinicalHistoryData.doctorId === ''){
        mostrarError('Debe seleccionar un paciente y un doctor');
            return;
        }
        //validar que se haya seleccionado una fecha y hora
        if(clinicalHistoryData.date === '' || clinicalHistoryData.hour === ''){
            mostrarError('Debe seleccionar una fecha y hora');
            return;
        }

        //validar que la fecha de la cita no sea menor a la fecha actual
        const fechaHistoria = new Date(clinicalHistoryData.date);
        const fechaActual = new Date();
        if(fechaHistoria.setHours(0,0,0,0) < fechaActual.setHours(0,0,0,0)){
            mostrarError('La fecha de la cita no puede ser menor a la fecha actual');
            return;
        }

          //mensaje de confirmacion para guardar la cita
          Swal.fire({
            icon: 'question',
            title: 'Confirmación',
            text: '¿Desea guardar la cita?',
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const newClinicalHistory = await createClinicalHistory(clinicalHistoryData);
                    console.log('Historia clinica creada:', newClinicalHistory);
                    Swal.fire({
                        icon: 'success',
                        title: 'Historia clínica creada',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate(`/main/citas/fechas/${id}`);
                } catch (error) {
                    console.error('Error creating clinical history:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al crear la historia clínica',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });


     
    }

    return (
      
        <div className="lg:h-[90%] flex items-center justify-center">
        <div className="bg-white py-5 px-8 border-t-4 border-blue-700 rounded-md shadow-lg" >
          <h2 className="text-3xl text-gray-400 mb-4 text-center">Registo de nueva Visita: {patientName}</h2>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="mb-2">
                        <div>
                        <label htmlFor="date" className="text-sm">Fecha</label>    
                        </div>
                        <DatePicker
                        selected={clinicalHistoryData.date}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="time" className="text-sm">Hora</label>
                        <input
                        type="time"
                        id="time"
                        name="time"
                        value={clinicalHistoryData.hour || ""}
                        onChange={(e) => handleTimeChange(e.target.value)}
                        className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                        />
                    </div>
                 
                    <div className="mb-2">
                        <label htmlFor="symptoms" className="text-sm">Síntomas</label>
                        <textarea 
                        id="symptoms"
                        name="symptoms"
                        value={clinicalHistoryData.symptoms}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                        />
                    </div>
                
                    <div>
                        <label htmlFor="diagnosis" className="text-sm">Diagnóstico</label>
                        <textarea
                        id="diagnosis"
                        name="diagnosis"
                        value={clinicalHistoryData.diagnosis}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                        />
                    </div>
             
                    <div>
                        <label htmlFor="tests" className="text-sm">Pruebas</label>
                        <textarea
                        id="tests"
                        name="tests"
                        value={clinicalHistoryData.tests}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                        />
                    </div>
                
                    <div>
                        <label htmlFor="treatment" className="text-sm">Tratamiento</label>
                        <textarea
                        id="treatment"
                        name="treatment"
                        value={clinicalHistoryData.treatment}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                        />
                    </div>
                  

                    <div className="mb-2">
                        <label htmlFor="doctor" className="text-sm">Doctor</label>
                        <select
                        id="doctor"
                        name="doctor"
                        value={clinicalHistoryData.doctorId}
                        onChange={(e) => handleDoctorChange(e.target.value)}
                        className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                        >
                        <option value="">Seleccionar doctor</option>
                        {doctors.map((doctor) => (
                            <option key={doctor._id} value={doctor._id}>
                                {`${doctor.name} ${doctor.paternalSurname} ${doctor.maternalSurname}`}
                            </option>
                        ))}
                        </select>
                    </div>

              

                    <div className="mb-2">
                        <label htmlFor="notes" className="text-sm">Observación</label>
                        <textarea
                        id="notes"
                        name="notes"
                        value={clinicalHistoryData.notes}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"   
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <button
                    type="submit"
                    className="border-none bg-blue-800 py-2 px-3 text-white w-full mt-2 rounded-md hover:bg-blue-700 mb-3"
                    onClick={handleSubmit}
                    >
                    Guardar
                    </button>
                    <button
                        className="border border-gray-300 py-2 px-3 text-gray-700 w-full mt-2 rounded-md hover:bg-gray-200"
                        type="button"
                        onClick={handleCancelar}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    </div>

    );
}

export default AddMedicalRecord;

