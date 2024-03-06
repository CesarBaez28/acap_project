import { useDropzone } from 'react-dropzone';
import '../styles/components/dropZone.css';
import UpLoadSvg from '../assets/upload.svg?react';
import { useCallback } from 'react';

/**
 * Componente `DropZone` que permite a los usuarios arrastrar y soltar archivos para la carga.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Function} props.setFiles - Función para actualizar el estado de los archivos seleccionados.
 * @returns {JSX.Element} - Elemento JSX que representa el componente `DropZone`.
 */
export function DropZone(props) {
  // Función de devolución de llamada para manejar la carga de archivos aceptados.
  const onDrop = useCallback(acceptedFiles => {
    props.setFiles(acceptedFiles);
  }, []);

  // Configuración de la biblioteca react-dropzone.
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop });

  // Lista de archivos seleccionados para mostrar al usuario.
  const files = acceptedFiles.map(file => (
    <li key={file.path}>{file.path}</li>
  ));

  return (
    <section className="container-drop-zone">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <UpLoadSvg />
        <p className='text-dropzone'>Arrastre los archivos aquí o de clic</p>
      </div>
      <aside>
        {acceptedFiles.length !== 0
          ? <div className='files-dropzone'> <h4>Archivos</h4> <ul className='files-list-dropzone'>{files}</ul> </div>
          : <div> </div>
        }
      </aside>
    </section>
  );
}
