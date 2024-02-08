import { useDropzone } from 'react-dropzone';
import '../styles/components/dropZone.css'
import UpLoadSvg from '../assets/upload.svg?react'
import { useCallback } from 'react';

export function DropZone(props) {

  const onDrop = useCallback(acceptedFiles => {
    props.setFiles(acceptedFiles)
  }, [])

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({onDrop});

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path}
    </li>
  ));

  return (
    <section className="container-drop-zone">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <UpLoadSvg />
        <p className='text-dropzone'>Arrastre los archivos aquí o de click</p>
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