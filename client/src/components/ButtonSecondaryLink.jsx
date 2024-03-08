import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { useState } from "react";

/**
 * Componente de enlace de botón secundario
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.href - URL a la que se redirigirá al hacer clic en el botón.
 * @param {object} props.state - Estado que se pasará al enlace.
 * @param {string} props.type - Tipo del botón (por ejemplo, 'button', 'submit', 'reset').
 * @param {Object} props.styles - Estilos CSS adicionales proporcionados como un objeto.
 * @returns {JSX.Element} - Elemento JSX que representa el botón secundario como un enlace con efecto de cambio de color al pasar el ratón por encima.
 */
export function ButtonSecundaryLink(props) {
  // Estado para rastrear si el ratón está sobre el enlace
  const [isHovered, setIsHovered] = useState(false);

  // Define los estilos del enlace combinando estilos predefinidos con estilos proporcionados como propiedades
  const buttonStyles = {
    padding: '.7rem 1rem',
    borderRadius: '0.5rem',
    border: "1px solid #0033A1",
    color: '#0033A1',
    cursor: 'pointer',
    fontSize: '1rem',
    backgroundColor: isHovered ? 'rgba(0, 51, 161, 0.079)' : '#FFF',
    ...props.styles
  };

  // Retorna el elemento JSX del botón secundario como un enlace
  return (
    <Link
      style={buttonStyles}
      to={props.href}
      state={props.state}
      type={props.type}
      onMouseEnter={() => setIsHovered(true)} // Establece el estado como 'true' al pasar el ratón por encima
      onMouseLeave={() => setIsHovered(false)} // Establece el estado como 'false' al salir el ratón
    >
      {/* Renderiza cualquier contenido hijo proporcionado */}
      {props.children}
    </Link>
  );
}

ButtonSecundaryLink.propTypes = {
  styles: PropTypes.object,
  href: PropTypes.string,
  state: PropTypes.object,
  type: PropTypes.string,
  children: PropTypes.node
}