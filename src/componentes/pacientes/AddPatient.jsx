// se implementa la interfaz de la pagina para crear un paciente
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { usePatientContext } from '../../contexts/PatientContext';
import { useJobContext } from '../../contexts/JobContext';

const AddPatient = () => {

    const { jobs, fetchJobs } = useJobContext();  // Obtenemos los trabajos desde el contexto
    const [selectedJob, setSelectedJob] = useState('');

    useEffect(() => {
        fetchJobs();  // Cargamos las ocupaciones al montar el componente
    }, [fetchJobs]);

    const handleJobChange = (e) => {
        setSelectedJob(e.target.value);
    };

    const navigate = useNavigate();
    const [dni, setDni] = useState('');
    const [name, setName] = useState('');
    const [paternalSurname, setPaternalSurname] = useState('');
    const [maternalSurname, setMaternalSurname] = useState('');
    const [dateBirth, setDateBirth] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [familyHistory, setFamilyHistory] = useState('');
    const [allergies, setAllergies] = useState('');
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { createPatient } = usePatientContext();

    const handleRegistro = async (e) => {
        e.preventDefault(); // Previene el comportamiento de envío por defecto

        // validación de campos de paciente
        const mostrarError = (mensaje) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: mensaje,
                confirmButtonText: 'Cerrar'
            });
        };

        // Validar correo
        if (!email.includes('@')) {
            mostrarError('Correo inválido');
            return;
        }

        

        //se muestra un mensaje de confirmación sweetalert
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas registrar a este paciente?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma, se envían los datos
                console.log('Datos enviados:', { dni, name, paternalSurname, maternalSurname, dateBirth });
                //enviarDatos();

                const patientData = {
                    dni: dni,
                    name: name,
                    paternalSurname: paternalSurname,
                    maternalSurname: maternalSurname,
                    dateBirth: dateBirth,
                    gender : gender,
                    address: address,
                    email: email,
                    phone: phone,
                    familyHistory: familyHistory,
                    allergies: allergies,
                    job: selectedJob
                };

                try {
                    console.log('Registrando paciente en AddPatient: ', patientData);
                    await createPatient(patientData);
                    Swal.fire({
                        icon: 'success',
                        title: 'Paciente registrado',
                        text: 'El paciente ha sido registrado exitosamente',
                        confirmButtonText: 'Aceptar'
                    });
                    navigate('/main/pacientes');
                } catch (error) {
                    console.error('Error creating patient:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un error al registrar al paciente',
                        confirmButtonText: 'Cerrar'
                    });
                }
            }
        }

        );
    }
    // Función para cancelar el registro
    const handleCancelar = () => {
        navigate('/main/pacientes/');
    }

    return (

<div className="flex items-center justify-center lg:mt-10">
  <div className="bg-white py-5 px-8 border-t-4 border-blue-700 rounded-md shadow-lg w-full max-w-3xl ">
    <h2 className="text-3xl text-gray-400 mb-5 text-center mt-15">Registrar Paciente</h2>
    <form onSubmit={handleRegistro}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            
            <div>
                <label htmlFor="dni" className="text-sm">DNI:</label>
                <input
                type="text"
                id="dni"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                />
            </div>

            <div>
                <label htmlFor="name" className="text-sm">Nombre:</label>
                <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                />
            </div>

            <div>
                <label htmlFor="paternalSurname" className="text-sm">Apellido paterno:</label>
                <input
                type="text"
                id="paternalSurname"
                value={paternalSurname}
                onChange={(e) => setPaternalSurname(e.target.value)}
                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                />
            </div>

            <div>
                <label htmlFor="maternalSurname" className="text-sm">Apellido materno:</label>
                <input
                type="text"
                id="maternalSurname"
                value={maternalSurname}
                onChange={(e) => setMaternalSurname(e.target.value)}
                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                />
            </div>

            <div>
                <label htmlFor="dateBirth" className="text-sm">Fecha de nacimiento:</label>
                <input
                type="date"
                id="dateBirth"
                value={dateBirth}
                onChange={(e) => setDateBirth(e.target.value)}
                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                />
            </div>

            <div>
                <label htmlFor="gender" className="text-sm">Género:</label>
                <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                />
            </div>

            <div>
                <label htmlFor="email" className="text-sm">Correo:</label>
                <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                />
            </div>

            <div>
                <label htmlFor="phone" className="text-sm">Teléfono:</label>
                <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                />
            </div>

            <div>
                <label htmlFor="familyHistory" className="text-sm">Antecedentes familiares:</label>
                <input
                type="text"
                id="familyHistory"
                value={familyHistory}
                onChange={(e) => setFamilyHistory(e.target.value)}
                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                />
            </div>

            <div>
                <label htmlFor="allergies" className="text-sm">Alergias:</label>
                <input
                type="text"
                id="allergies"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
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

export default AddPatient;



                     