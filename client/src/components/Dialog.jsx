import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types'

import '../styles/components/dialog.css';

/**
 * Componente `Dialog` que proporciona un cuadro de diálogo modal con un título y contenido personalizado.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {JSX.Element} props.ContentDialog - Contenido del cuadro de diálogo.
 * @param {string} props.title - Título del cuadro de diálogo.
 * @param {Object} props.styles - Estilos personalizados para el cuadro de diálogo.
 * @returns {JSX.Element} - Elemento JSX que representa el componente `Dialog`.
 */
export function Dialog({ ContentDialog, ...props }) {
  // Estilos por defecto para el cuadro de diálogo.
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: '#FFF',
    boxShadow: 24,
    overflowY: 'auto',
    ...props.styles,
  };

  return (
    <Modal {...props}>
      <Box sx={{ ...style, maxHeight: '100vh' }}>
        <div className='container-header-modal'>
          <header className='header-modal'>
            <div className='title-header-modal'>
              <h5>{props.title}</h5>
            </div>
          </header>
        </div>
        <div className='modal-container'>
          <div className='input-modal-container'>
            {ContentDialog}
          </div>
        </div>
      </Box>
    </Modal>
  );
}

Dialog.propTypes = {
  ContentDialog: PropTypes.node,
  styles: PropTypes.object,
  title: PropTypes.string
}