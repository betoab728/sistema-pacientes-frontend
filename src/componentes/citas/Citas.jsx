//se implementa el componente de citas con el context de citas
import React, { useEffect,useState } from 'react';
import { useAppointmentContext } from '../../contexts/AppointmentContext'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
//icono para actualizar el estado de la cita
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'

const Citas = () => {

    const { fetchAppointments,updateAppointmentStatus } = useAppointmentContext()
    const [citas, setCitas] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const cargarCitas = async () => {
            try {
                console.log('Cargando citas...ListadoCitas')
                const response = await fetchAppointments()
                setCitas(response)
            } catch (error) {
                console.error('Error al cargar las citas en ListadoCitas:', error)
            }
        }

        cargarCitas()
    }, [])

    const handleCrear = () => {
        console.log('Crear nueva cita')
        navigate('/main/citas/nuevo')
    }

    const handleModificar = (id) => {
        console.log(`Modificar cita con id: ${id}`)

        navigate(`/main/citas/editar/${id}`)
    }

    const handleEliminar = async (id) => {
        console.log(`Eliminar cita con id: ${id}`)
      }
      // para actualizar el estado de la cita de pendiente a atendida o cancelada
    const handleActualizar = async (id) => {

        //aca se muestra un mensaje con sweetalert2 para confirmar la actualizacion del estado de la cita 
   
        const { value: status } = await Swal.fire({
            title: 'Actualizar Estado de Cita',
            input: 'select',
            inputOptions: {
                Programada: 'Programada',
                Completada: 'Completada',
                Cancelada: 'Cancelada'
            },
            inputPlaceholder: 'Selecciona un estado',
            showCancelButton: true,
            confirmButtonText: 'Actualizar',
            cancelButtonText: 'Cancelar'
        });
    
        if (status) {
            // Convertir el estado en español al formato esperado por el backend
            let statusValue;
            switch (status) {
                case 'Programada':
                    statusValue = 'scheduled';
                    break;
                case 'Completada':
                    statusValue = 'completed';
                    break;
                case 'Cancelada':
                    statusValue = 'canceled';
                    break;
                default:
                    return;
            }
    
            try {
                // Llamar al método del context para actualizar el estado
                await updateAppointmentStatus(id, statusValue);
                Swal.fire('Actualizado', 'El estado de la cita ha sido actualizado', 'success');
                // se actualiza el estado de las citas para que se refleje en la vista con setappointments

                navigate('/main/citas')


            } catch (error) {
                Swal.fire('Error', 'No se pudo actualizar el estado de la cita', 'error');
            }
        }
      
    }

    //defino este objeto para poder mapear el estado de la cita
    const statusMap = {
        scheduled : "Programada",
        completed  : "Atendida",
        canceled: "Cancelada"
    };

    return (
        <div className='mt-12'>
            <h1 className="text-2xl font-bold mb-2 text-center">Citas</h1>
            <h2 className="text-xl font-bold mb-4">Listado de Citas</h2>
            <button onClick={handleCrear} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Crear Cita
            </button>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-left">Fecha</th>
                        <th className="py-2 px-4 border-b text-left">Hora</th>
                        <th className="py-2 px-4 border-b text-left">Paciente</th>
                        <th className="py-2 px-4 border-b text-left">Doctor</th>
                        <th className="py-2 px-4 border-b text-left">Consultorio</th>
                        <th className="py-2 px-4 border-b text-left">Estado</th>
                        <th className="py-2 px-4 border-b text-left">Acciones</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {citas.map((cita, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-b text-left">{new Date(cita.date).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                            <td className="py-2 px-4 border-b text-left">{cita.hour}</td>
                            <td className="py-2 px-4 border-b text-left">{cita.patient}</td>
                            <td className="py-2 px-4 border-b text-left">{cita.doctor}</td>
                            <td className="py-2 px-4 border-b text-left">{cita.office}</td>
                            <td className="py-2 px-4 border-b text-left"> {statusMap[cita.status]} </td>
                        
                            <td className="py-2 px-4 border-b">
                                <button onClick={() => handleModificar(cita._id)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded m-1">
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button onClick={() => handleEliminar(doctor._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-1">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                                <button onClick={() => handleActualizar(cita._id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-1">
                                    <FontAwesomeIcon icon={faCheck} />
                                </button>
                            </td>
                          
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Citas