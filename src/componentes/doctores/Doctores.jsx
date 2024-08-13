//aca se imlementa el componente de doctores que se va a mostrar en la pagina mostrando los doctores que se encuentran en la base de datos
//se hara uso del context para poder obtener los doctores
import React, { useEffect,useState } from 'react';
import { useDoctorContext } from '../../contexts/DoctorContext'
import { useNavigate } from 'react-router-dom'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//icono eliminar
import { faTrash } from '@fortawesome/free-solid-svg-icons'


const Doctores = () => {

    const { fetchDoctors } = useDoctorContext()
    const [doctores, setDoctores] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const cargarDoctores = async () => {
            try {
                console.log('Cargando doctores...ListadoDoctores')
                const response = await fetchDoctors()
                setDoctores(response)
            } catch (error) {
                console.error('Error al cargar los doctores en ListadoDoctores:', error)
            }
        }

        cargarDoctores()
    }, [])

    const handleCrear = () => {
        console.log('Crear nuevo doctor')
        navigate('/main/doctores/nuevo')
    }

    const handleModificar = (id) => {
        console.log(`Modificar doctor con id: ${id}`)

        navigate(`/main/doctores/editar/${id}`)
    }

    const handleEliminar = async (id) => {
        console.log(`Eliminar doctor con id: ${id}`)
      }

    const genderMap = {
        m: "Masculino",
        f: "Femenino"
    };

    return (
        <div className='mt-12'>
            <h1 className="text-2xl font-bold mb-2 text-center">Doctores</h1>
            <h2 className="text-xl font-bold mb-4">Listado de Doctores</h2>
            <button onClick={handleCrear} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Crear Doctor
            </button>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-left">DNI</th>
                        <th className="py-2 px-4 border-b text-left">Nombre</th>
                        <th className="py-2 px-4 border-b text-left">A.Paterno</th>
                        <th className="py-2 px-4 border-b text-left">A.Materno</th>
                        <th className="py-2 px-4 border-b text-left">Genero</th> 
                        <th className="py-2 px-4 border-b text-left">Fecha de Nac.</th>
                        <th className="py-2 px-4 border-b text-left">Correo</th>
                        <th className="py-2 px-4 border-b text-left">Telefono</th>
                        <th className="py-2 px-4 border-b text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {doctores.map((doctor) => (
                        <tr key={doctor._id}>
                            <td className="py-2 px-4 border-b">{doctor.dni}</td>
                            <td className="py-2 px-4 border-b">{doctor.name}</td>
                            <td className="py-2 px-4 border-b">{doctor.paternalSurname}</td>
                            <td className="py-2 px-4 border-b">{doctor.maternalSurname}</td>
                            <td className="py-2 px-4 border-b">{genderMap[doctor.gender]}</td>
                            <td className="py-2 px-4 border-b">{new Date(doctor.dateBirth).toLocaleDateString()}</td>
                            <td className="py-2 px-4 border-b">{doctor.email}</td>
                            <td className="py-2 px-4 border-b">{doctor.phone}</td>
                            <td className="py-2 px-4 border-b">
                                <button onClick={() => handleModificar(doctor._id)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded m-1">
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                               
                                <button onClick={() => handleEliminar(doctor._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Doctores

