//aqui se gestiona las ocupaciones o jobs haciendo uso de Jobcontext
import React, {  useEffect, useState } from 'react';
import { useJobContext } from '../../contexts/JobContext';
import { useNavigate } from 'react-router-dom'; // Solo importamos useNavigate
import Swal from 'sweetalert2';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Ocupaciones = () => {

  //definir el contexto de trabajos o jobs
  const { fetchJobs,findJobById,updateJob } = useJobContext();
  const [jobs, setJobs] = useState([]);
  // importo el metodo para crear una ocupacion o job
  const { createJob } = useJobContext();
  const navigate = useNavigate(); // Definir navigate aquí

  useEffect(() => {
    const cargarOcupaciones = async () => {
      try {
        console.log('Cargando ocupaciones...Ocupaciones');
        const response = await fetchJobs();
        setJobs(response);
      } catch (error) {
        console.error('Error al cargar las ocupaciones en Ocupaciones:', error);
      }
    };
    cargarOcupaciones();
  } , []); // Dependencia vacía para ejecutar solo una vez al montar el componente

  const handleCrear = () => {
    console.log('Crear nueva ocupacion');
   // como la ocupacion solo tiene nombre para crear una nueva usare sweetalert para pedir el nombre de la ocupacion y no navegar a otra pagina
    // hago uso del contexto de ocupaciones o jobs para crear es de tipo async await y se envia un objeto jobData con el nombre de la ocupacion

    Swal.fire({
      title: 'Crear Ocupacion',
      input: 'text',
      inputLabel: 'Nombre de la Ocupacion',
      inputPlaceholder: 'Ingrese el nombre de la ocupacion',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: async (name) => {
        try {
          const jobData = { name };
           //imprimo la respuesta en consola
          const res= await createJob(jobData);
          console.log('Ocupaciones recibids en jsx:', res);
          //const response = await fetchJobs();
          //actualizo el estado de ocupaciones o jobs
          setJobs(res);
          console.log('Estado de jobs actualizado:', jobs);        
        } catch (error) {
          console.error('Error creando ocupacion:', error);
          Swal.showValidationMessage(`Request failed: ${error}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    });
  };
  const  handleModificar =async (id) => {
    console.log(`Modificar ocupacion con id: ${id}`);
    //primero busca la ocupacion o job por id y luego se modifica

  try {
     const currentJob = await findJobById(id);

    if (!currentJob) {
      console.error(`No se encontró la ocupación con id: ${id}`);
      return;
    }

    Swal.fire({
      title: 'Modificar Ocupacion',
      input: 'text',
      inputLabel: 'Nombre de la Ocupacion',
      inputPlaceholder: 'Ingrese el nombre de la ocupacion',
      inputValue: currentJob.name, // Cargar el nombre actual de la ocupación
      showCancelButton: true,
      confirmButtonText: 'Modificar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: async (name) => {
        if (!name.trim()) {
          Swal.showValidationMessage('El nombre no puede estar vacío');
          return;
        }

        try {
          const jobData = { name };
          const resp= await updateJob(id, jobData); // Llama a la función de actualización con el id y los nuevos datos
        
          setJobs(resp); // Actualiza el estado con los trabajos modificados
        } catch (error) {
          console.error('Error modificando ocupacion:', error);
          Swal.showValidationMessage(`Request failed: ${error}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    });

  } catch (error) {
    console.error('Error al buscar ocupacion:', error);
  }
};
  

  return (
    <div className='mt-12'>
      <h1 className="text-2xl font-bold mb-2 text-center">Ocupaciones</h1>
      <h2 className="text-xl font-bold mb-4">Listado de Ocupaciones</h2>
      <button onClick={handleCrear} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Crear Ocupacion
      </button>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">_id</th>
            <th className="py-2 px-4 border-b text-left">Nombre</th>
            <th className="py-2 px-4 border-b text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((ocupacion) => (
            <tr key={ocupacion._id}>
              <td className="py-2 px-4 border-b text-left">{ocupacion._id}</td>
              <td className="py-2 px-4 border-b text-left">{ocupacion.name}</td>
              <td className="py-2 px-4 border-b text-left">
                <button onClick={() => handleModificar(ocupacion._id)} 
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded inline-flex items-center m-1">
                  <FontAwesomeIcon icon={faEdit} /> 
                </button>
                <button onClick={() => handleEliminar(doctor._id)} 
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

}
export default Ocupaciones;
 


