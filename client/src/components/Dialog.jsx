import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import '../styles/components/dialog.css'

export function Dialog({ContentDialog, ...props }) {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: '#FFF',
    boxShadow: 24,
    overflowY: 'auto',
    ...props.styles
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
  )
}