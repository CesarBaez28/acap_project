import PropTypes from 'prop-types';

import { useState } from 'react';

/**
 * Componente de botón secundario
 *
 * @param {Object} props - Propiedades del componente.
 * @param {function} props.onClick - Función que se ejecutará cuando se haga clic en el botón.
 * @param {string} props.type - Tipo del botón (por ejemplo, 'button', 'submit', 'reset').
 * @param {Object} props.styles - Estilos CSS adicionales proporcionados como un objeto.
 * @returns {JSX.Element} - Elemento JSX que representa el botón secundario.
 */
export function ButtonSecundary(props) {
  // Estado para rastrear si el ratón está sobre el botón
  const [isHovered, setIsHovered] = useState(false);

  // Define los estilos del botón combinando estilos predefinidos con estilos proporcionados como propiedades
  const buttonStyles = {
    padding: '.7rem 1rem',
    borderRadius: '0.5rem',
    border: "1px solid #0033A1",
    color: '#0033A1',
    cursor: 'pointer',
    fontSize: '1rem',
    backgroundColor: isHovered ? 'rgba(0, 51, 161, 0.079)' : '#FFF',
    ...props.styles,
  };

  // Retorna el elemento JSX del botón secundario
  return (
    <button
      style={buttonStyles}
      onClick={props.onClick}
      type={props.type}
      onMouseEnter={() => setIsHovered(true)} // Establece el estado como 'true' al pasar el ratón por encima
      onMouseLeave={() => setIsHovered(false)} // Establece el estado como 'false' al salir el ratón
    >
      {/* Renderiza cualquier contenido hijo proporcionado */}
      {props.children}
    </button>
  );
}

ButtonSecundary.propTypes = {
  styles: PropTypes.object,
  onClick: PropTypes.func,
  type: PropTypes.string,
  children: PropTypes.node
}
