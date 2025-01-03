import React, { useEffect, useState } from 'react'

import { usePatientContext } from '../../contexts/PatientContext'
import { useNavigate } from 'react-router-dom'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
//fas fa-folder-open
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
const Pacientes = () => {
    const { fetchPatients } = usePatientContext()
    const [patients, setPatients] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const cargarPacientes = async () => {
            try {
                console.log('Cargando pacientes...ListadoPacientes')
                const response = await fetchPatients()
                setPatients(response)
            } catch (error) {
                console.error('Error al cargar los pacientes en ListadoPacientes:', error)
            }
        }

        cargarPacientes()
    }, [])

    const handleCrear = () => {
        console.log('Crear nuevo paciente')
        navigate('/main/pacientes/nuevo')
    }

    const handleModificar = (id) => {
        console.log(`Modificar paciente con id: ${id}`)
        navigate(`/main/pacientes/editar/${id}`)
    }

    const handleEliminar = async (id) => {
        console.log(`Eliminar paciente con id: ${id}`)
    }

    const genderMap = {
      m: "Masculino",
      f: "Femenino"
  };

    const handleHistorial = (id) => {
        console.log(`Historial del paciente con id: ${id}`)
       // navigate(`/main/pacientes/historial/${id}`)
       // se navega hacia la ventana de fechas de citas del paciente segun la ruta   <Route path="citas/fechas" element={<AppointmentDates />} />
       //nombre completo del paciente
       const patientName = patients.find(p => p._id === id).name + ' ' + patients.find(p => p._id === id).paternalSurname + ' ' + patients.find(p => p._id === id).maternalSurname;
         navigate(`/main/citas/fechas/${id}`, { state: { patientName } });
       
    }

    return (
        <div className='mt-12'>
            <h1 className="text-2xl font-bold mb-2 text-center">Pacientes</h1>
            <h2 className="text-xl font-bold mb-4">Listado de Pacientes</h2>
            <button onClick={handleCrear} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Crear Paciente
            </button>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                                      
                        <th className="py-2 px-4 border-b text-left">DNI</th>
                        <th className="py-2 px-4 border-b text-left">Nombre</th>
                        <th className="py-2 px-4 border-b text-left">Genero</th>
                        <th className="py-2 px-4 border-b text-left">Fecha de Nac.</th>
                        <th className="py-2 px-4 border-b text-left">Correo</th>
                        <th className="py-2 px-4 border-b text-left">Telefono</th>
                        <th className="py-2 px-4 border-b text-left">Historial</th>
                       <th className="py-2 px-4 border-b text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((paciente) => (
                        <tr key={paciente._id}>
                          
                            <td className="py-2 px-4 border-b text-left">{paciente.dni}</td>
                            <td className="py-2 px-4 border-b text-left">{paciente.name} {paciente.paternalSurname} {paciente.maternalSurname}</td>
                            <td className="py-2 px-4 border-b text-left">{genderMap[paciente.gender]}</td>
                            <td className="py-2 px-4 border-b text-left">{new Date(paciente.dateBirth).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                            <td className="py-2 px-4 border-b text-left">{paciente.email}</td>
                            <td className="py-2 px-4 border-b text-left">{paciente.phone}</td>
                            <td className="py-2 px-4 border-b text-left">
                                <button onClick={() => handleHistorial(paciente._id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-1">
                                    <FontAwesomeIcon icon={faFolderOpen} />
                                 
                                </button>
                            </td>
                            <td className="py-2 px-4 border-b text-left">
                            <div className="flex space-x-2">

                                 <button onClick={() => handleModificar(paciente._id)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button onClick={() => handleEliminar(paciente._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>

                            </div>

                            </td>
                            <td>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Pacientes 
