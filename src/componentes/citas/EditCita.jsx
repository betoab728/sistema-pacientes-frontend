import React, { useState, useEffect } from 'react';
import { useAppointmentContext } from '../../contexts/AppointmentContext';
import { usePatientContext } from '../../contexts/PatientContext';
import { useDoctorContext } from '../../contexts/DoctorContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditCita = () => {
    const { updateAppointment, findAppointmentById } = useAppointmentContext();
    const { patients, fetchPatients } = usePatientContext();
    const { doctors, fetchDoctors } = useDoctorContext();
    const navigate = useNavigate();
    const { id } = useParams();

    const [appointment, setAppointment] = useState({
        id: '',
        date: new Date(),
        hour: '',
        patientID: '',
        doctorID: '',
        office: '',
        notes: '',
        status: 'scheduled'
    });

    const [selectedPatient, setSelectedPatient] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarPacientes = async () => {
            try {
                await fetchPatients();
            } catch (error) {
                console.error('Error al cargar los pacientes en EditCita:', error);
            }
        };
        cargarPacientes();
    }, [fetchPatients]);

    useEffect(() => {
        const cargarDoctores = async () => {
            try {
                await fetchDoctors();
            } catch (error) {
                console.error('Error al cargar los doctores en EditCita:', error);
            }
        };
        cargarDoctores();
    }, [fetchDoctors]);

    useEffect(() => {
        const getAppointment = async () => {
            try {
                const fetchedAppointment = await findAppointmentById(id);
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
                setSelectedPatient(fetchedAppointment.patientID);
                setSelectedDoctor(fetchedAppointment.doctorID);
                setLoading(false);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo cargar la cita'
                });
            }
        };
        getAppointment();
    }, [id, findAppointmentById]);

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
        const newPatient = e.target.value;
        setSelectedPatient(newPatient);
        setAppointment(prevAppointment => ({
            ...prevAppointment,
            patientID: newPatient
        }));
    };

    const handleDoctorChange = (e) => {
        const newDoctor = e.target.value;
        setSelectedDoctor(newDoctor);
        setAppointment(prevAppointment => ({
            ...prevAppointment,
            doctorID: newDoctor
        }));
    };

    const handleSubmit = (e) => {
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
        if(appointment.patientID === '' || appointment.doctorID === ''){
            mostrarError('Debe seleccionar un paciente y un doctor');
            return;
        }
        //validar que se haya seleccionado una fecha y hora
        if(appointment.date === '' || appointment.time === ''){
            mostrarError('Debe seleccionar una fecha y hora');
            return;
        }

        //validar que la fecha de la cita no sea menor a la fecha actual
        const fechaCita = new Date(appointment.date);
        const fechaActual = new Date();
        if(fechaCita.setHours(0,0,0,0) < fechaActual.setHours(0,0,0,0)){
            mostrarError('La fecha de la cita no puede ser menor a la fecha actual');
            return;
        }

         //mensaje de confirmacion para actualizar la cita
            Swal.fire({
                title: '¿Estás seguro de actualizar la cita?',
                text: 'No podrás deshacer esta acción',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, actualizar',
                cancelButtonText: 'Cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        console.log('en editcita.jsx : ',appointment);
                         // se envia la data y el id de la cita a actualizar   
                        await updateAppointment(appointment.id, appointment);
                       
                        Swal.fire('Cita actualizada', 'La cita se actualizó correctamente', 'success');
                        navigate('/main/citas');
                    } catch (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo actualizar la cita'
                        });
                    }
                }
            }
        );


    };

    const handleCancelar = () => {
        navigate('/main/citas');
    };

    if (loading) {
        return <h1>Cargando...</h1>;
    }

    return (
        <div className="lg:h-[90%] flex items-center justify-center">
            <div className="bg-white py-5 px-8 border-t-4 border-blue-700 rounded-md shadow-lg">
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
                                onChange={handlePatientChange}
                                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                            >
                                <option value="">Seleccionar paciente</option>
                                {patients.map((patient) => (
                                    <option key={patient._id} value={patient._id}>
                                        {`${patient.name} ${patient.paternalSurname} ${patient.maternalSurname}`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="doctor" className="text-sm">Doctor</label>
                            <select
                                id="doctor"
                                name="doctor"
                                value={selectedDoctor}
                                onChange={handleDoctorChange}
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
};

export default EditCita;
