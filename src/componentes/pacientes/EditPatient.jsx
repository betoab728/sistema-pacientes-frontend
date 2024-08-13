//para actualizar un paciente
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { usePatientContext } from '../../contexts/PatientContext';
import { useJobContext } from '../../contexts/JobContext';

const EditPatient = () => {
    
    const { id } = useParams();
    const navigate = useNavigate();
    const { findPatientById, updatePatient } = usePatientContext();
    const { jobs, fetchJobs } = useJobContext();  // Obtenemos los trabajos desde el contexto
    const [selectedJob, setSelectedJob] = useState('');

    useEffect(() => {
        fetchJobs();  // Cargamos las ocupaciones al montar el componente
    }, [fetchJobs]);

    const handleJobChange = (e) => {

        const newJob = e.target.value;
        setSelectedJob(newJob);

        setPatient(prevPatient => ({
            ...prevPatient,
            job: newJob
          }));
            
        // Imprime el nuevo valor de selectedJob
    console.log('Nuevo selectedJob:', newJob);

    // Imprime el estado completo de patient
    console.log('Estado actual de patient:', patient.job);
          
    };
    
    const [patient, setPatient] = useState({

        dni:'',
        name: '',
        paternalSurname: '',
        maternalSurname: '',
        dateBirth: '',
        gender: '',
        address: '',
        email: '',
        phone: '',
        familyHistory: '',
        allergies: '',
        job: selectedJob,
    });
    const [loading, setLoading] = useState(true);

     useEffect(() => {
        const loadPatient = async () => {
            try {
                const fetchedPatient = await findPatientById(id);
                console.log(fetchedPatient);
                setPatient({
                                
                    name: fetchedPatient.name,
                    dni: fetchedPatient.dni,
                    paternalSurname: fetchedPatient.paternalSurname,
                    maternalSurname: fetchedPatient.maternalSurname,
                    dateBirth: fetchedPatient.dateBirth,
                    gender: fetchedPatient.gender,
                    address: fetchedPatient.address,
                    email: fetchedPatient.email,
                    phone: fetchedPatient.phone,
                    familyHistory: fetchedPatient.familyHistory,
                    allergies: fetchedPatient.allergies,
                    job: fetchedPatient.job,
                });
                setLoading(false);

                setSelectedJob(fetchedPatient.job); // carga la ocupación del paciente que le corresponde 
            }
            catch (error) {
                console.error('Error fetching patient:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al cargar el paciente',
                    confirmButtonText: 'Cerrar'
                });
            }
        }

        loadPatient();
    }, [id, findPatientById]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setPatient((prevPatient) => ({
            ...prevPatient,
            [id]: value,
        }));
    }

  

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Función para mostrar mensajes de error
        const mostrarError = (mensaje) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: mensaje,
                confirmButtonText: 'Cerrar'
            });
        };
        // Validar correo
        if (!patient.email.includes('@')) {
            mostrarError('Correo inválido');
            return;
        }
        // Validar que el nombre no esté vacío
        if (patient.name.trim() === '') {
            mostrarError('El nombre no puede estar vacío');
            return;
        }

       
        //mensaje de confirmación sweetalert
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas actualizar a este paciente?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await updatePatient(id, patient);
                    Swal.fire({
                        icon: 'success',
                        title: 'Paciente actualizado',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/main/pacientes');
                } catch (error) {
                    console.error('Error updating patient:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error al actualizar el paciente',
                        confirmButtonText: 'Cerrar'
                    });
                }
            }
        });
    }

     //definir handleCancelar
    const handleCancelar = () => {
        navigate('/pacientes');
    }


    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
       
        <div className="flex items-center justify-center lg:mt-10">
  <div className="bg-white py-5 px-8 border-t-4 border-blue-700 rounded-md shadow-lg w-full max-w-3xl ">
    <h2 className="text-3xl text-gray-400 mb-5 text-center mt-15">Registrar Paciente</h2>
    <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            
            <div>
                <label htmlFor="dni" className="text-sm">DNI:</label>
                <input
                type="text"
                id="dni"
                value={patient.dni}
                onChange={handleChange}
                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                />
            </div>

            <div>
                <label htmlFor="name" className="text-sm">Nombre:</label>
                <input
                type="text"
                id="name"
                value={patient.name}
                onChange={handleChange}
                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                />
            </div>

            <div>
                <label htmlFor="paternalSurname" className="text-sm">Apellido paterno:</label>
                <input
                type="text"
                id="paternalSurname"
                value={patient.paternalSurname}
                onChange={handleChange}
                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                />
            </div>

            <div>
                <label htmlFor="maternalSurname" className="text-sm">Apellido materno:</label>
                <input
                type="text"
                id="maternalSurname"
                value={patient.maternalSurname}
                onChange={handleChange}
                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                />
            </div>

            <div>
                <label htmlFor="dateBirth" className="text-sm">Fecha de nacimiento:</label>
                <input
                type="date"
                id="dateBirth"
                value={patient.dateBirth}
                onChange={handleChange}
                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                />
            </div>

            <div>
                <label htmlFor="gender" className="text-sm">Género:</label>
                <select
                    id="gender"
                    value={patient.gender}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                    >
                    <option value="">Seleccione</option>
                    <option value="m">Masculino</option>
                    <option value="f">Femenino</option>
                 </select>
            </div>

            <div>
                <label htmlFor="address" className="text-sm">Dirección:</label>
                <input
                type="text"
                id="address"
                value={patient.address}
                onChange={handleChange}
                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                />
            </div>

            <div>
                <label htmlFor="email" className="text-sm">Correo:</label>
                <input
                type="email"
                id="email"
                value={patient.email}
                onChange={handleChange}
                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                />
            </div>

            <div>
                <label htmlFor="phone" className="text-sm">Teléfono:</label>
                <input
                type="text"
                id="phone"
                value={patient.phone}
                onChange={handleChange}
                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                />
            </div>

            <div>
                <label htmlFor="familyHistory" className="text-sm">Antecedentes familiares:</label>
                <input
                type="text"
                id="familyHistory"
                value={patient.familyHistory}
                onChange={handleChange}
                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                />
            </div>

            <div>
                <label htmlFor="allergies" className="text-sm">Alergias:</label>
                <input
                type="text"
                id="allergies"
                value={patient.allergies}
                onChange={handleChange}
                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                />
            </div>
            <div>
                <label htmlFor="job" className="text-sm">Ocupación:</label>
                <select
                    id="job"
                    value={selectedJob}
                    onChange={handleJobChange}
                    className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                >
                    <option value="" disabled>Seleccione una ocupación</option>
                    {jobs.map((job) => (
                        <option key={job._id} value={job._id}>
                            {job.name}
                        </option>
                    ))}
                </select>
            </div>
            
           
      </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-1 md:col-span-2">
             <button 
                type="submit"
                className="bg-blue-800 py-2 px-4 text-white w-full mt-4 rounded-md hover:bg-blue-700 col-span-2">
                Registrar
            </button>
                <button
                 type="button"
                className="border border-gray-300 py-2 px-4 text-gray-700 w-full mt-2 rounded-md hover:bg-gray-200 col-span-2"
                onClick={handleCancelar} >
                Cancelar
               </button>
        </div>
    </form>
  </div>
</div>
    );
}

export default EditPatient;




