import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDoctorContext } from '../../contexts/DoctorContext';

const AddDoctor = () => {
    const [doctor, setDoctor] = useState({
        dni: '',
        name: '',
        paternalSurname: '',
        maternalSurname: '',
        dateBirth: '',
        gender: '',
        address: '',
        email: '',
        phone: '',
        medicalSchool: ''
    });

    const navigate = useNavigate();
    const { createDoctor } = useDoctorContext();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setDoctor(prevDoctor => ({
            ...prevDoctor,
            [id]: value
        }));
    };

    const handleCancelar = () => {
        navigate('/main/doctores');
      
    };

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
        if (!doctor.email.includes('@')) {
            mostrarError('Correo inválido');
            return;
        }
        // validar que el dni tenga 8 caracteres
        if (doctor.dni.length !== 8) {
            mostrarError('El DNI debe tener 8 caracteres');
            return;
        }
        //validar el genero que sea m o f
        if (doctor.gender !== 'm' && doctor.gender !== 'f') {
            mostrarError('El género debe ser seleccionado');
            return;
        }

     
        try {
            await createDoctor(doctor);
            Swal.fire({
                icon: 'success',
                title: 'Doctor agregado',
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/main/doctores');
        } catch (error) {
            console.error('Error al agregar doctor:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al agregar el doctor',
                confirmButtonText: 'Cerrar'
            });
        }
    };

    return (
        <div className="lg:h-[90%] flex items-center justify-center">
            <div className="bg-white py-5 px-8 border-t-4 border-blue-700 rounded-md shadow-lg">
                <h2 className="text-3xl text-gray-400 mb-3 text-center">Registro de Nuevo Doctor</h2>
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-2 md:grid-cols-2 gap-4'>
                        
                        <div className="mb-2">
                            <label htmlFor="dni" className="text-sm">DNI</label>
                            <input
                                type="text"
                                id="dni"
                                placeholder="DNI"
                                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                                value={doctor.dni}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="name" className="text-sm">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Nombre"
                                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                                value={doctor.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="paternalSurname" className="text-sm">Apellido Paterno</label>
                            <input
                                type="text"
                                id="paternalSurname"
                                placeholder="Apellido Paterno"
                                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                                value={doctor.paternalSurname}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="maternalSurname" className="text-sm">Apellido Materno</label>
                            <input
                                type="text"
                                id="maternalSurname"
                                placeholder="Apellido Materno"
                                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                                value={doctor.maternalSurname}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="dateBirth" className="text-sm">Fecha de Nacimiento</label>
                            <input
                                type="date"
                                id="dateBirth"
                                placeholder="Fecha de Nacimiento"
                                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                                value={doctor.dateBirth}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="gender" className="text-sm">Género</label>
                            <select
                                id="gender"
                                value={doctor.gender}
                                onChange={handleChange}
                                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                            >
                                <option value="">Seleccione un género</option>
                                <option value="m">Masculino</option>
                                <option value="f">Femenino</option>
                            </select>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="address" className="text-sm">Dirección</label>
                            <input
                                type="text"
                                id="address"
                                placeholder="Dirección"
                                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                                value={doctor.address}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="email" className="text-sm">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Correo Electrónico"
                                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                                value={doctor.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="phone" className="text-sm">Teléfono</label>
                            <input
                                type="text"
                                id="phone"
                                placeholder="Teléfono"
                                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                                value={doctor.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="medicalSchool" className="text-sm">Colegio Médico</label>
                            <input
                                type="text"
                                id="medicalSchool"
                                placeholder="Colegio Médico"
                                className="w-full p-2 mt-1 bg-gray-200 rounded-md focus:outline-none"
                                value={doctor.medicalSchool}
                                onChange={handleChange}
                            />
                        </div>

                        
                    </div>
                    <div>
                        <button
                                className="border-none bg-blue-800 py-2 px-3 text-white w-full mt-2 rounded-md hover:bg-blue-700 mb-3"
                                type="submit"
                            >
                                Guardar Doctor
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

export default AddDoctor;
