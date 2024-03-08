import Dissatisfied from '../assets/dissatisfied.svg?react';
import PropTypes from 'prop-types'
import '../styles/components/notFoundMessage.css';

/**
 * Componente `NotFoundMessage` que muestra un mensaje y una imagen cuando no se encuentra contenido.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.text - Texto que se mostrará en el mensaje.
 * @returns {JSX.Element} - Elemento JSX que representa el componente `NotFoundMessage`.
 */
export function NotFoundMessage({ text }) {
  return (
    <div className='not-found-message-container'>
      <div>
        <Dissatisfied />
        <h4 className='not-found-text'>{text}</h4>
      </div>
    </div>
  );
}

NotFoundMessage.propTypes = {
  text: PropTypes.string
}