//para actualizar una cita

import React, { useState, useEffect } from 'react';
import { useAppointmentContext } from '../../contexts/AppointmentContext';
import { usePatientContext } from '../../contexts/PatientContext';
import { useDoctorContext } from '../../contexts/DoctorContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditCita = () => {
    const { appointments, updateAppointment , findAppointmentById} = useAppointmentContext();
    const { patients,fetchPatients } = usePatientContext();
    const { doctors,fetchDoctors } = useDoctorContext();
    const navigate = useNavigate();
    const { id } = useParams();

    //usesstate para los pacientes
    const [selectedPatient, setSelectedPatient ] = useState('');
    //usesstate para los doctores
    const [selectedDoctor, setSelectedDoctor] = useState('');

    const [appointment, setAppointment] = useState({
        id: '',
        date: new Date(),
        hour: '',
        patientID: selectedPatient,
        doctorID: '',
        office: '',
        notes:'',
        status: 'scheduled'
    });

    // se carga los pacientes con use effect y el metodo fetchPatients
    useEffect(() => {
        const cargarPacientes = async () => {
            try {
               await fetchPatients()
              
            } catch (error) {
                console.error('Error al cargar los pacientes en AddCita:', error)
            }
        }
        cargarPacientes()
    }, [])
  

    // se carga los doctores con use effect y el metodo fetchDoctors
    useEffect(() => {
        const cargarDoctores = async () => {
            try {
                await fetchDoctors()
            } catch (error) {
                console.error('Error al cargar los doctores en AddCita:', error)
            }
        }
        cargarDoctores()
    }, [])
    
    const [loading, setLoading] = useState(true);
    //buscar una cita por id con useEffect y try catch y en caso de error mostrar un mensaje con sweetalert
    useEffect(() => {
        const getAppointment = async () => {
            try {
                console.log('Cargando cita en cita jsx...')
               /*  const appointment = appointments.find(appointment => appointment._id === id);
                setAppointment(appointment); */

                const fetchedAppointment = await findAppointmentById(id);
                console.log("cita encontrada",fetchedAppointment);
                 // se asigna la cita encontrada a la variable appointment campo por campo
                setAppointment({
                    id: fetchedAppointment._id,
                    date: new Date(fetchedAppointment.date),
                    hour: fetchedAppointment.hour,
                    patientID: fetchedAppointment.patientID,
                    doctorID: fetchedAppointment.doctorID,
                    office: fetchedAppointment.office,
                    notes: fetchedAppointment.notes,
                    status: fetchedAppointment.status
                });


                setLoading(false);
                //se asiggna el paciente y doctor de la cita a los select
                setSelectedPatient(fetchedAppointment.patientID);
              // console.log('se asigna paciente seleccionado:', appointment.patientID);
                setSelectedDoctor(fetchedAppointment.doctorID);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo cargar la cita'
                });
            }
        }
        getAppointment();
    }
    , [appointments, id]);

       const handleDateChange = (date) => {
        setAppointment({
            ...appointment,
            date
        });
    };

    const handleTimeChange = (hour) => {
        setAppointment({
            ...appointment,
            hour
        });
    };

    const handlePatientChange = (e) => {
       
       const newPatient=e.target.value;
       setSelectedPatient(newPatient);
       setAppointment(prevAppointment => ({
              ...prevAppointment,
              patientID: newPatient
         }));

    };

    const handleDoctorChange = (e) => {
        
        const newDoctor=e.target.value;
        setSelectedDoctor(newDoctor);

        setAppointment(prevAppointment => ({
            ...prevAppointment,
            doctorID: newDoctor
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateAppointment(appointment);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cita actualizada con éxito',
            showConfirmButton: false,
            timer: 1500
        });
        navigate('/');
    }
    const handleCancelar = () => {
        navigate('/main/citas');
    }


    if (loading) {
        return <h1>Cargando...</h1>
    }

    return (
        <div className="lg:h-[90%] flex items-center justify-center">
        <div className="bg-white py-5 px-8 border-t-4 border-blue-700 rounded-md shadow-lg" >
          <h2 className="text-3xl text-gray-400 mb-4 text-center">Editar cita</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="mb-2">
                        <div>
                        <label htmlFor="date" className="text-sm">Fecha</label>    
                        </div>
                        <DatePicker
                        selected={appointment.date}
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
                        value={appointment.hour || ""}
                        onChange={(e) => handleTimeChange(e.target.value)}
                        className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="patient" className="text-sm">Paciente</label>
                        <select
                        id="patient"
                        name="patient"
                        value={selectedPatient}
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
                        value={selectedDoctor}
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
                        value={appointment.office}
                        onChange={(e) => setAppointment({ ...appointment, office: e.target.value })}
                        className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="notes" className="text-sm">Observación</label>
                        <textarea
                        id="notes"
                        name="notes"
                        value={appointment.notes}
                        onChange={(e) => setAppointment({ ...appointment, notes: e.target.value })}
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

export default EditCita;

