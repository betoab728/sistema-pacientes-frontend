//se implementa el componente para crear una cita
import React, { useState, useEffect } from 'react';
import { useAppointmentContext } from '../../contexts/AppointmentContext';
import { usePatientContext } from '../../contexts/PatientContext';
import { useDoctorContext } from '../../contexts/DoctorContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
//importo swaetalert
import Swal from 'sweetalert2';


const AddCita = () => {
    const { createAppointment } = useAppointmentContext()
    const { fetchPatients } = usePatientContext()
    const { fetchDoctors } = useDoctorContext()

    const [appointmentData, setAppointmentData] = useState({
        date: new Date(),
        hour: '',
        patientID: '',
        doctorID: '',
        office: '',
        notes:'',
        status: 'scheduled'
    });
  
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate();
    
    const handleDateChange = (date) => {
        setAppointmentData({
            ...appointmentData,
            date
        });
    };

    const handleTimeChange = (hour) => {
        setAppointmentData({
            ...appointmentData,
            hour
        });
    };

    const handlePatientChange = (patientID) => {
        setAppointmentData({
            ...appointmentData,
            patientID
        });
    };

    const handleDoctorChange = (doctorID) => {
        setAppointmentData({
            ...appointmentData,
            doctorID
        });
    };

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

        //vaidar que se haya seleccionado un paciente y un doctor
        if(appointmentData.patientID === '' || appointmentData.doctorID === ''){
            mostrarError('Debe seleccionar un paciente y un doctor');
            return;
        }
        //validar que se haya seleccionado una fecha y hora
        if(appointmentData.date === '' || appointmentData.time === ''){
            mostrarError('Debe seleccionar una fecha y hora');
            return;
        }

        //validar que la fecha de la cita no sea menor a la fecha actual
        const fechaCita = new Date(appointmentData.date);
        const fechaActual = new Date();
        if(fechaCita.setHours(0,0,0,0) < fechaActual.setHours(0,0,0,0)){
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

            if(result.isConfirmed){
                console.log('Guardando cita...AddCita', appointmentData)

               //se guarda la cita usando try catch
                try {
                    await createAppointment(appointmentData)
                    Swal.fire({
                        icon: 'success',
                        title: 'Cita guardada',
                        text: 'La cita se ha guardado correctamente',
                        confirmButtonText: 'Aceptar'
                    }).then(() => {
                        navigate('/main/citas');
                    });
                } catch (error) {
                    console.error('Error al guardar la cita:', error)
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error al guardar la cita',
                        confirmButtonText: 'Cerrar'
                    });
                }
             }
        }

        );
   
       
    };

    useEffect(() => {
        const cargarPacientes = async () => {
            try {
                console.log('Cargando pacientes...AddCita')
                const response = await fetchPatients()
                setPatients(response)
            } catch (error) {
                console.error('Error al cargar los pacientes en AddCita:', error)
            }
        }

        cargarPacientes()
    }, [])  

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

    return (
    <div className="lg:h-[90%] flex items-center justify-center">
        <div className="bg-white py-5 px-8 border-t-4 border-blue-700 rounded-md shadow-lg" >
          <h2 className="text-3xl text-gray-400 mb-4 text-center">Registo de nueva cita</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="mb-2">
                        <div>
                        <label htmlFor="date" className="text-sm">Fecha</label>    
                        </div>
                        <DatePicker
                        selected={appointmentData.date}
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
                        value={appointmentData.hour || ""}
                        onChange={(e) => handleTimeChange(e.target.value)}
                        className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="patient" className="text-sm">Paciente</label>
                        <select
                        id="patient"
                        name="patient"
                        value={appointmentData.patientID}
                        onChange={(e) => handlePatientChange(e.target.value)}
                        className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                        >
                        <option value="">Seleccionar paciente</option>
                        {patients.map((patient) => (
                            <option key={patient._id} value={patient._id}>{patient.name}</option>
                        ))}
                        </select>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="doctor" className="text-sm">Doctor</label>
                        <select
                        id="doctor"
                        name="doctor"
                        value={appointmentData.doctorID}
                        onChange={(e) => handleDoctorChange(e.target.value)}
                        className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                        >
                        <option value="">Seleccionar doctor</option>
                        {doctors.map((doctor) => (
                            <option key={doctor._id} value={doctor._id}>{doctor.name}</option>
                        ))}
                        </select>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="office" className="text-sm">Consultorio</label>
                        <input
                        type="text"
                        id="office"
                        name="office"
                        value={appointmentData.office}
                        onChange={(e) => setAppointmentData({ ...appointmentData, office: e.target.value })}
                        className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="notes" className="text-sm">Observación</label>
                        <textarea
                        id="notes"
                        name="notes"
                        value={appointmentData.notes}
                        onChange={(e) => setAppointmentData({ ...appointmentData, notes: e.target.value })}
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

     
    )
}

export default AddCita;



